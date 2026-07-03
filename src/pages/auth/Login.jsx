import LogInForm from "../../components/auth/LogInForm";
import Logo from "../../assets/images/Logo.jpeg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-green-50 font-serif px-4">
      <div className="flex flex-col gap-5 pb-5">
        {" "}
        <img
          src={Logo}
          alt="MealPlanner Logo"
          className="h-12 w-auto object-contain rounded-2xl"
        />
        <h1 className="text-xl font-semibold text-green-900 font-serif">
          MealPlanner
        </h1>
      </div>
      <div className=" max-w-[600px] shadow-2xl rounded-3xl overflow-hidden">
        <LogInForm />
      </div>{" "}
      <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{"  "}
        <Link to="/signup" className="text-green-900 font-bold cursor-pointer">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;
