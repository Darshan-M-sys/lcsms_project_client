import React, { useContext, useEffect, useState } from "react";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/home/Header";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const { user, loading, refreshUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ Already logged-in user redirect
  useEffect(() => {
    if (!loading && user) {
      redirectByRole(user);
    }
  }, [user, loading]);

  const [loadings, setLoadings] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    setLoginError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 ROLE REDIRECT FUNCTION
  const redirectByRole = (user) => {
    switch (user.role) {
      case "customer":
        navigate("/customer/dashboard", { replace: true });
        break;
      case "technician":
        navigate("/technician/dashboard", { replace: true });
        break;
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      default:
        navigate("/dashboard", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setLoginError("All fields are required");
    }

    setLoadings(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (res.data?.success) {
        // 🔥 IMPORTANT: update context
        await refreshUser();

        // 🔥 get updated user from backend
        const userRes = await axios.get(
          "http://localhost:5000/api/auth/me",
          { withCredentials: true }
        );

        const loggedUser = userRes.data?.data;

        // 🔥 DIRECT REDIRECT HERE
        redirectByRole(loggedUser);
      }
    } catch (error) {
      setLoginError(
        error?.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoadings(false);
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white backdrop-blur-md rounded-2xl shadow-xl">

          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Welcome Back 👋
            </h2>
            <p className="text-sm text-center text-gray-500 mt-1">
              Login to manage your services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <FormField
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={handleChange}
              name="email"
            />

            <FormField
              type="password"
              label="Password"
              required
              value={formData.password}
              onChange={handleChange}
              name="password"
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>

              <p className="text-blue-600 font-semibold cursor-pointer hover:underline text-right">
                Forgot password?
              </p>
            </div>

            {loginError && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loadings}
              className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
            >
              {loadings ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;