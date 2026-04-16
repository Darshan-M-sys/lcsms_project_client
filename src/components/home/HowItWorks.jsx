// components/landing/HowItWorks.jsx
import React from "react";

const steps = [
  {
    title: "Request Service",
    desc: "Customer submits laptop or computer issue with details.",
    icon: "📝",
  },
  {
    title: "Technician Assigned",
    desc: "Admin assigns the best technician for the job.",
    icon: "👨‍🔧",
  },
  {
    title: "Repair Process",
    desc: "Technician diagnoses and repairs the device.",
    icon: "🛠️",
  },
  {
    title: "Delivery & Payment",
    desc: "Customer receives device and completes payment.",
    icon: "💳",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* 🔷 Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works ⚙️
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Simple and efficient process to manage your device services.
        </p>

        {/* 🔷 Steps */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-4xl mt-4 mb-3">{step.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;