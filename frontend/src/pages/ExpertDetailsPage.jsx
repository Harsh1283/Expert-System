import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";

import Navbar from "../components/Navbar";

import { useSocket } from "../context/SocketContext";

const ExpertDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const socket = useSocket();

  const [expert, setExpert] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [formData, setFormData] =
    useState({
      userName: "",
      email: "",
      phone: "",
      notes: "",
    });

  const fetchExpert = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/experts/${id}`
      );

      setExpert(response.data.data);

      const dates = Object.keys(
        response.data.data.slotsByDate || {}
      );

      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  // socket room join
  useEffect(() => {
  if (!socket || !id) return;

  socket.emit(
    "join-expert-room",
    id
  );

  const handleSlotBooked = (
    data
  ) => {
    setExpert((prev) => {
      if (!prev) return prev;

      const updatedSlotsByDate = {
        ...prev.slotsByDate,
      };

      updatedSlotsByDate[
        data.date
      ] =
        updatedSlotsByDate[
          data.date
        ]?.map((slot) => {
          if (
            slot.time ===
            data.timeSlot
          ) {
            return {
              ...slot,
              isBooked: true,
            };
          }

          return slot;
        });

      return {
        ...prev,
        slotsByDate:
          updatedSlotsByDate,
      };
    });
  };

  socket.on(
    "slot-booked",
    handleSlotBooked
  );

  return () => {
    socket.emit(
      "leave-expert-room",
      id
    );

    socket.off(
      "slot-booked",
      handleSlotBooked
    );
  };
}, [socket, id]);

  const handleBooking = async (e) => {
  e.preventDefault();

  if (!selectedDate || !selectedSlot) {
    toast.error("Please select a slot");
    return;
  }

  try {
    await api.post("/bookings/create", {
      expertId: id,
      date: selectedDate,
      timeSlot: selectedSlot,
      ...formData,
    });

    toast.success(
      "Booking created successfully"
    );

    setFormData({
      userName: "",
      email: "",
      phone: "",
      notes: "",
    });

    setSelectedSlot("");

    fetchExpert();

    navigate("/my-bookings");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Booking failed"
    );
  }
};

 if (loading) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="h-600px rounded-3xl bg-white border border-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

  if (!expert) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 h-300px flex items-center justify-center text-2xl text-slate-500 font-medium">
          Expert not found
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 p-8">
          <div className="flex items-start gap-6">
            <img
              src={expert.profileImage}
              alt={expert.name}
              className="w-32 h-32 rounded-3xl object-cover"
            />

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                {expert.name}
              </h1>

              <p className="text-indigo-600 text-xl font-semibold mt-2">
                {expert.category}
              </p>

              <p className="text-slate-500 mt-4 leading-8">
                {expert.bio}
              </p>

              <div className="flex flex-wrap gap-2 mt-6">
                {expert.skills?.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* SLOTS */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              Available Slots
            </h2>

            <div className="flex flex-wrap gap-3 mb-6">
              {Object.keys(
                expert.slotsByDate || {}
              ).map((date) => (
                <button
                  key={date}
                  onClick={() =>
                    setSelectedDate(date)
                  }
                  className={`px-5 py-3 rounded-2xl border transition-all duration-300 ${
                    selectedDate === date
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white border-gray-200 hover:border-indigo-400"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {(
                expert.slotsByDate?.[
                  selectedDate
                ] || []
              ).map((slot) => (
                <button
                  key={slot._id}
                  disabled={slot.isBooked}
                  onClick={() =>
                    setSelectedSlot(
                      slot.time
                    )
                  }
                  className={`px-5 py-3 rounded-2xl border font-medium transition-all duration-300 ${
                    slot.isBooked
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selectedSlot ===
                        slot.time
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white border-gray-200 hover:border-indigo-400"
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 h-fit sticky top-28">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Book Session
          </h2>

          <form
            onSubmit={handleBooking}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={formData.userName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userName:
                    e.target.value,
                })
              }
              className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
              className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone:
                    e.target.value,
                })
              }
              className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              rows="4"
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailsPage;