import React, { useContext, useState,useEffect } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/assets/images/logo.png";
import Header from "../components/home/Header";
import AuthContext from "../context/AuthContext";

const Register = () => {

  const {user,loading,setUser}=useContext(AuthContext);
   const navigate=useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loadings, setLoadings] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
 const [registerError, setRegisterError] = useState("");
   const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ fixed
  if (!passwordRegex.test(formData.password)) {
    return setRegisterError(
      "Password must be 8+ chars, include uppercase, lowercase, number & special character"
    );
  }
    setLoadings(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { withCredentials: true }
      );
      if (res.data?.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      setRegisterError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoadings(false);

    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 px-4">

      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">

        {/* 🔷 Logo + Title */}
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-[70px] h-[70px] rounded-full shadow-md"
            src={logo}
            alt="logo"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account 🚀
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Join and manage your services easily
          </p>
        </div>

        {/* 🔷 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <FormField
            type="text"   // ✅ fixed
            label={"Full Name"}
            required={true}
            value={formData.username}
            onChange={handleChange}
            name="username"
          />

          <FormField
            type="email"
            label={"Email"}
            required={true}
            value={formData.email}
            onChange={handleChange}
            name="email"
          />

          <FormField
            type="password"
            label={"Password"}
            required={true}
            value={formData.password}
            onChange={handleChange}
            name="password"
          />

          {/* 🔷 Login Link */}
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
   {/* 🔴 Error */}
            {registerError && (
              <div className="bg-red-100 text-red-600 text-sm p-2 rounded-md text-center">
                {registerError}
              </div>
            )}
          <button
            type="submit"
            disabled={loadings}
            className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
          >
            {loadings ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;