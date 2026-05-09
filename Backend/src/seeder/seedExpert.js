import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Expert from "../models/expert.model.js";

connectDB();

const experts = [
  {
    name: "John Doe",
    category: "Technology",
    experience: 6,
    rating: 4.8,
    bio: "Full Stack Developer and MERN Mentor",
    profileImage:
      "https://randomuser.me/api/portraits/men/1.jpg",
    hourlyRate: 50,
    skills: ["React", "Node.js", "MongoDB", "Express"],
    timeSlots: [
      {
        date: "2026-05-10",
        time: "10:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-10",
        time: "11:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-11",
        time: "2:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Sarah Wilson",
    category: "Business",
    experience: 8,
    rating: 4.9,
    bio: "Startup and Business Consultant",
    profileImage:
      "https://randomuser.me/api/portraits/women/2.jpg",
    hourlyRate: 80,
    skills: ["Startup", "Leadership", "Marketing"],
    timeSlots: [
      {
        date: "2026-05-10",
        time: "1:00 PM",
        isBooked: false,
      },
      {
        date: "2026-05-11",
        time: "4:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "David Miller",
    category: "Design",
    experience: 5,
    rating: 4.7,
    bio: "UI/UX Designer and Product Expert",
    profileImage:
      "https://randomuser.me/api/portraits/men/3.jpg",
    hourlyRate: 60,
    skills: ["Figma", "UI Design", "UX Research"],
    timeSlots: [
      {
        date: "2026-05-12",
        time: "9:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-12",
        time: "10:30 AM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Emily Carter",
    category: "Marketing",
    experience: 7,
    rating: 4.6,
    bio: "Digital Marketing and SEO Expert",
    profileImage:
      "https://randomuser.me/api/portraits/women/4.jpg",
    hourlyRate: 70,
    skills: ["SEO", "Content Marketing", "Branding"],
    timeSlots: [
      {
        date: "2026-05-13",
        time: "3:00 PM",
        isBooked: false,
      },
      {
        date: "2026-05-13",
        time: "5:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Michael Brown",
    category: "Finance",
    experience: 10,
    rating: 4.9,
    bio: "Financial Advisor and Investment Consultant",
    profileImage:
      "https://randomuser.me/api/portraits/men/5.jpg",
    hourlyRate: 100,
    skills: ["Investment", "Stocks", "Tax Planning"],
    timeSlots: [
      {
        date: "2026-05-14",
        time: "11:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-14",
        time: "1:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Sophia Lee",
    category: "Healthcare",
    experience: 9,
    rating: 4.8,
    bio: "Certified Nutritionist and Wellness Coach",
    profileImage:
      "https://randomuser.me/api/portraits/women/6.jpg",
    hourlyRate: 65,
    skills: ["Nutrition", "Diet Planning", "Fitness"],
    timeSlots: [
      {
        date: "2026-05-15",
        time: "10:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-15",
        time: "12:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "James Anderson",
    category: "Legal",
    experience: 12,
    rating: 4.7,
    bio: "Corporate Lawyer and Legal Consultant",
    profileImage:
      "https://randomuser.me/api/portraits/men/7.jpg",
    hourlyRate: 120,
    skills: ["Corporate Law", "Contracts", "Compliance"],
    timeSlots: [
      {
        date: "2026-05-16",
        time: "2:00 PM",
        isBooked: false,
      },
      {
        date: "2026-05-16",
        time: "4:00 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Olivia Martinez",
    category: "Education",
    experience: 6,
    rating: 4.5,
    bio: "Career Coach and Academic Mentor",
    profileImage:
      "https://randomuser.me/api/portraits/women/8.jpg",
    hourlyRate: 55,
    skills: [
      "Career Guidance",
      "Public Speaking",
      "Teaching",
    ],
    timeSlots: [
      {
        date: "2026-05-17",
        time: "9:30 AM",
        isBooked: false,
      },
      {
        date: "2026-05-17",
        time: "11:30 AM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Daniel White",
    category: "Engineering",
    experience: 11,
    rating: 4.9,
    bio: "Software Architect and Cloud Engineer",
    profileImage:
      "https://randomuser.me/api/portraits/men/9.jpg",
    hourlyRate: 95,
    skills: ["AWS", "System Design", "DevOps"],
    timeSlots: [
      {
        date: "2026-05-18",
        time: "1:30 PM",
        isBooked: false,
      },
      {
        date: "2026-05-18",
        time: "3:30 PM",
        isBooked: false,
      },
    ],
  },

  {
    name: "Emma Thompson",
    category: "Consulting",
    experience: 8,
    rating: 4.8,
    bio: "Business Strategy and Growth Consultant",
    profileImage:
      "https://randomuser.me/api/portraits/women/10.jpg",
    hourlyRate: 85,
    skills: ["Strategy", "Scaling", "Operations"],
    timeSlots: [
      {
        date: "2026-05-19",
        time: "10:00 AM",
        isBooked: false,
      },
      {
        date: "2026-05-19",
        time: "2:00 PM",
        isBooked: false,
      },
    ],
  },
];

const seedExperts = async () => {
  try {
    await Expert.deleteMany();

    await Expert.insertMany(experts);

    console.log("Experts Seeded Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedExperts();