import MealDiscovery from "../../components/dashboard/MealDiscovery";
import Header from "../../components/navigation/Header";
import Hero from "../../components/navigation/Hero";
import BottomNav from "../../components/navigation/BottomNav";

const MealMedia = () => {
  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
        <MealDiscovery />
      </main>
      <BottomNav />
    </div>
  );
};

export default MealMedia;
