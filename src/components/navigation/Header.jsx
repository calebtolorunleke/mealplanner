import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <header className="bg-green-50 py-3 px-6 flex items-center justify-between border-b border-green-100">
      {/* Branding */}
      <span className="text-xl font-black text-slate-900 tracking-tight">
        Mealable
      </span>

      {/* Navigation & Utilities */}
      <nav className="flex items-center gap-6 text-sm font-semibold text-slate-600">
        {/* Main Links */}
        <ul className="flex flex-row gap-6">
          <li className="hover:text-green-600 cursor-pointer transition-colors">
            Plan
          </li>
          <li className="hover:text-green-600 cursor-pointer transition-colors">
            Groceries
          </li>
          <li className="hover:text-green-600 cursor-pointer transition-colors">
            Recipes
          </li>
          <li className="hover:text-green-600 cursor-pointer transition-colors">
            Profile
          </li>
        </ul>

        <div className="h-4 w-px bg-slate-300"></div>

        {/* Cart Icon */}
        <button className="relative p-1 text-slate-700 hover:text-green-600 transition-colors">
          <ShoppingCartIcon className="w-5 h-5" />
        </button>

        {/* Profile Image Avatar Placeholder */}
        <div className="w-8 h-8 rounded-full bg-slate-300 border border-slate-400 overflow-hidden flex items-center justify-center text-xs text-slate-600">
          <span>U</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
