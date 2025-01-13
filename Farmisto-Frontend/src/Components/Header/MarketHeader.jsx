import React from "react";
import assets from "../../assets/assets";
import { FaArrowDownLong, FaLeaf } from "react-icons/fa6";
import { motion } from "framer-motion";

const MarketHeader = () => {
  return (
    <div className="w-full h-screen p-5 bg-zinc-100 ">
      <div className="w-full h-full flex flex-row justify-between">
        <div className="relative w-[40%] h-full flex flex-col justify-center items-center">
          <div className="w-[40%] h-full flex">
            <motion.img
              src={assets.tomato}
              alt=""
              className="absolute -left-40 top-10 h-96 w-96"
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: 0, 
                x: [0, 40, -40, 0], 
                rotateY: [0, 30, -30, 0],
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
              className="absolute right-10 top-5 h-96 rounded-xl w-80 flex flex-col items-center justify-end overflow-hidden"
            >
              <div className="h-[25%] w-full flex">
                <div className="h-full w-1/3 bg-yellow-300 rounded-tr-xl flex flex-col justify-center items-center">
                  <FaLeaf className="text-[#0d331c]" size={20} />
                  <p className="text-xl font-bold text-[#0d331c]">100 %</p>
                  <p className="text-xl font-semibold text-[#0d331c]">
                    Natural
                  </p>
                </div>
                <div className="h-full w-2/3 bg-green-900 rounded-tl-xl flex flex-col items-center justify-center pl-5">
                  <p className="text-md font-medium text-zinc-200">
                    Nutrient-Rich Vegetables Grown
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[60%] p-10">
          <h1
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            className="text-9xl font-bold text-[#0d331c]"
          >
            Organic, Sustainable, and Fresh
          </h1>
          <p className="text-black font-semibold text-xl mt-5">
            Organic Produce Healthier Tomorrow
          </p>
          <div className="h-14 w-52 flex justify-between items-center bg-[#0d331c] rounded-full mt-8">
            <p className="text-xl text-white font-semibold m-1 ml-5">
              Check Below
            </p>
            <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center m-1">
              <FaArrowDownLong size={20} color="#0d331c" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;
