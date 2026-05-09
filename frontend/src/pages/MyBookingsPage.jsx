import {
  useState,
} from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";

const statusColors = {
  Pending:
    "bg-yellow-100 text-yellow-700",

  Confirmed:
    "bg-blue-100 text-blue-700",

  Completed:
    "bg-green-100 text-green-700",

  Cancelled:
    "bg-red-100 text-red-700",
};

const MyBookingsPage = () => {
  const [email, setEmail] =
    useState("");

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleSearch = async () => {
    if (!email) return;

    try {
      setLoading(true);

      const response = await api.get(
        `/bookings/get?email=${email}`
      );

      setBookings(response.data.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
            My Bookings
          </h1>

          <p className="text-slate-500 text-lg mt-3">
            Enter your email to view all
            your expert sessions.
          </p>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="flex-1 h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleSearch}
              className="h-14 px-8 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300"
            >
              Search Bookings
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-3xl bg-white border border-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="h-300px rounded-3xl bg-white border border-dashed border-gray-300 flex items-center justify-center text-slate-500 text-lg">
            No bookings found
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-xl hover:shadow-indigo-100 transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  {/* LEFT */}
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {
                        booking.expertName
                      }
                    </h2>

                    <p className="text-slate-500 mt-3 text-lg">
                      Session booked with
                      expert mentor.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium">
                        📅 {booking.date}
                      </div>

                      <div className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium">
                        ⏰{" "}
                        {
                          booking.timeSlot
                        }
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-6">
                        <p className="text-slate-400 text-sm mb-2">
                          Notes
                        </p>

                        <p className="text-slate-600 leading-7">
                          {
                            booking.notes
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start lg:items-end gap-5">
                    <span
                      className={`px-5 py-3 rounded-2xl font-semibold text-sm ${statusColors[booking.status]}`}
                    >
                      {booking.status}
                    </span>

                    <div className="text-slate-400 text-sm">
                      Booked on{" "}
                      {new Date(
                        booking.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;