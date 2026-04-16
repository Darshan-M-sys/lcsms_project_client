// components/landing/Features.jsx
import React from "react";

const features = [
  {
    title: "Easy Service Booking",
    desc: "Customers can quickly submit repair requests in just a few clicks.",
    icon: "📝",
  },
  {
    title: "Real-Time Tracking",
    desc: "Track service status and updates instantly from dashboard.",
    icon: "📡",
  },
  {
    title: "Technician Management",
    desc: "Admins can assign and manage technicians efficiently.",
    icon: "👨‍🔧",
  },
  {
    title: "Secure Authentication",
    desc: "Login system with role-based access for safety.",
    icon: "🔐",
  },
  {
    title: "Billing & Invoices",
    desc: "Generate invoices and manage payments easily.",
    icon: "💳",
  },
  {
    title: "Admin Dashboard",
    desc: "Control users, services, and system data from one place.",
    icon: "📊",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* 🔷 Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Powerful Features 🚀
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need to manage laptop and computer services efficiently.
        </p>

        {/* 🔷 Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Features;