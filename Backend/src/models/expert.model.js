import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

 
  isBooked: {
    type: Boolean,
    default: false,
  },

  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    default: null,
  },
});

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Expert name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Technology",
        "Business",
        "Design",
        "Marketing",
        "Finance",
        "Healthcare",
        "Legal",
        "Education",
        "Engineering",
        "Consulting",
      ],
    },

    experience: {
      type: Number,
      required: [true, "Experience is required"],
      min: [0, "Experience cannot be negative"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    bio: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    skills: [
      {
        type: String,
      },
    ],

    timeSlots: [timeSlotSchema],

    totalBookings: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


expertSchema.index({
  name: "text",
  category: 1,
});

const Expert = mongoose.model("Expert", expertSchema);

export default Expert;