// pages/technician/TechnicianProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Header from "../../components/home/Header";
import SideBar from "../../components/TechnicianDashboard/SideBar";

const TechnicianProfile = () => {
  const { user, loading } = useContext(AuthContext);
 const [jobs,setJobs]=useState([]);
 const [loadings,setLoadings]=useState(false)
 const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/technician/get/all/assigned/requests",
          { withCredentials: true }
        );
        setJobs(res.data?.data || []);
        console.log(res.data?.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoadings(false);
      }
    };
    useEffect(() => {
      fetchServices();
    }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
    <Header/>
    <SideBar/>
    <div className="min-h-screen mt-16 bg-gray-100 p-6">
      {/* 🔷 Profile Card */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-8">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {user?.username?.charAt(0) || "T"}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold">{user?.username}</h2>

            {/* 🔥 Contact Info */}
            <div className="text-gray-600 text-sm mt-1 space-y-1">
              <p>📧 {user?.email || "Not provided"}</p>
     
            </div>

            <span className="inline-block mt-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              Active Technician
            </span>
          </div>

        </div>

        {/* Skills */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              Laptop Repair
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              Hardware
            </span>
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
              OS Installation
            </span>
          </div>
        </div>

      </div>

      {/* 🔷 Assigned Jobs */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">

        <h3 className="text-xl font-bold mb-4">Assigned Jobs</h3>

        <div className="space-y-4">

          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{job.deviceType}</h4>
                <p className="text-sm text-gray-600">{job.issueType}</p>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  job.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}

        </div>
      </div>

    </div>
    </>
  );
};

export default TechnicianProfile;