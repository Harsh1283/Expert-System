import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  return (
    <div className="group bg-white rounded-3xl border border-gray-200 p-6 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={expert.profileImage}
              alt={expert.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />

            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-500 border-2 border-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {expert.name}
            </h2>

            <p className="text-indigo-600 font-semibold mt-2 text-lg">
              {expert.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-amber-500 font-bold text-lg">
          <Star size={18} fill="currentColor" />
          {expert.rating}
        </div>
      </div>

      <p className="text-slate-500 leading-8 text-[15px] line-clamp-3 min-h-90px">
        {expert.bio}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {expert.skills?.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-slate-900 font-bold text-xl">
            {expert.experience} yrs
          </h3>

          <p className="text-slate-400 text-sm">
            experience
          </p>
        </div>

        <Link
          to={`/experts/${expert._id}`}
          className="px-6 py-3 rounded-2xl bg-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;