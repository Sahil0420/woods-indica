import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from '../../assets/workshop.webp'

const tags = ["Wood Chips","Wood Wool", "Essential Oils", "Timber"];

const Hero = () => {
  const year = new Date().getFullYear();

  const [tagName, setTagName] = useState("");
  let currentIndex = 0;
  const updateCountdown = () => {
    const currentItem = tags[currentIndex];
    setTagName(currentItem);
    currentIndex = (currentIndex + 1) % tags.length;
    setTimeout(updateCountdown, 2000);
  };

  useEffect(() => {
    updateCountdown();
  }, []);

  return (
    <div style={{background : `url(${bgImage})`}} className="hero min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="absolute inset-0 flex items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ stiffness: 540 }}
          className="w-full max-w-4xl mx-[10%] px-4 sm:px-6 lg:px-8 "
        >
          <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-lg max-w-2xl ml-0 mr-auto">
            {" "}
            {/* Changed mx-auto to ml-0 mr-auto */}
            <h1 className="mb-5 text-4xl font-bold text-primary">
              Best place to choose your{" "}
              <span className="text-green-800 lg:text-7xl sm:text-5xl">{tagName}</span>
            </h1>
            <p className="mb-2 text-lg text-gray-600">
              Trending products in {year}
            </p>
            <h2 className="mb-5 text-2xl font-bold text-gray-700">
              Transform Your Living Space with Natural Elegance
            </h2>
            <p className="mb-5 text-gray-600">
              Elevate your home's aesthetic with <strong>WoodsIndica's</strong>{" "}
              premium timber and expertly crafted furniture. Experience the
              perfect blend of functionality and contemporary elegance.
            </p>
            <Link to="/all" className="btn btn-primary">
              Explore Our Collection
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
