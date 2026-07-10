import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-green-50 py-3 px-6 flex items-center justify-between border-b border-green-100">
      {/* Branding */}
      <span
        onClick={() => navigate("/dashboard")}
        className="text-xl font-black text-slate-900 tracking-tight cursor-pointer"
      >
        MealPlanner
      </span>

      {/* Navigation & Utilities */}
      <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-600">
        {/* Main Links */}
        <ul className="hidden md:flex flex-row gap-6">
          <li
            onClick={() => navigate("/dashboard")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Plan
          </li>
          <li
            onClick={() => navigate("/grocerylist")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Groceries
          </li>
          <li
            onClick={() => navigate("/meals")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Recipes
          </li>
          <li
            onClick={() => navigate("/editprofile")}
            className="hover:text-green-600 cursor-pointer transition-colors"
          >
            Profile
          </li>
        </ul>

        <div className="hidden md:block h-4 w-px bg-slate-300"></div>

        {/* Cart Icon */}
        <button className="relative p-1 text-slate-700 hover:text-green-600 transition-colors cursor-pointer">
          <ShoppingCartIcon className="w-5 h-5" />
        </button>

        {/* Profile Image Avatar Placeholder */}
        <div
          onClick={() => navigate("/editprofile")}
          className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 overflow-hidden flex items-center justify-center text-xs text-slate-600 cursor-pointer"
        >
          <span>U</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;

