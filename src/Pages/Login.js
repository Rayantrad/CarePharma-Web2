import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../Contexts/UserContext"; // ✅ useUser instead of useAuth
import { NavLink, useNavigate, useLocation } from "react-router";

function Login() {
  const { login, loginError, loading, isAuth } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/allcategories";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth]);

  const onSubmit = (data) => {
    login(data.email, data.password);
  };

  return (
    <div className="flex flex-col items-center gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
      <div>
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl pb-6 font-bold text-blue-900 leading-snug">
          Welcome back to CarePharma <br />
          <span className="text-blue-600">Login to continue your journey</span>
        </h1>
      </div>

      <div className="border rounded-lg shadow-md px-4 py-6 w-full max-w-md bg-white">
        <h3 className="text-center text-xl font-semibold text-blue-700 mb-4">Login</h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              className={`border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.email ? "border-red-400" : ""}`}
              type="email"
              id="email"
              {...register("email", { required: "Email is required!" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className={`border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? "border-red-400" : ""}`}
              {...register("password", { required: "Password is required!" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm text-center">
              {loginError}
            </div>
          )}

          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition mt-2 cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <div className="text-sm text-gray-700">
        Don’t have an account?{" "}
        <NavLink to="/signup" className="text-blue-600 hover:underline font-medium">
          Sign up here
        </NavLink>
      </div>
    </div>
  );
}

export default Login;