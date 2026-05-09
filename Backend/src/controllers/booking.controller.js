import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Expert from "../models/expert.model.js";

const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      expertId,
      userName,
      email,
      phone,
      date,
      timeSlot,
      notes,
    } = req.body;

    if (
      !expertId ||
      !userName ||
      !email ||
      !phone ||
      !date ||
      !timeSlot
    ) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const updatedExpert = await Expert.findOneAndUpdate(
      {
        _id: expertId,

        "timeSlots.date": date,

        "timeSlots.time": timeSlot,

        "timeSlots.isBooked": false,
      },
      {
        $set: {
          "timeSlots.$.isBooked": true,
        },
      },
      {
        returnDocument: "after",
        session,
      }
    );

    if (!updatedExpert) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message:
          "This time slot is no longer available",
      });
    }

    const [booking] = await Booking.create(
      [
        {
          expertId,

          expertName: updatedExpert.name,

          userName,

          email: email.toLowerCase(),

          phone,

          date,

          timeSlot,

          notes: notes || "",

          status: "Pending",
        },
      ],
      { session }
    );

    await Expert.findOneAndUpdate(
      {
        _id: expertId,

        "timeSlots.date": date,

        "timeSlots.time": timeSlot,
      },
      {
        $set: {
          "timeSlots.$.bookingId": booking._id,
        },

        $inc: {
          totalBookings: 1,
        },
      },
      {
        session,
      }
    );

    await session.commitTransaction();

    const io = req.app.get("io");

    if (io) {
      io.to(`expert-${expertId}`).emit(
        "slot-booked",
        {
          expertId,
          date,
          timeSlot,
          bookingId: booking._id,
        }
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking,
    });
  } catch (error) {
    await session.abortTransaction();

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "This time slot is already booked",
      });
    }

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  } finally {
    session.endSession();
  }
};

const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const bookings = await Booking.find({
      email: email.toLowerCase(),
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      total: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Completed",
      "Cancelled",
    ];

    if (
      !status ||
      !validStatuses.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const previousStatus = booking.status;

    booking.status = status;

    await booking.save();

    // free slot if cancelled
    if (
      status === "Cancelled" &&
      previousStatus !== "Cancelled"
    ) {
      await Expert.findOneAndUpdate(
        {
          _id: booking.expertId,

          "timeSlots.date": booking.date,

          "timeSlots.time":
            booking.timeSlot,
        },
        {
          $set: {
            "timeSlots.$.isBooked": false,

            "timeSlots.$.bookingId": null,
          },

          $inc: {
            totalBookings: -1,
          },
        }
      );

      const io = req.app.get("io");

      if (io) {
        io.to(
          `expert-${booking.expertId}`
        ).emit("slot-freed", {
          expertId: booking.expertId,
          date: booking.date,
          timeSlot: booking.timeSlot,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: `Booking status updated to ${status}`,
      data: booking,
    });
  } catch (error) {
    console.log(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Failed to update booking status",
      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    });
  }
};

export {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
};