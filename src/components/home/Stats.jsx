import React from "react";
import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Repairs Completed" },
  { number: "120+", label: "Technicians" },
  { number: "350+", label: "Happy Customers" },
  { number: "24/7", label: "Support Available" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay each card
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Stats = () => {
  return (
    <section className="py-20 bg-blue-600 text-white px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Our Impact 📊
        </h2>

        {/* 🔥 Animated Container */}
        <motion.div
          className="grid md:grid-cols-4 sm:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} // animate only once
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.08 }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-2">
                {item.number}
              </h3>
              <p className="text-gray-200 text-sm">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Stats;