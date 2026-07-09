import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const Form = () => {
  return (
    <div className="text-gray-800 font-semibold text-3 md:text-4 my-4">
      <form action="" className="flex flex-col gap-4 text-sm">
        {/* Top */}
        <div className="bg-white p-4 rounded-lg shadow-lg shadow-gray/20">
          <div className="">
            <label htmlFor="MealName" className="text-sm">
              Meal Name
              <input
                type="text"
                name="MealName"
                placeholder="e.g jollof rice with plantain and turkey"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-2 focus:border-green-600"
              />
            </label>
          </div>

          {/*  */}
          <div className="flex flex-col md:flex-row justify-between gap-4 py-4">
            {/* Category Field Wrapper */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label
                htmlFor="Category"
                className="text-sm font-semibold text-gray-700"
              >
                Category
              </label>
              <select
                name="Category"
                id="Category"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600 cursor-pointer"
              >
                {/* 🔑 Fix 2: Corrected backend string option values */}
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            {/* Calories Field Wrapper */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label
                htmlFor="Calories"
                className="text-sm font-semibold text-gray-700"
              >
                Calories{" "}
                <span className="text-xs font-normal text-gray-400">
                  (Optional)
                </span>
              </label>
              <input
                type="number" /* 💡 Tip: Using type="number" blocks invalid text inputs */
                id="Calories"
                name="Calories"
                placeholder="e.g. 350"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-800"
              />
            </div>
          </div>

          <div>
            <label htmlFor="Description">
              Description
              <input
                type="text"
                name="Description"
                placeholder="Briefly describe this delicous meal..."
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600 cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Middle */}
        <div className="bg-white p-4 space-y-4 rounded-lg shadow-lg shadow-gray/20">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Ingredients</h3>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs font-semibold text-green-900 border border-green-900/20 bg-green-50/50 hover:bg-green-50 px-2.5 py-1.5 rounded-lg transition"
            >
              <IoMdAddCircleOutline size={16} />
              <span>Add Ingredient</span>
            </button>
          </div>

          {/* Input Row Grid */}
          {/* 🔑 Fix: Swapped flex-row for a strict 12-column grid on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end w-full">
            {/* Ingredient Name - Takes up 6 columns out of 12 */}
            <div className="md:col-span-6 flex flex-col gap-1.5">
              <label
                htmlFor="IngredientName"
                className="text-sm font-semibold text-gray-600"
              >
                Ingredient Name
              </label>
              <input
                type="text"
                id="IngredientName"
                name="IngredientName"
                placeholder="e.g., seasoning"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>

            {/* Quantity - Takes up 3 columns out of 12 */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label
                htmlFor="Quantity"
                className="text-sm font-semibold text-gray-600"
              >
                Qty
              </label>
              <input
                type="text"
                id="Quantity"
                name="Quantity"
                placeholder="1"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600"
              />
            </div>

            {/* Unit - Takes up 3 columns out of 12 */}
            <div className="md:col-span-3 flex flex-col gap-1.5">
              <label
                htmlFor="Unit"
                className="text-sm font-semibold text-gray-600"
              >
                Unit
              </label>
              <select
                name="Unit"
                id="Unit"
                className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600 bg-white cursor-pointer"
              >
                <option value="cups">cups</option>
                <option value="g">grams (g)</option>
                <option value="ml">ml</option>
                <option value="tbsp">tbsp</option>
                <option value="pcs">pieces</option>
              </select>
            </div>
          </div>
        </div>

        {/* buttom */}
        <div className="space-y-6">
          {/* Preparation Step Textarea */}
          <div className="flex flex-col gap-1.5 bg-white p-4 rounded-lg shadow-xl shadow-gray/20">
            <label
              htmlFor="Preparation"
              className="text-sm font-semibold text-gray-700"
            >
              Preparation Steps
            </label>
            <textarea
              name="Preparation"
              id="Preparation"
              rows="4"
              placeholder="Step 1. Chop vegetables...&#10;Step 2. Marinate chicken..."
              className="w-full text-sm bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:border-green-600 resize-none min-h-[100px]"
            />
          </div>

          {/* Form Action Toggles */}
          {/* 💡 Flex-row-reverse allows you to order them naturally while maintaining clean tab-key focus indexes */}
          <div className="flex flex-col md:flex-row justify-start gap-3 pt-4  border-gray-100">
            <button
              type="submit"
              className="w-full px-5 py-2.5 bg-green-900 hover:bg-green-800 text-white rounded-xl text-sm font-semibold transition shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Create Meal
            </button>

            <button
              type="button"
              className="w-full px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
