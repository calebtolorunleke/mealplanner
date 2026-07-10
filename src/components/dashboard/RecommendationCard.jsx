import React, { useEffect, useState } from "react";
import { mealsData } from "../../data/meal";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const RecommendationCard = () => {
  const [apiMeal, setApiMeal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setApiMeal(mealsData);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://backend-mealablev2.onrender.com/api/recommended/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.data && data.data.length > 0) {
          setApiMeal(data.data);
        } else {
          setApiMeal(mealsData);
        }
      } catch (error) {
        console.warn("Failed to fetch recommended meals, falling back to mock data.", error);
        setApiMeal(mealsData);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const displayMeals = (apiMeal.length > 0 ? apiMeal : mealsData)
    .map((meal) => ({
      id: meal._id || meal.id || Math.random().toString(),
      title: meal.name || meal.title || "Delicious Meal",
      difficulty: meal.difficulty || "Medium",
      calories: meal.calories || 450,
      imageUrl: meal.imageUrl || null,
    }))
    .slice(0, 10);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-900" />
        </div>
      ) : (
        <section className="relative w-full overflow-hidden">
          <div className="flex flex-row overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth w-full -mx-4 px-4 sm:mx-0 sm:px-0">
            {displayMeals.map((meal) => (
              <div
                className="flex flex-col justify-between flex-shrink-0 w-[200px] bg-white border border-gray-100 hover:border-green-100 shadow-sm hover:shadow-md rounded-2xl transition-all duration-300 overflow-hidden"
                key={meal.id}
              >
                {meal.imageUrl ? (
                  <div className="h-28 w-full overflow-hidden relative">
                    <img
                      src={meal.imageUrl}
                      alt={meal.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-28 w-full bg-green-50 flex items-center justify-center">
                    <span className="text-green-800 font-extrabold text-2xl tracking-wider">
                      {meal.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="p-3.5 flex flex-col justify-between flex-grow gap-3">
                  <div>
                    <div className="flex flex-row justify-between items-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-800 uppercase tracking-wide">
                        {meal.difficulty}
                      </span>
                      <button className="text-green-900 hover:text-green-700 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">
                        <AddCircleRoundedIcon fontSize="small" />
                      </button>
                    </div>

                    <h3 className="font-bold text-sm text-green-950 mt-2.5 line-clamp-2 min-h-[40px]">
                      {meal.title}
                    </h3>
                  </div>

                  <p className="text-[11px] font-semibold text-gray-400">
                    🔥 {meal.calories} kcal
                  </p>
                </div>
              </div>
            ))}
          </div>

          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </section>
      )}
    </>
  );
};

export default RecommendationCard;
