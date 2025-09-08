import React from "react";
import { motion } from "framer-motion";
import Banner from "../assets/banner.png";
import Rectangle2 from "../assets/Rectangle 2.png";
import Rectangle3 from "../assets/Rectangle 3.png";
import Rectangle4 from "../assets/Rectangle 4.png";

const InfoBanner = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="w-full flex justify-center mt-10 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div
        className="w-full max-w-6xl rounded-2xl shadow-md flex flex-col md:flex-row items-center p-8 bg-cover bg-right"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        {/* Left Side Text and Small Images */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-6 z-10 bg-white/70 md:bg-transparent rounded-xl p-4 md:p-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-gray-900 text-xl md:text-2xl font-medium leading-relaxed">
            Plant Scanner is a simple tool to help you recognize plants,
            flowers, and trees using{" "}
            <span className="italic">AI-powered image recognition.</span>
          </h2>

          {/* Small Rectangle Images */}
          <div className="flex gap-4 mt-3">
            {[Rectangle2, Rectangle3, Rectangle4].map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Plant ${index + 1}`}
                className="w-20 h-20 rounded-md object-cover border cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: index * 0.2 } }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>

        {/* Right side is covered by background image */}
      </div>
    </motion.div>
  );
};

export default InfoBanner;
