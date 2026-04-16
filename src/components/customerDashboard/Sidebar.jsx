import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  User,
  PlusCircle,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
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

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/customer/dashboard" },
    { name: "My Services", icon: Wrench, path: "/customer/my/services" },
    { name: "Request Service", icon: PlusCircle, path: "/customer/request/service" },
    { name: "Profile", icon: User, path: "/customer/profile" },
  ];

  return (
    <>
      {/* 🔷 Mobile Top Bar (Height = 50px) */}
      <div className="md:hidden fixed top-[70px] left-0 w-full h-[50px] flex items-center justify-between bg-gray-900 text-white px-4 z-20">
        <h1 className="text-lg font-bold">TechService</h1>
        <Menu size={24} onClick={() => setOpen(true)} />
      </div>

      {/* 🔷 Sidebar */}
      <aside
        className={`fixed left-0 top-[60px] h-[calc(100vh-60px)] w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 z-20
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* 🔥 Close Button (Mobile) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <X size={22} onClick={() => setOpen(false)} />
        </div>

        {/* 🔥 Logo */}
        <h2 className="text-2xl font-bold mb-8 hidden md:block">
          TechService
        </h2>
         <div className="flex flex-col justify-between  h-[78vh]">
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

          <div  onClick={handleLogout}  className="relative m-1">
      <div  className="absolute w-full left-0 h-full backdrop-blur-[20px]  bg-white/10   z-10 top-0 rounded-lg"/>
        <div className=" relative flex p-5 hover:text-blue-500 gap-10 rounded-lg z-40 ">
          Logout <LogOut/>
        </div>
        </div>
        </div>
      </aside>

      {/* 🔷 Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;