import React from "react";
import Header from "../../components/navigation/Header";
import RecState from "../../components/dashboard/Recstate";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import WeekDate from "../../components/dashboard/WeekDate";
import SuggestionFood from "../../components/dashboard/SuggestionFood";
import SundayPlan from "../../components/dashboard/SundayPlan";

const Dashboard = () => {
  const todaysDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <section className="bg-gray-100 min-h-[100vh]">
      <Header />
      <section className="py-3 px-6">
        <RecState todaysDate={todaysDate} />
        <RecommendationCard />
        <WeekDate />
        <SuggestionFood />
        <SundayPlan />
      </section>
    </section>
  );
};

export default Dashboard;
