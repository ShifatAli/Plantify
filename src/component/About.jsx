/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const AboutUs = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-24 bg-gray-50">
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-700 mb-6 leading-snug">
          About <span className="text-gray-900">Plantify</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4">
          Plantify is your ultimate companion for identifying plants, learning
          how to care for them, and exploring the natural world around you.
        </p>
        <p className="text-gray-600 text-base sm:text-lg">
          Our mission is to connect people with nature through technology,
          making plant care accessible, fun, and educational for everyone.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-3">Easy Identification</h3>
          <p className="text-gray-600">
            Snap a photo, and our AI-powered scanner identifies plants in seconds.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-3">Plant Care Tips</h3>
          <p className="text-gray-600">
            Learn how to care for your plants with simple instructions and health insights.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-green-700 mb-3">Explore Nature</h3>
          <p className="text-gray-600">
            Discover new plant species and expand your knowledge of the natural world.
          </p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="max-w-4xl mx-auto text-center bg-green-700 text-white rounded-xl p-10 shadow-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Plantify Today</h2>
        <p className="mb-6">
          Start identifying and caring for plants in your home or garden with ease.
        </p>
        
      </motion.div>
    </section>
  );
};

export default AboutUs;
