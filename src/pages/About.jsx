// pages/About.jsx
import React from "react";
import Header from "../components/home/Header";

const About = () => {
  return (
    <>
      <Header />

      <div className="min-h-screen mt-16  bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 text-white px-6 py-12">

        {/* 🔷 Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            About LCSMS 💻
          </h1>
          <p className="text-lg text-gray-200">
            Laptop & Computer Service Management System designed to simplify
            service requests, technician management, and customer experience.
          </p>
        </div>

        {/* 🔷 Content Card */}
        <div className="max-w-5xl mx-auto bg-white text-gray-800 rounded-2xl shadow-xl p-8 space-y-8">

          {/* 🔹 Introduction */}
          <div>
            <h2 className="text-2xl font-bold mb-2">📌 Introduction</h2>
            <p className="text-gray-600">
              LCSMS is a smart platform that connects customers with technicians
              for laptop and computer repair services. It helps manage service
              requests, track repair progress, and improve communication between
              users and service providers.
            </p>
          </div>

          {/* 🔹 Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">🚀 Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-600 list-disc pl-5">
              <li>Easy service request submission</li>
              <li>Real-time status tracking</li>
              <li>Admin dashboard for full control</li>
              <li>Technician assignment system</li>
              <li>Secure authentication system</li>
              <li>Billing and invoice management</li>
            </ul>
          </div>

          {/* 🔹 Roles */}
          <div>
            <h2 className="text-2xl font-bold mb-4">👥 User Roles</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              
              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-semibold text-lg">Customer</h3>
                <p className="text-sm text-gray-600">
                  Request services and track repair status.
                </p>
              </div>

              <div className="bg-green-100 p-4 rounded-xl">
                <h3 className="font-semibold text-lg">Technician</h3>
                <p className="text-sm text-gray-600">
                  Manage assigned repair tasks efficiently.
                </p>
              </div>

              <div className="bg-purple-100 p-4 rounded-xl">
                <h3 className="font-semibold text-lg">Admin</h3>
                <p className="text-sm text-gray-600">
                  Control users, services, and system operations.
                </p>
              </div>

            </div>
          </div>

          {/* 🔹 Technology Stack */}
          <div>
            <h2 className="text-2xl font-bold mb-2">🛠 Tech Stack</h2>
            <p className="text-gray-600">
              This project is built using modern web technologies:
            </p>
            <ul className="flex flex-wrap gap-3 mt-3">
              <li className="bg-gray-200 px-3 py-1 rounded-full">React.js</li>
              <li className="bg-gray-200 px-3 py-1 rounded-full">Node.js</li>
              <li className="bg-gray-200 px-3 py-1 rounded-full">Express.js</li>
              <li className="bg-gray-200 px-3 py-1 rounded-full">MongoDB</li>
              <li className="bg-gray-200 px-3 py-1 rounded-full">Tailwind CSS</li>
            </ul>
          </div>

          {/* 🔹 Vision */}
          <div>
            <h2 className="text-2xl font-bold mb-2">🎯 Our Vision</h2>
            <p className="text-gray-600">
              To create a seamless and efficient service management platform
              that enhances customer satisfaction and simplifies technician workflows.
            </p>
          </div>

        </div>

    

      </div>
    </>
  );
};

export default About;