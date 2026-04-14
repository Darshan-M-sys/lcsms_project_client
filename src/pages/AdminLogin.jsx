import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import Header from "../components/home/Header";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {user,loading}=useContext(AuthContext)
   useEffect(()=>{
    if(!loading && user){
      navigate("/admin/dashboard");
    }
   },[loading,user,navigate])
  const [loadings, setLoadings] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 const [loginError, setLoginError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoadings(true);

      const res = await axios.post("http://localhost:5000/api/admin/login", formData,{withCredentials:true});
      if (res.data.success) {
        setLoginError("");
        navigate("/admin/dashboard");
      } else {
        setLoginError(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
     setLoginError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoadings(false);
    }
  };

  return (
    <>
    <Header/>  
      <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <FormField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required={true}
            placeholder="Enter admin email"
          />

          {/* Password */}
          <FormField
            label="Password"
            name="password"
            type="password"
              required={true}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <p><a href="/admin/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a></p>
          {loginError && <p className="text-red-500">{loginError}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loadings}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loadings ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
    </>

  );
};

export default AdminLogin;