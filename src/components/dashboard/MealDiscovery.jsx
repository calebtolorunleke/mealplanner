import React, { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import { mealsData } from "../../data/meal";
import FilterBar from "../features/FilterBar";

const MealDiscovery = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [meals] = useState(mealsData);

  const filterMeals = meals.filter(
    (meal) => activeTab === "All" || meal.category === activeTab,
  );

  return (
    <div className="w-full">
      <FilterBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 mx-4 sm:mx-6">
        {filterMeals.map((meal) => (
          <div
            className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full"
            key={meal.id}
          >
            {/* 1. Header & Image Frame Layout */}
            {/* Setting 'relative' here allows the badge to anchor itself inside this specific box wrapper */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 border border-slate-100">
              {/* The background image covers the entire container div cleanly */}
              <img
                src={meal.imageUrl}
                alt="Asaro Yam Porridge"
                className="h-full w-full object-cover"
              />

              {/* Category Pill: Positioned absolutely over the top-left of the image */}
              <span className="absolute top-3 left-3 text-xs font-black text-green-800 uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-200 shadow-sm z-10">
                {meal.category}
              </span>
            </div>

            {/* 2. Text Content Description Area */}
            <div className="flex flex-col justify-between flex-grow p-4 space-y-3 mt-1">
              <div>
                <h3 className="font-extrabold text-green-950 text-md">{meal.title}</h3>
                <h6 className="text-xs font-semibold text-slate-500 mt-1 line-clamp-2 leading-relaxed min-h-[32px]">
                  {meal.subtitle}
                </h6>
              </div>

              <div className="space-y-3">
                <div className="flex flex-row items-center justify-between gap-2 text-xs font-bold pt-2 border-t border-slate-50">
                  <span className="flex items-center gap-1 text-slate-600">
                    <LocalFireDepartmentRoundedIcon className="w-4 h-4 text-slate-500" />
                    <span>{meal.calories} kcal</span>
                  </span>

                  {/* Prep Time Badge with Clock Icon */}
                  <span className="flex items-center gap-1 text-slate-600">
                    <AccessTimeRoundedIcon className="w-4 h-4 text-slate-500" />
                    <span>{meal.prepTime} min</span>
                  </span>
                </div>

                {/* 4. Action Button */}
                <button className="flex w-full items-center justify-center gap-2 bg-green-900 hover:bg-green-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm cursor-pointer active:scale-98">
                  <AddCircleRoundedIcon className="w-4 h-4 text-white" />
                  <span>Add to plan</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealDiscovery;
