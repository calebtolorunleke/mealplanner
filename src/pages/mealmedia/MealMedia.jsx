import MealDiscovery from "../../components/dashboard/MealDiscovery";
import Header from "../../components/navigation/Header";
import Hero from "../../components/navigation/Hero";

const MealMedia = () => {
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <MealDiscovery />
    </div>
  );
};

export default MealMedia;
