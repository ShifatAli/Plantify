/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/plant logo 1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Framer Motion variants
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <nav className="flex justify-between items-center px-6 sm:px-8 py-3 border-b border-[#5AAC38] shadow-[0_0_5px_#5AAC38] fixed w-full bg-white z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="logo" className="w-12 h-12" />
        <span className="text-green-700 font-bold text-lg sm:text-xl">Plantify</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <motion.a
          href="/"
          className="text-green-600 hover:text-green-800 transition"
          whileHover={{ scale: 1.1 }}
        >
          Home
        </motion.a>
        <motion.a
          href="/about"
          className="text-gray-700 hover:text-green-600 transition"
          whileHover={{ scale: 1.1 }}
        >
          About Us
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none"
        >
          <div className="space-y-1">
            <span
              className="block w-6 h-0.5 bg-green-600 transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 bg-green-600 transition-opacity duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-0.5 bg-green-600 transition-transform duration-300"
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="absolute top-full left-0 w-full bg-white flex flex-col items-center shadow-lg border-t border-green-600 md:hidden"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
        >
          <motion.a
            href="/"
            className="py-3 w-full text-center border-b border-green-100 text-green-600 hover:bg-green-50 transition"
            whileHover={{ scale: 1.05 }}
          >
            Home
          </motion.a>
          <motion.a
            href="/about"
            className="py-3 w-full text-center border-b border-green-100 text-gray-700 hover:bg-green-50 transition"
            whileHover={{ scale: 1.05 }}
          >
            About Us
          </motion.a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
