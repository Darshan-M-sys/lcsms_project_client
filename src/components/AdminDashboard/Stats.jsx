import React from "react";
import { FaTools, FaClock, FaCheckCircle, FaRupeeSign } from "react-icons/fa";

const Stats = ({stats}) => {
  return (
    <div className="p-6 bg-gray-100 ">

      {/* 🔷 Title */}
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* 📊 Stats Cards */}
      <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">

        {/* Total Requests */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <p className="text-gray-500">Total Requests</p>
            <h2 className="text-2xl font-bold mt-1">{stats.totalRequests}</h2>
          </div>
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <FaTools size={20} />
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-2xl font-bold mt-1">{stats.pendingRequests}</h2>
          </div>
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
            <FaClock size={20} />
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <p className="text-gray-500">Completed</p>
            <h2 className="text-2xl font-bold mt-1">{stats.completedRequests}</h2>
          </div>
          <div className="bg-green-100 p-3 rounded-full text-green-600">
            <FaCheckCircle size={20} />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl shadow p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold mt-1">₹{stats.totalRevenue}</h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-full text-purple-600">
            <FaRupeeSign size={20} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Stats;