import {
  PlusOne,
  PlusOneRounded,
  RestaurantMenuRounded,
} from "@mui/icons-material";
import React from "react";
import { LiaPlusSolid } from "react-icons/lia";

const SundayPlan = () => {
  return (
    <section className="p-4">
      <div className="w-full rounded-xl border border-dashed border-green-300 bg-green-50 py-10 px-6 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
          <RestaurantMenuRounded
            sx={{ fontSize: 36 }}
            className="text-green-700"
          />
        </div>

        <h2 className="text-xl font-bold text-green-900">Quiet Sunday?</h2>

        <p className="text-gray-600 max-w-sm">
          You haven't planned any meals for Sunday yet.
          <br />
          Tap the button below to start your week right.
        </p>

        <button className="flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800 transition">
          <LiaPlusSolid />
          Plan Sunday
        </button>
      </div>
    </section>
  );
};

export default SundayPlan;
