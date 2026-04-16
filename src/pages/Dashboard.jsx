import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    // ⛔ Wait until auth is resolved
    if (loading) return;

    // 🔐 Not logged in
    if (!user) {
      nav("/login", { replace: true });
      return;
    }

    // 🔀 Role-based redirect
    const routes = {
      customer: "/customer/dashboard",
      technician: "/technician/dashboard",
      admin: "/admin/dashboard",
    };

    const path = routes[user.role];

    nav(path || "/login", { replace: true });

  }, [user, loading, nav]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <h1 className="text-xl font-semibold animate-pulse">
        Redirecting...
      </h1>
    </div>
  );
};

export default Dashboard;