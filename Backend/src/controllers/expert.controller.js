import Expert from "../models/expert.model.js";


const getExperts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const skip = (page - 1) * limit;

    const { search, category } = req.query;

    
    const filter = {
      isActive: true,
    };

   
    if (category && category !== "All") {
      filter.category = category;
    }

   
    if (search && search.trim()) {
      filter.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },

        {
          category: {
            $regex: search.trim(),
            $options: "i",
          },
        },

        {
          skills: {
            $elemMatch: {
              $regex: search.trim(),
              $options: "i",
            },
          },
        },
      ];
    }

    
    const [experts, total] = await Promise.all([
      Expert.find(filter)
        .select("-timeSlots")
        .sort({
          rating: -1,
          totalBookings: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean(),

      Expert.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,

      data: experts,

      pagination: {
        page,
        limit,
        total,

        totalPages: Math.ceil(total / limit),

        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch experts",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};


const getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id).lean();

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found",
      });
    }

    // group slots by date
    const slotsByDate = {};

    (expert.timeSlots || []).forEach((slot) => {
      const dateKey = new Date(slot.date).toISOString().split("T")[0];

      if (!slotsByDate[dateKey]) {
        slotsByDate[dateKey] = [];
      }

      slotsByDate[dateKey].push(slot);
    });

    
    Object.keys(slotsByDate).forEach((date) => {
      slotsByDate[date].sort((a, b) => {
        const convertToMinutes = (timeString) => {
          const [time, period] = timeString.split(" ");

          let [hours, minutes] = time
            .split(":")
            .map(Number);

          if (period === "PM" && hours !== 12) {
            hours += 12;
          }

          if (period === "AM" && hours === 12) {
            hours = 0;
          }

          return hours * 60 + minutes;
        };

        return (
          convertToMinutes(a.time) -
          convertToMinutes(b.time)
        );
      });
    });

    res.status(200).json({
      success: true,

      data: {
        ...expert,
        slotsByDate,
      },
    });
  } catch (error) {
    console.log(error);

    
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid expert ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch expert",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,
    });
  }
};

export { getExperts, getExpertById };