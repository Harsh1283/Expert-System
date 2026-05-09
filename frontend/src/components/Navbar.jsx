import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">
            E
          </div>

          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            ExpertEase
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[15px] font-medium">
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-indigo-100 text-indigo-600"
          >
            Experts
          </Link>

          <Link
            to="/my-bookings"
            className="px-5 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all duration-300"
          >
            My Bookings
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center hover:bg-slate-100 transition-all duration-300">
            <Search
              size={20}
              className="text-slate-600"
            />
          </button>

          <button className="px-5 py-3 rounded-full border border-gray-200 bg-white shadow-sm text-slate-700 font-medium hover:shadow-md transition-all duration-300">
            Guest Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;