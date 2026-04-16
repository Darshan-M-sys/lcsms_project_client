import React, { useContext, useEffect, useState } from "react";
import { Bell, Menu, X, User } from "lucide-react";
import logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {user,setUser,loading}=useContext(AuthContext);
  const nav=useNavigate();
   const [isLogout,setIsLogout]=useState(false)
  const handleLogout=()=>{
  
    try {
      const res=axios.post("http://localhost:5000/api/auth/logout",{},{
        withCredentials:true
      })
      if(res.data?.success){
        setUser(null)
        setIsLogout(true)
        nav("/login")
      }
     nav("/login")
    } catch (error) {
      console.log(error.message)
    }
    setUser(null);
  }


  return (

    <header className="bg-gray-900  fixed top-0 left-0 right-0 w-full z-50 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* 🔷 Logo */}
        <div className="flex items-center gap-2">

        <Link to="/" >
          <img src={logo} alt="Logo" className="w-[50px] h-[50px] rounded-full" />
        </Link>
        <Link to="/" className="text-xl font-semibold">
          Laptop Service
        </Link>
     
        </div>

        {/* 🔷 Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="/" className="hover:text-blue-400">Home</a>
          <a href="/about" className="hover:text-blue-400">About</a>
           <a href="/contact" className="hover:text-blue-400">Contact</a>
        
        {user?.username &&  (<a href="/dashboard" className="hover:text-blue-400">Dashboard</a>) }
        </nav>

        {/* 🔷 Right Section */}
        <div className="flex items-center gap-4">

       
          {/* 🔔 Notification */}
          <div className="relative cursor-pointer">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
              3
            </span>
          </div>
    {!user?(      
<div className="hidden md:flex items-center gap-2">
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
  <Link to="/login">Login</Link>
  </button>
  <button
    className="ml-2 px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition"
  >
  <Link to="/register">
    Register
  </Link>
  </button>
  </div>)
        
       : (
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
            
              className="flex items-center gap-2 cursor-pointer"
            >
              <User size={20} />
              <span className="hidden md:block">{user?.username}</span>
            </div> 

        
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40">
                <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                  <li onClick={handleLogout} className="px-4 py-2 hover:text-white hover:bg-red-600  cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div> 
          )}

          {/* 📱 Mobile Menu Button */}
          <div className="md:hidden">
            {menuOpen ? (
              <X size={24} onClick={() => setMenuOpen(false)} />
            ) : (
              <Menu size={24} onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3">
          <a href="#" className="block">Dashboard</a>
          <a href="#" className="block">Services</a>
          <a href="#" className="block">Customers</a>
          <a href="#" className="block">Reports</a>
        </div>
      )}
    </header>
  );
};

export default Header;