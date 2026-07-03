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
    <section className="flex items-center justify-between my-8">
      <div className="flex gap-3">
        {days.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center px-3 py-2 rounded-lg cursor-pointer ${
              item.isToday
                ? "bg-green-900 text-white"
                : "bg-green-50 text-gray-700"
            }`}
          >
            <span className="text-xs">{item.day}</span>
            <span className="font-semibold">{item.date}</span>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 border border-green-900 text-green-900 px-3 py-2 rounded-lg text-sm">
        <StarRoundedIcon fontSize="small" />
        Fill my week
      </button>
    </section>
  );
};

export default WeekDate;