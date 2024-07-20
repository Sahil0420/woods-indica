import React, { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useDispatch } from "react-redux";
import { storeProducts, getPriceRange } from "../../redux/slice/productSlice";
import { FaLeaf, FaTree, FaOilCan, FaCouch } from "react-icons/fa";
import { Link } from "react-router-dom";

// Import your furniture images
import furniture1 from "../../assets/furniture1.jpg";
import furniture2 from "../../assets/furniture2.jpg";
import furniture3 from "../../assets/furniture3.jpg";
import furniture4 from "../../assets/furniture4.jpg";
import furniture5 from "../../assets/furniture5.jpg";

const Home = () => {
  const { data } = useFetchCollection("products");
  const dispatch = useDispatch();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const furnitureImages = [furniture1, furniture2, furniture3, furniture4, furniture5];

  useEffect(() => {
    dispatch(storeProducts({ products: data }));
    dispatch(getPriceRange({ products: data }));
  }, [dispatch, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        if (prevIndex === furnitureImages.length - 1) {
          return 0; // Reset to first image
        }
        return prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: "Hardwood", icon: <FaTree />, description: "Durable and elegant hardwood options" },
    { name: "Softwood", icon: <FaLeaf />, description: "Versatile softwood for various projects" },
    { name: "Essential Oils", icon: <FaOilCan />, description: "Nature's aromatic essences, bottled for you" },
    { name: "Custom Furniture", icon: <FaCouch />, description: "Bespoke furniture crafted to your specifications" },
  ];

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="card bg-base-200 shadow-xl">
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-4">{category.icon}</div>
                  <h3 className="card-title">{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Furniture Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="carousel relative overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {furnitureImages.map((img, index) => (
                    <div key={index} className="carousel-item w-full flex-shrink-0">
                      <img src={img} className="w-full object-cover rounded-md" alt={`Custom Furniture ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <h2 className="text-3xl font-bold text-white mb-4">Custom Furniture Crafted Just for You</h2>
              <p className="mb-6">
                Bring your vision to life with our bespoke furniture service. Our expert craftsmen blend traditional 
                woodworking techniques with modern design to create unique pieces that perfectly fit your space and style.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center"><FaLeaf className="text-primary mr-2" /> Personalized design consultation</li>
                <li className="flex items-center"><FaLeaf className="text-primary mr-2" /> High-quality, sustainably sourced materials</li>
                <li className="flex items-center"><FaLeaf className="text-primary mr-2" /> Skilled craftsmanship</li>
                <li className="flex items-center"><FaLeaf className="text-primary mr-2" /> Perfect fit for your space</li>
              </ul>
              <Link to="/custom-order" className="btn btn-secondary">Start Your Custom Order</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-content">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
              <p className="text-xl">Discover our wide range of premium woods, essential oils, and custom furniture options today.</p>
            </div>
            <div className="">
              <Link to="/all" className="btn btn-wide bg-neutral">Shop Now</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
