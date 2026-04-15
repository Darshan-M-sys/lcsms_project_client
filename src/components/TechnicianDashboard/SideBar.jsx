import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/technician/dashboard" },
    { name: "Requests", icon: "🛠️", path: "/technician/request/service" },
    { name: "Technicians", icon: "👨‍🔧", path: "/admin/technicians" },
    { name: "Add Technician", icon: "➕", path: "/admin/technicians/add" },
    { name: "Customers", icon: "👥", path: "/admin/customers" },
    { name: "Chats", icon: "💬", path: "/admin/chats" },
    { name: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

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
        <h1 className="text-xl font-bold mb-8">Technician</h1>
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
      </div>
    </>
  );
};

export default SideBar;