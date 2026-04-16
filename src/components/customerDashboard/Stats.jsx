import React from "react";
import { ClipboardList, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Stats = ({stats}) => {
  const statsData = [
  {
    title: "Total Requests",
    value: stats.total,
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "In Progress",
    value: stats.progress,
    icon: Clock,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Completed",
    value: stats.completed,
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Pending",
    value: stats.pending,
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
  },
];

  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div 
            key={index}
            className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transition-all"
          >
            {/* 🔷 Text */}
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>

            {/* 🔷 Icon */}
            <div
              className={`p-3 rounded-xl ${stat.color}`}
            >
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;