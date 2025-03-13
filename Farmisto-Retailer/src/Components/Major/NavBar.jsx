import React, { useState } from "react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { motion } from "framer-motion";

const NavBar = ({ transparent = false }) => {
  const { authToken, logout } = useAuth();
  const [active, setActive] = useState(0);

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Learn", path: "/learn" },
    { label: "Market", path: "/market" },
  ];

  return (
    <div
      className={`h-[13vh] px-4 sm:px-6 py-4 flex justify-between items-center ${
        transparent ? "bg-transparent" : "bg-[#f7f3e9]"
      }`}
    >
      <div className="w-full justify-between flex">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#6b4226] ml-2 sm:ml-4 z-50">
          Farmisto
        </h1>
        <div className="gap-6 md:gap-8 hidden sm:flex mr-32">
          {tabs.map((tab, index) => (
            <Link
              to={tab.path}
              key={index}
              className={`text-base sm:text-lg md:text-xl flex flex-col gap-1 sm:gap-2 text-[#6b4226] font-semibold`}
              onMouseEnter={() => setActive(index)}
            >
              {tab.label}
              {active === index && (
                <motion.span
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  whileHover={{ width: "100%" }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    mass: 1,
                    duration: 0.3,
                  }}
                  className="bg-[#7a9f35] shadow-lg shadow-[#5e7b28] h-[3px] sm:h-[4px] block mx-auto rounded-sm"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-4 items-center">
          <div className="flex items-center gap-2 bg-[#7a9f35] text-white px-1 sm:px-1 py-1 rounded-full">
            {authToken ? (
              <div
                onClick={() => logout()}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <BsFillDoorOpenFill
                  size={16}
                  className="sm:size-18"
                  color="#405f27"
                />
              </div>
            ) : (
              <Link
                to={"/register"}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                <FaUser size={16} className="sm:size-18 text-[#405f27]" />
              </Link>
            )}
            {authToken && (
              <Link
                to={"/Dashboard"}
                className="hidden sm:flex h-8 sm:h-10 px-4 sm:px-6 items-center justify-center gap-2 bg-white text-[#7a9f35] hover:scale-[1.05] transition-all duration-300 cursor-pointer rounded-full"
              >
                <p className="font-bold text-sm sm:text-base md:text-lg text-[#405f27]">
                  Dashboard
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
