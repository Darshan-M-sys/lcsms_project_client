import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">

      {/* 🔷 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-purple-400 opacity-20 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      {/* 🔷 Content */}
      <div className="relative z-10 text-center px-6 ">

        {/* 🔥 Badge */}
        <p className="inline-block px-4 py-1 mb-4 text-sm bg-white/20 rounded-full backdrop-blur">
          🚀 Smart Service Management System
        </p>

        {/* 🔥 Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Manage Laptop & Computer Services <br />
          <span className="text-yellow-300">Smarter & Faster</span>
        </h1>

        {/* 🔥 Subtext */}
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Track repairs, manage customers, assign technicians, and monitor
          service progress — all in one powerful platform.
        </p>

        {/* 🔥 Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/register"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:scale-105 transition-all"
          >
            Get Started 🚀
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-blue-600 transition-all"
          >
            Login
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;