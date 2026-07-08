import { ArrowLeft } from "@mui/icons-material";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "../navigation/Header";
import { IoIosArrowBack } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { mealsData } from "../../data/meal";
import mealpic from "../../assets/images/meal.jpg";
import { BsForkKnife } from "react-icons/bs";

const MealDetail = () => {
    const data = [
        30,34,40
    ]
  return (
    <div className="pb-2">
      <nav className=" container text-gray-700 w-11/12 mx-auto justify-between items-center py-5  flex">
        {/* left side */}
        <div className=" items-center   gap-2 flex">
          <span>
            <FaArrowLeft />
          </span>
          <p className="font-bold text-xl">Mealable</p>
        </div>

        {/* right side */}
        <div className="flex items-center  gap-2">
          <button className="relative p-1 text-slate-700 hover:text-green-600 transition-colors">
            <ShoppingCartIcon className="w-5 h-5" />
          </button>

          {/* Profile Image Avatar Placeholder */}
          <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 overflow-hidden flex items-center justify-center text-xs text-slate-600">
            <span>U</span>
          </div>
        </div>
        {/* Cart Icon */}
      </nav>

      {/* the nav line */}
      <div className="w-full outline-gray-500 outline-1 "></div>

      <div className="container text-gray-700 w-11/12 mx-auto">
        {/* Nav */}

        {/* navigation */}
        <div className=" w-full flex items-start flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 py-8">
          <span className="text-sm font-semibold flex items-center gap-1">
            <p>Dashboard</p>
            <IoIosArrowBack />
            <p>Meal Detail</p>
          </span>

          <button className=" bg-green-900 rounded-lg text-white text-sm font-semibold py-1 px-3">
            <span className="flex gap-2 items-center ">
              <GoPencil />
                <p>Edit Meal</p>
            </span>
          </button>
        </div>

        {/* meal img / ingredients */}
        <div className="flex flex-col md:flex-row  justify-between gap-5">
          {/* left img/recipe */}
          <div>
            <div className="w-full h-100 relative">
                <span className="flex gap-2 absolute left-4 top-5">
                    <p className="text-green-950 font-semibold text-[10px] md:text-3 items-center justify-center bg-gray-200/70 px-2 py-1 rounded-2xl">Dinner</p>
                    <p className="text-green-950 font-semibold text-[10px] md:text-3 items-center justify-center bg-gray-200/70 px-2.5 py-1 rounded-2xl">450 Kcal</p>
                </span>
              <img src={mealpic} alt=""  className="rounded-2xl w-full h-100"/>
            </div>

            <div className="bg-gray-100 mt-3 p-4 flex flex-col gap-2 space-y-4 rounded-lg">
              <span className="space-y-2 ">
                <h2 className="text-lg font-semibold text-green-950">MEALS NAME</h2>

                {/* recipw */}
                <p className="text-pretty font-normal">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat error ducimus odio soluta vero nihil culpa sapiente!
                  Numquam veniam facere reiciendis delectus dolor hic tenetur
                  maxime consequuntur, neque aspernatur architecto ex libero ea
                  alias quae cum asperiores possimus, et nisi.
                </p>
              </span>

              <span className="flex gap-1 items-center">
                <BsForkKnife />
                <h3 className="text-4 font-semibold">Prep Notes</h3>
              </span>

              <span className="bg-green-100 p-2 font-italic border-l-2 border-green-950 rounded-xl">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                eos nam possimus placeat quia, incidunt earum. Ipsum dicta eos
                esse."
              </span>
            </div>
          </div>

          {/* right ingredient/nutrition */}
          <div className="w-full flex flex-col md:flex gap-4">
            {/* ingredent */}
            <div className=" bg-gray-200 p-5 rounded-2xl w-full h-[80%]">
                <span className="w-full flex justify-between">
                    <h3 className="text-2xl font-semibold">Ingredients</h3>
                    <span className="px-2 py-1 bg-gray-300 rounded-lg text-nowrap font-semibold">10 Items</span>
                </span>

                {
                    data.map((ingrendient, index) => {
                        return (
                        <div key={index}>
                            <p >{ingrendient}</p>
                            <div className="w-full outline-1 outline-green-950/50"></div>
                        </div>
                    )})
                }
            </div>
            {/* nutrition */}
            <div className="w-full bg-green-950 text-gray-200 rounded-lg flex flex-col gap-3 p-4">
                <h3 className="text-2xl font-semibold">Nutrition</h3>
                <div className="w-full flex flex-col md:flex-row justify-between gap-4">
                    {
                        data?.map((weight,index)=>(
                            <div key={index} className="bg-green-900 w-full  px-5 py-2 flex items-center rounded ">
                                <span className="w-full flex flex-col">
                                    <p className="font-semibold text-center">{weight}g</p>
                                    <p className="text-center">calories</p>
                                </span>
                            </div>
                        ))
                    }


                </div>
                {/* <button></button> */}
                    <button className="w-full outline-1 p-2 rounded-lg">
                        View more detail
                    </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetail;
