import React from "react";
import Header from "../../components/navigation/Header";
import RecState from "../../components/dashboard/Recstate";
import RecommendationCard from "../../components/dashboard/RecommendationCard";
import WeekDate from "../../components/dashboard/WeekDate";
import SuggestionFood from "../../components/dashboard/SuggestionFood";
import SundayPlan from "../../components/dashboard/SundayPlan";
import BottomNav from "../../components/navigation/BottomNav";

const Dashboard = () => {
  const todaysDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <section className="bg-[#f4f7f2] min-h-[100vh] flex flex-col">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        <RecState todaysDate={todaysDate} />
        <RecommendationCard />
        <WeekDate />
        <SuggestionFood />
        <SundayPlan />
      </main>
      <BottomNav />
    </section>
  );
};

export default Dashboard;

