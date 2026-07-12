import {
  ArrowForwardRounded,
  LockOutlineRounded,
  MailOutlineOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { useState } from "react";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsCheck, settermsCheck] = useState(false);

  const createAccount = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!termsCheck) {
      alert("Kindly read and agree to the terms");
      return;
    }

    try {
      const fetchData = await fetch(
        "https://backend-mealablev2.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: fullName,
            email: email,
            password: newPassword,
          }),
        },
      );

      const data = await fetchData.json();

      if (!fetchData.ok) {
        throw new Error(data.message);
      }

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }

    console.log("all good");
  };

  return (
    <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
      <h1 className="text-4xl lg:text-5xl font-bold text-green-900">
        Create Account
      </h1>

      <h3 className="text-green-900 text-md mt-2">
        Join our community and start organizing your healthy life.
      </h3>

      <form className="mt-8 space-y-5" onSubmit={(e) => createAccount(e)}>
        <div className="flex flex-col gap-2 ">
          <label className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="relative bg-green-50">
            <PersonOutlineOutlined
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
              sx={{ fontSize: 22 }}
            />

            <input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              type="text"
              value={fullName}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-green-800"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor=""
            className="block text-sm font-semibold text-gray-700"
          >
            Email Address
          </label>

          <div className="relative bg-green-50">
            <MailOutlineOutlined
              className="absolute top-1/2 -translate-y-1/2 text-gray-600 left-4"
              sx={{ fontSize: 22 }}
            />
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="name@example.com"
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 outline-none focus:border-green-800"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row  gap-5 ">
          <div className="flex-1">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              {" "}
              Password
            </label>

            <div className="relative bg-green-50">
              <LockOutlineRounded
                className="absolute top-1/2 -translate-y-1/2 text-gray-600 left-4"
                sx={{ fontSize: 22 }}
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 outline-none focus:border-green-800"
              />
            </div>
          </div>

          <div className="flex-1">
            <label
              htmlFor=""
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Confirm
            </label>

            <div className="relative bg-green-50">
              <LockOutlineRounded
                className="absolute top-1/2 -translate-y-1/2 text-gray-600 left-4"
                sx={{ fontSize: 22 }}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="Confirm password"
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 outline-none focus:border-green-800"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-5">
          <input
            type="checkbox"
            checked={termsCheck}
            onChange={(e) => {
              settermsCheck(e.target.checked);
            }}
            id="terms"
            className="mt-1 h-4 w-4 accent-green-800 cursor-pointer"
          />

          <label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-6 cursor-pointer"
          >
            I agree to the{" "}
            <span className="text-green-800 font-semibold hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-green-800 font-semibold hover:underline">
              Privacy Policy
            </span>
            .
          </label>
        </div>

        {termsCheck ? (
          ""
        ) : (
          <span className="text-red-600">
            Kindly read and agree to the terms
          </span>
        )}

        <button
          type="submit"
          // onClick={createAccount(e)}
          className="w-full bg-green-900 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition flex items-center justify-center gap-2"
        >
          Create Account
          <ArrowForwardRounded sx={{ fontSize: 20, color: "white" }} />
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{"  "}
        <a className="text-green-900 font-bold cursor-pointer" href="/">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
