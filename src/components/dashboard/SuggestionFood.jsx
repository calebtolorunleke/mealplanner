import React from "react";
import { mealsData } from "../../../data/meal";

const SuggestionFood = () => {
  const slicedMeal = mealsData.slice(0, 4);
  return (
    <section className="flex flex-row gap-3 flex-wrap ">
      {slicedMeal.map((meal) => (
        <div className="bg-white w-[300px] rounded-lg shadow-sm" key={meal.id}>
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-[180px] object-cover rounded-t-lg"
          />

          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between mt-">
              <h6
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  meal.category === "Breakfast" || meal.category === "Lunch"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {meal.category}
              </h6>
              <span>...</span>
            </div>
            <div>
              <h2 className="font-bold text-green-900">{meal.title}</h2>
              <p className="text-sm">{meal.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default SuggestionFood;
