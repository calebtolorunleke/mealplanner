import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Hero = () => {
  return (
    <div className="Hero flex flex-col md:flex-row items-center justify-between gap-8  bg-green-900 to-white p-6 md:p-12 rounded-2xl m-8  border-green-900 overflow-hidden shadow-sm">
      {/* Left Column: Text Content (Takes up 55% space on desktop) */}
      <div className="w-full md:w-[55%] space-y-5">
        {/* Massive, extra-thick heading with tracking pulled tight */}
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          Discover Healthy Flavors
        </h1>

        <h3 className="text-base text-gray-200 font-medium leading-relaxed max-w-xl">
          Explore our curated library of Nigerian-inspired meals, balanced for
          your wellness goals. Can't find what you need?
        </h3>

        <button className="flex items-center gap-2 bg-white hover:bg-green-700 hover:text-white text-green-900 font-bold py-3 px-5 rounded-3xl shadow-md shadow-green-600/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 mt-2">
          <AddCircleRoundedIcon className="w-5 h-5 hover:text-white text-green-900" />
          <span>Build my own meal</span>
        </button>
      </div>

      <div className="w-full md:w-[45%] h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1772693471187-6e7d364f99ee?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Curated healthy food setup"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
