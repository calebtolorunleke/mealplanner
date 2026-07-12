import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "plan", label: "Plan", Icon: CalendarTodayIcon, path: "/dashboard" },
    { id: "groceries", label: "Groceries", Icon: ShoppingBagIcon, path: "/grocerylist" },
    { id: "recipes", label: "Recipes", Icon: MenuBookIcon, path: "/meals" },
    { id: "profile", label: "Profile", Icon: PersonIcon, path: "/editprofile" },
  ];

  const getActiveId = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return "plan";
    if (path.includes("/grocerylist")) return "groceries";
    if (path.includes("/meals")) return "recipes";
    if (path.includes("/editprofile")) return "profile";
    return "plan";
  };

  const activeId = getActiveId();

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-green-100 flex justify-around py-2 pb-3 z-50 shadow-lg">
        {navItems.map(({ id, label, Icon, path }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              id={`bottom-nav-${id}`}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 bg-none border-none cursor-pointer text-[10px] font-semibold py-1.5 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-green-800 shadow-sm"
                  : "text-gray-400 hover:text-green-800 hover:bg-green-50"
              }`}
            >
              <Icon fontSize="small" />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Adjust page padding for mobile bottom nav spacer */}
      <div className="h-16 md:hidden w-full flex-shrink-0" />
    </>
  );
};

export default BottomNav;
