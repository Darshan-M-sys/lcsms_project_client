import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  User,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "My Services", icon: Wrench, path: "/customer/my/services" },
    { name: "Request Service", icon: PlusCircle, path: "/customer/request/service" },
    { name: "Profile", icon: User, path: "/profile" },
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

        {/* 🔥 Menu */}
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