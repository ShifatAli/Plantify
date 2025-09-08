/* eslint-disable no-unused-vars */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plantData, image } = location.state || {};

  if (!plantData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F3F3]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No plant data available.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-[#5AAC38] text-white rounded-lg hover:bg-[#23A204] transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const suggestions = plantData.result?.classification?.suggestions || [];
  const mainPlant = suggestions[0];
  const otherPlants = suggestions.slice(1);

  // Utility: normalize scientific name safely
  const getScientificName = (details) => {
    if (!details) return "Unavailable";
    if (Array.isArray(details.scientific_name) && details.scientific_name.length > 0) {
      return details.scientific_name.join(", ");
    }
    if (typeof details.scientific_name === "string") {
      return details.scientific_name;
    }
    return "Unavailable";
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F3F3F3] p-6 mt-10">
      <div className="bg-[#FFFFFF] shadow-lg rounded-2xl p-6 w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-[#000000] mb-8 text-center">
          Plant Identification Results
        </h1>

        {/* Layout: Main Plant & Other Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Plant */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 border border-gray-200 rounded-xl p-6 bg-[#FFFFFF] shadow-md hover:shadow-lg flex flex-col"
          >
            {mainPlant && (
              <>
                <img
                  src={mainPlant.similar_images?.[0]?.url || image}
                  alt={mainPlant.name}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-gray-600 mb-1">
                  Confidence:{" "}
                  <span className="font-semibold text-[#23A204]">
                    {(mainPlant.probability * 100).toFixed(1)}%
                  </span>
                </p>
                <h2 className="text-2xl font-bold text-[#5AAC38]">
                  {mainPlant.name}
                </h2>
                <p className="italic text-gray-700">
                  {getScientificName(mainPlant.details)}
                </p>

                {mainPlant.details?.common_names?.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Common Names: {mainPlant.details.common_names.join(", ")}
                  </p>
                )}

                {/* Info Section */}
                <div className="mt-6 text-sm text-gray-800 space-y-3 leading-relaxed">
                  <p>
                    <b>Description:</b>{" "}
                    {mainPlant.details?.description?.value ||
                      "No description available."}
                  </p>
                  <p>
                    <b>Taxonomy:</b>{" "}
                    {mainPlant.details?.taxonomy
                      ? `Family ${mainPlant.details.taxonomy.family}, Genus ${mainPlant.details.taxonomy.genus}`
                      : "Unavailable"}
                  </p>
                  <p>
                    <b>Watering:</b>{" "}
                    {mainPlant.details?.watering || "Moderate watering."}
                  </p>
                  <p>
                    <b>Sunlight:</b>{" "}
                    {mainPlant.details?.sunlight?.join(", ") ||
                      "Thrives in indirect bright light."}
                  </p>
                  {mainPlant.details?.toxicity && (
                    <p className="text-red-600">
                      <b>Toxicity:</b> {mainPlant.details.toxicity}
                    </p>
                  )}
                  <p>
                    <b>Propagation:</b>{" "}
                    {mainPlant.details?.propagation_methods?.join(", ") ||
                      "Can be propagated via cuttings or seeds."}
                  </p>
                </div>
              </>
            )}
          </motion.div>

          {/* Other Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {otherPlants.map((plant, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-[#FFFFFF] border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={plant.similar_images?.[0]?.url || image}
                  alt={plant.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-sm text-gray-600">
                  Confidence:{" "}
                  <span className="font-medium text-[#23A204]">
                    {(plant.probability * 100).toFixed(1)}%
                  </span>
                </p>
                <h3 className="font-semibold text-[#5AAC38] text-lg">
                  {plant.name}
                </h3>
                <p className="italic text-gray-600 text-xs">
                  {getScientificName(plant.details)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Sections */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classification */}
          {plantData.result?.classification?.suggestions?.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-gray-200 rounded-xl bg-[#FFFFFF] shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-[#000000] mb-3">
                Classification
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {plantData.result.classification.suggestions.map((s, idx) => (
                  <li key={idx}>
                    {s.name}{" "}
                    <span className="text-[#23A204]">
                      ({(s.probability * 100).toFixed(1)}%)
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Disease */}
          {plantData.result?.disease?.suggestions?.length > 0 && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-gray-200 rounded-xl bg-[#FFFFFF] shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-[#000000] mb-3">
                Possible Diseases
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {plantData.result.disease.suggestions.map((d, idx) => (
                  <li key={idx}>
                    {d.name}{" "}
                    <span className="text-[#23A204]">
                      ({(d.probability * 100).toFixed(1)}%)
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Health */}
          {plantData.result?.is_healthy && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-gray-200 rounded-xl bg-[#FFFFFF] shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-[#000000] mb-3">
                Health Status
              </h2>
              <p className="text-gray-700">
                Probability:{" "}
                <span className="text-[#23A204] font-medium">
                  {(plantData.result.is_healthy.probability * 100).toFixed(1)}%
                </span>
                <br />
                Threshold: {plantData.result.is_healthy.threshold}
                <br />
                Status:{" "}
                {plantData.result.is_healthy.binary ? (
                  <span className="text-[#23A204] font-medium">Healthy</span>
                ) : (
                  <span className="text-red-600 font-medium">Not Healthy</span>
                )}
              </p>
            </motion.div>
          )}

          {/* Is it a Plant */}
          {plantData.result?.is_plant !== undefined && (
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 border border-gray-200 rounded-xl bg-[#FFFFFF] shadow-md hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-[#000000] mb-3">
                Plant Verification
              </h2>
              <p className="text-gray-700">
                {plantData.result.is_plant ? (
                  <span className="text-[#23A204] font-medium">
                    This is a plant
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Not identified as a plant
                  </span>
                )}
              </p>
            </motion.div>
          )}
        </div>

        {/* Upload Another Image */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#5AAC38] text-white font-medium rounded-md shadow-md hover:shadow-lg hover:bg-[#23A204] transition"
          >
            Upload Another Image
          </button>
        </div>
      </div>
    </div>
  );
}
