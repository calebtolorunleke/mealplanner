// import { div } from "framer-motion/client";
import SearchIcon from "@mui/icons-material/Search";

const FilterBar = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      {/* Search and Filter Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mx-4 sm:mx-8 my-6 sm:my-10">
        {/* Search Bar Wrapper */}
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-green-700" />
          </div>
          <input
            type="search"
            placeholder="Search meals or ingredients..."
            className="w-full bg-green-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border border-green-100 py-2.5 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
          />
        </div>

        {/* 2. Category Filter Pills */}
        <ul className="flex flex-row gap-2 text-sm font-semibold overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide justify-start md:justify-end">
          {["All", "Breakfast", "Lunch", "Dinner"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 select-none whitespace-nowrap active:scale-95 ${
                activeTab === tab
                  ? "bg-green-900 text-white" // Active styles
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200" // Inactive styles
              }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterBar;
