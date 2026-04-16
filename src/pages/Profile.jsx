// pages/Profile.jsx
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/home/Header";
import Sidebar from "../components/customerDashboard/Sidebar";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="animate-pulse text-xl">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-red-500 text-xl">User not logged in</h1>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <Sidebar/>
  
 
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Profile
        </h2>
 <hr  className="mt-4 border-gray-500"/>
        <div className="space-y-4">
          
          <div>
            <p className="text-gray-500 text-sm">Username</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.username || user.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.email}
            </p>
          </div>

        </div>

      </div>
    </div>
    </>
  );
};

export default Profile;