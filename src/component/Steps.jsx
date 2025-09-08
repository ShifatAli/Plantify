/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

const steps = [
  {
    id: 1,
    title: "Upload Photo",
    desc: "Take a clear photo of any plant, flower, or tree and upload it. Our scanner works best with sharp, well-lit images.",
    img: img1,
  },
  {
    id: 2,
    title: "AI-Powered Recognition",
    desc: "Our AI analyzes the photo using the PlantId API to accurately detect the plant species and provide scientific data.",
    img: img2,
  },
  {
    id: 3,
    title: "Get Plant Details",
    desc: "Instantly view the plant's common name, scientific name, description, and uses right on your screen.",
    img: img3,
  },
];

const Steps = () => {
  return (
    <section className="relative py-16 px-6 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-16">
        A simple process <br /> to identify plants
      </h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical timeline line (only visible on md and up) */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full bg-green-600"></div>

        <div className="space-y-20">
          {steps.map((step, index) => {
            const isEven = index % 2 === 1;

            // Image animation variants
            const imgVariants = {
              hidden: { opacity: 0, x: isEven ? 100 : -100 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            };

            // Text animation variants
            const textVariants = {
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2,
                },
              },
            };

            return (
              <div
                key={step.id}
                className={`relative flex items-center md:justify-between gap-8 md:gap-16 flex-col md:flex-row ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Step number circle */}
                <div className="md:absolute md:left-1/2 md:-translate-x-1/2 bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-md mb-4 md:mb-0">
                  {step.id}
                </div>

                {/* Image */}
                <motion.div
                  className="w-full md:w-1/2 flex justify-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={imgVariants}
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="rounded-xl shadow-md w-[300px] sm:w-[350px]"
                  />
                </motion.div>

                {/* Text */}
                <motion.div
                  className="w-full md:w-1/2 text-center md:text-left"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={textVariants}
                >
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Steps;
