import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const WeekDate = () => {
  const today = new Date();

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 3 + index);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
    };
  });

  return (
    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 w-full sm:w-auto">
        {days.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center px-3.5 py-2.5 rounded-xl cursor-pointer min-w-[52px] flex-shrink-0 transition-all duration-200 active:scale-95 ${
              item.isToday
                ? "bg-green-900 text-white shadow-md shadow-green-900/10 scale-102"
                : "bg-green-50 text-gray-700 hover:bg-green-100/70"
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{item.day}</span>
            <span className="font-extrabold text-sm mt-0.5">{item.date}</span>
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center gap-2 border-2 border-green-900/80 hover:border-green-900 text-green-900 font-bold px-4 py-2.5 rounded-xl text-sm transition-all duration-200 cursor-pointer hover:bg-green-50 active:scale-98 w-full sm:w-auto">
        <StarRoundedIcon fontSize="small" />
        Fill my week
      </button>
    </section>
  );
};

export default WeekDate;