import React from "react";
import assets from "../../assets/assets";
import { FaArrowDownLong, FaLeaf } from "react-icons/fa6";
import { motion } from "framer-motion";

const MarketHeader = () => {
  return (
    <div className="w-full sm:min-h-screen ">
      <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center">
        {/* Left Section (Images) */}
        <div className="hidden sm:block relative w-full lg:w-[40%] h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-full flex flex-col justify-center items-center">
          <div className="relative w-full h-96 flex justify-center">
            <motion.img
              src={assets.tomato}
              alt="Tomato"
              className="absolute -left-12 sm:-left-20 md:-left-28 lg:-left-40 top-6 sm:top-8 h-48 sm:h-64 md:h-80 lg:h-96 w-48 sm:w-64 md:w-80 lg:w-96 object-cover"
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0,
                x: [0, 20, -20, 0],
                rotateY: [0, 15, -15, 0],
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 8,
                times: [0, 0.3, 0.7, 1],
              }}
            />
            <div
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1526470303-82c787d88682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                transform: "rotate(5deg)",
              }}
              className="absolute right-0 sm:right-4 md:right-8 lg:right-10 top-4 sm:top-5 h-48 sm:h-64 md:h-80 lg:h-96 w-40 sm:w-52 md:w-64 lg:w-80 rounded-xl flex flex-col items-center justify-end overflow-hidden shadow-lg"
            >
              <div className="h-[25%] w-full flex">
                <div className="h-full w-1/3 bg-yellow-300 rounded-tr-xl flex flex-col justify-center items-center">
                  <FaLeaf className="text-[#0d331c]" size={16} sm:size={18} md:size={20} />
                  <p className="text-sm sm:text-lg md:text-xl font-bold text-[#0d331c]">
                    100 %
                  </p>
                  <p className="text-sm sm:text-lg md:text-xl font-semibold text-[#0d331c]">
                    Natural
                  </p>
                </div>
                <div className="h-full w-2/3 bg-green-900 rounded-tl-xl flex flex-col items-center justify-center pl-2 sm:pl-3 md:pl-5">
                  <p className="text-xs sm:text-sm md:text-md lg:text-md font-medium text-zinc-200 text-center">
                    Nutrient-Rich Vegetables Grown
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Section*/}
        <div className="w-full lg:w-[60%] p-4 sm:p-6 flex flex-col justify-center items-center lg:items-start">
          <h1
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#0d331c] text-center lg:text-left leading-tight"
          >
            Organic, Sustainable, and Fresh
          </h1>
          <p className="text-black font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-3 sm:mt-4 md:mt-5 lg:mt-6 text-center lg:text-left">
            Organic Produce Healthier Tomorrow
          </p>
          <div className="h-10 sm:h-12 md:h-14 w-40 sm:w-48 md:w-52 flex justify-between items-center bg-[#0d331c] rounded-full mt-4 sm:mt-6 md:mt-8">
            <p className="text-sm sm:text-lg md:text-xl text-white font-semibold m-1 ml-3 sm:ml-4 md:ml-5">
              Check Below
            </p>
            <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rounded-full bg-white flex justify-center items-center m-1">
              <FaArrowDownLong
                size={16}
                sm:size={18}
                md:size={20}
                color="#0d331c"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;