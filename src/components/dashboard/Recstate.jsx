import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React from "react";
import { useNavigate } from "react-router-dom";

const RecState = ({ todaysDate }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-extrabold text-3xl sm:text-4xl text-green-950 tracking-tight">
            Your Weekly Table
          </h1>
          <h3 className="text-gray-500 text-sm sm:text-base">{todaysDate}</h3>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-900 hover:bg-green-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-250 cursor-pointer shadow-sm active:scale-95">
            <AddCircleRoundedIcon className="w-4 h-4 text-white" />
            <span>Add Meal</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-250 cursor-pointer shadow-sm active:scale-95"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-2">
        <h2 className="uppercase text-green-950 font-bold text-xs tracking-wider">
          recommendations
        </h2>
      </div>
    </div>
  );
};

export default RecState;
