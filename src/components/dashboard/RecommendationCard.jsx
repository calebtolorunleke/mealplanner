// import React, { useEffect, useState } from "react";
// // import { mealsData } from "../../../data/meal";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

// const RecommendationCard = () => {
//   const [apiMeal, setApiMeal] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMeals = async () => {
//       setLoading(true);

//       try {
//         const response = await fetch(
//           "https://backend-mealablev2.onrender.com/api/recommended/all",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           },
//         );
//         const data = await response.json();
//         setApiMeal(data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMeals();
//   }, []);

//   // const recommendedMeals = mealsData.slice(0, 7);
//   return (
//     <>
//       {loading ? (
//         <h1>Loading</h1>
//       ) : (
//         <section>
//           <div className="flex flex-row flex-wrap gap-4">
//             {apiMeal.map((meal) => (
//               <div
//                 className="flex flex-col gap-4 flex-wrap min-w-[160px] bg-white p-3 shadow-sm hover:shadow-md rounded-lg transition-all"
//                 key={meal.id}
//               >
//                 <div className="">
//                   <img
//                     src={meal.imageUrl}
//                     alt={meal.title}
//                     className="w-full object-cover h-20 rounded-md"
//                   />
//                 </div>

//                 <div className="mt-1">
//                   <div className="flex flex-row justify-between items-center ">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-md ${meal.category === "Lunch" || meal.category === "Dinner" ? "bg-green-100" : "bg-orange-100 text-orange-800"}`}
//                     >
//                       {meal.category}
//                     </span>

//                     <button className="text-green-900 hover:scale-110 transition">
//                       <AddCircleRoundedIcon className="" />
//                     </button>
//                   </div>

//                   <h3 className="font-semibold text-gray-900 mt-3">
//                     {meal.title.slice(0, 6)}
//                   </h3>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default RecommendationCard;

import React, { useEffect, useState } from "react";
import { mealsData } from "../../data/meal";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { data } from "react-router-dom";

const RecommendationCard = () => {
  const [apiMeal, setApiMeal] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     setLoading(true);

  //     const token = localStorage.getItem("token");

  //     try {
  //       const response = await fetch(
  //         "https://backend-mealablev2.onrender.com/api/recommended/all",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       );
  //       const data = await response.json();
  //       setApiMeal(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchMeals();
  // }, []);

  // const recommendedMeals = mealsData.slice(0, 7);
  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <section>
          <div className="flex flex-row flex-wrap gap-4">
            {mealsData.map((meal) => (
              <div
                className="flex flex-col gap-4 min-w-[180px] bg-white p-3 shadow-sm hover:shadow-md rounded-lg transition-all"
                key={meal._id}
              >
                <div className="h-20 rounded-md bg-green-100 flex items-center justify-center">
                  <span className="text-green-900 font-bold text-sm">
                    {meal.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="mt-1">
                  <div className="flex flex-row justify-between items-center">
                    <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-900">
                      {meal.difficulty}
                    </span>

                    <button className="text-green-900 hover:scale-110 transition">
                      <AddCircleRoundedIcon />
                    </button>
                  </div>

                  <h3 className="font-semibold text-gray-900 mt-3">
                    {meal.name.slice(0, 15)}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {meal.calories} calories
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RecommendationCard;
