import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expert",
      required: [true, "Expert ID is required"],
    },

    expertName: {
      type: String,
      required: true,
      trim: true,
    },

    userName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[+]?[\d\s\-().]{7,15}$/, "Please provide a valid phone number"],
    },

    date: {
      type: String,
      required: [true, "Date is required"],
    },

    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },

    notes: {
      type: String,
      default: "",
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

/*
 Prevents double booking:
 same expert + same date + same slot

 Cancelled bookings can reuse slot
*/
bookingSchema.index(
  {
    expertId: 1,
    date: 1,
    timeSlot: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      status: { $ne: "Cancelled" },
    },
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;