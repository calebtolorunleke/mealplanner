import React from "react";
import { mealsData } from "../../data/meal";

const SuggestionFood = () => {
  const slicedMeal = mealsData.slice(0, 4);
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {slicedMeal.map((meal) => (
        <div
          className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-green-100 transition-all duration-300 overflow-hidden flex flex-col h-full"
          key={meal.id}
        >
          <div className="w-full h-[180px] overflow-hidden relative">
            <img
              src={meal.imageUrl}
              alt={meal.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="p-5 flex flex-col gap-3 flex-grow justify-between">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-row items-center justify-between">
                <span
                  className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    meal.category === "Breakfast" || meal.category === "Lunch"
                      ? "bg-green-50 text-green-800"
                      : "bg-orange-50 text-orange-800"
                  }`}
                >
                  {meal.category}
                </span>
                <span className="text-gray-400 font-bold hover:text-green-800 transition cursor-pointer select-none">•••</span>
              </div>
              <div>
                <h2 className="font-extrabold text-green-950 text-md line-clamp-1">{meal.title}</h2>
                <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 min-h-[32px] leading-relaxed">
                  {meal.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3.5 mt-1">
              <span className="text-xs font-semibold text-gray-400">⏱ {meal.prepTime} mins</span>
              <span className="text-xs font-bold text-green-900">🔥 {meal.calories} kcal</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SuggestionFood;
