import React from "react";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { motion } from "framer-motion";
import { useState } from "react";

const NavBar = ({ transparent = false }) => {
  const { authToken, logout } = useAuth();
  const [active, setActive] = useState(0);

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Crops", path: "/crops" },
    { label: "Market", path: "/market" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={`h-[13vh] w-screen px-6 py-4 flex justify-between items-center ${
        transparent ? "bg-transparent" : "bg-[#f7f3e9]"
      }`}
    >
      {/* Brand Logo */}
      <h1 className="text-3xl sm:text-5xl font-black text-[#6b4226] ml-4 z-50">
        Farmisto
      </h1>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-8">
        {tabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            className={`text-lg sm:text-xl w-[auto] flex flex-col gap-2 text-[#6b4226] font-semibold`}
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
                className="bg-[#7a9f35] shadow-lg shadow-[#5e7b28] h-[4px] block mx-auto rounded-sm"
              />
            )}
          </Link>
        ))}
      </div>

      {/* Icons Section */}
      <div className="w-48 flex gap-4 justify-end pr-5">
        <div className="h-10 sm:h-12 px-1 flex items-center justify-center gap-2 bg-[#7a9f35] text-white rounded-full">
          {authToken ? (
            <div
              onClick={() => logout()}
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
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
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <FaUser size={16} className="sm:size-18 text-[#405f27]" />
            </Link>
          )}
          {authToken && <Link
            to={"/Dashboard"}
            className="h-10 px-6 flex items-center justify-center gap-2 bg-white text-[#7a9f35] hover:scale-[1.05] transition-all duration-300 hover:cursor-pointer rounded-full"
          >
            <p className="font-bold text-[#405f27]">Dashboard</p>
          </Link>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
