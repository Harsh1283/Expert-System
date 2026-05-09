import { useEffect, useState } from "react";

import api from "../api/axios";

import Navbar from "../components/Navbar";
import ExpertCard from "../components/ExpertCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSkeleton from "../components/LoadingSkeleton";

const categories = [
  "All",
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
];

const HomePage = () => {
  const [experts, setExperts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState(null);

  const fetchExperts = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/experts",
        {
          params: {
            search,
            category,
            page,
            limit: 8,
          },
        }
      );

      setExperts(
        response.data.data || []
      );

      setPagination(
        response.data.pagination
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [search, category, page]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight">
              Discover Experts
            </h1>

            <p className="text-slate-500 text-lg mt-3 max-w-xl leading-relaxed">
              Book real-time mentorship
              sessions with top-tier
              industry professionals.
            </p>
          </div>

          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : experts.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center rounded-3xl bg-white border border-dashed border-gray-300 text-slate-500 text-lg">
            No experts found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {experts.map((expert) => (
              <ExpertCard
                key={expert._id}
                expert={expert}
              />
            ))}
          </div>
        )}

        {pagination && (
          <div className="flex items-center justify-center gap-4 mt-14">
            <button
              disabled={
                !pagination.hasPrev
              }
              onClick={() =>
                setPage(
                  (prev) => prev - 1
                )
              }
              className="px-6 py-3 rounded-2xl border border-gray-200 bg-white disabled:opacity-50 hover:border-indigo-500 transition-all duration-300"
            >
              Previous
            </button>

            <div className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold">
              Page {pagination.page}
            </div>

            <button
              disabled={
                !pagination.hasNext
              }
              onClick={() =>
                setPage(
                  (prev) => prev + 1
                )
              }
              className="px-6 py-3 rounded-2xl border border-gray-200 bg-white disabled:opacity-50 hover:border-indigo-500 transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;