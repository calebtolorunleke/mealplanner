import {
  ArrowForwardRounded,
  LockOutlineRounded,
  MailOutlineOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";

const LogInForm = () => {
  return (
    <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
      <h1 className="text-3xl lg:text-5xl font-bold text-green-900">
        Welcome Back
      </h1>

      <h3 className="text-green-900 text-md mt-2">
        Sign in to manage your weekly nourishment.{" "}
      </h3>

      <form className="mt-8 space-y-5">
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
              placeholder="name@example.com"
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 outline-none focus:border-green-800"
            />
          </div>
        </div>

        <div className="">
          <div className="">
            <div className="flex justify-between">
              {" "}
              <label
                htmlFor=""
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                {" "}
                Password
              </label>{" "}
              <a
                href="#forgot-password"
                className="block mb-2 text-sm font-semibold text-green-700 hover:text-green-800 hover:underline transition-colors"
              >
                {" "}
                Forgot?
              </a>
            </div>

            <div className="relative bg-green-50">
              <LockOutlineRounded
                className="absolute top-1/2 -translate-y-1/2 text-gray-600 left-4"
                sx={{ fontSize: 22 }}
              />
              <input
                type="password"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-xl py-3 pl-12 outline-none focus:border-green-800"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-900 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition flex items-center justify-center gap-2"
        >
          Sign in
          <ArrowForwardRounded sx={{ fontSize: 20, color: "white" }} />
        </button>

        <div className="flex flex-row items-center w-full my-6">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            OR
          </span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
          {/* Google Button */}
          <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* Apple Button */}
          <button className="flex-1 flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 bg-white text-gray-700 font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
