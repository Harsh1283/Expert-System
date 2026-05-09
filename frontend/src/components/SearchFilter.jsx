import { Search } from "lucide-react";

const SearchFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search experts by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full sm:w-340px h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        />
      </div>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="h-14 rounded-2xl border border-gray-200 bg-white px-5 outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      >
        {categories.map((item) => (
          <option key={item} value={item}>
            {item} Categories
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;