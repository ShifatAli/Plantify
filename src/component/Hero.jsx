/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

// your hero video
import introVideo from "../assets/intropagevideo.mp4";

// import your Identification component
import Identification from "./Identification"; // ✅ adjust the path if needed

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left side: heading + text + Identification component */}
        <motion.div
          className="flex-1 text-left max-w-2xl" // 🔥 increased from max-w-xl → max-w-2xl
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* ✅ Forced into two lines with <br /> */}
          <h1 className="text-4xl font-poppins sm:text-5xl lg:text-6xl  text-gray-900 leading-snug mb-6">
            Identify plants and plant diseases.
            <br className="hidden md:block" />
            For free.
          </h1>

          {/* Paragraph slightly indented on desktop */}
          <p className="text-gray-600 text-base sm:text-lg mb-10 md:ml-1">
            Instantly identify plants and learn how to care for them with a
            simple scan
          </p>

          {/* ✅ Identification component */}
          <Identification />
        </motion.div>

        {/* Right side: video */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
        >
          <div className="relative w-full max-w-lg"> {/* 🔥 made wider: max-w-md → max-w-lg */}
            <video
              src={introVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover rounded-[42%_58%_46%_54%/52%_44%_56%_48%]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
