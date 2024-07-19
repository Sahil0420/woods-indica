import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const year = new Date().getFullYear();

  return (
    <div className="hero min-h-screen bg-home-hero bg-cover bg-center relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md ml-0 mr-auto"> {/* Changed mx-auto to ml-0 mr-auto */}
            <h1 className="mb-5 text-4xl font-bold text-gray-800">Discover Nature's Finest</h1>
            <p className="mb-2 text-lg text-gray-600">Trending products in {year}</p>
            <h2 className="mb-5 text-2xl font-bold text-gray-700">Transform Your Living Space with Natural Elegance</h2>
            <p className="mb-5 text-gray-600">
              Elevate your home's aesthetic with <strong>WoodsIndica's</strong> premium timber and expertly crafted furniture. 
              Experience the perfect blend of functionality and contemporary elegance.
            </p>
            <Link to="/shop" className="btn btn-primary">Explore Our Collection</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;