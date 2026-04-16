import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { name: "Requests", icon: "🛠️", path: "/admin/requests" },
    { name: "Technicians", icon: "👨‍🔧", path: "/admin/technicians" },
    { name: "Add Technician", icon: "➕", path: "/admin/technicians/add" },
    { name: "Customers", icon: "👥", path: "/admin/customers" },

  ];
   const nav=useNavigate()
  const {user,setUser,loading}=useContext(AuthContext)
  useEffect(()=>{
if(!user && !loading){
nav("/")
}
  },[user,loading,nav])

  const handleLogout=async()=>{
    try {
      const res= await  axios.post('http://localhost:5000/api/auth/logout',{},{withCredentials:true})
      if(res.data?.success){
        setUser(null);
        nav("/");
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
    
      {/* Mobile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed  min-h-screen top-16 left-0 h-full w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>
        <div className="flex flex-col justify-between h-[78vh]">
        <nav className="space-y-2">
          {menu.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={() => setOpen(false)}
              className={() =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${
                 window.location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

        </nav>
            <div  onClick={handleLogout}  className="relative m-1">
      <div  className="absolute w-full left-0 h-full backdrop-blur-[20px]  bg-white/10   z-10 top-0 rounded-lg"/>
        <div className=" relative flex p-5 hover:text-blue-500 gap-10 rounded-lg z-40 ">
          Logout <LogOut/>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;