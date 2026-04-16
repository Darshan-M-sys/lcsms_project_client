// components/landing/CTA.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-700 text-white px-6">
      
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >

        {/* 🔷 Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Fix Your Device? 💻
        </h2>

        {/* 🔷 Subtitle */}
        <p className="text-gray-200 mb-8">
          Join LCSMS today and experience fast, reliable, and smart service management.
        </p>

        {/* 🔥 Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              Get Started 🚀
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="border border-white px-6 py-3 rounded-xl font-semibold"
            >
              Contact Us
            </Link>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

export default CallToAction;