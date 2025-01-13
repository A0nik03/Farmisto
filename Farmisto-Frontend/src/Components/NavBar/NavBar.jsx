import React from "react";
import { FaCartShopping } from "react-icons/fa6";
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
    { label: "MarketPlace", path: "/market" },
    { label: "Nearby Farmers", path: "/farmers" },
  ];

  return (
    <div
      className={`h-[13vh] px-6 py-4 flex justify-between items-center ${
        transparent ? "bg-transparent" : "bg-zinc-100"
      }`}
    >
      {/* Brand Logo */}
      <h1 className="text-3xl sm:text-5xl font-black font-[Aladin] text-[#0d331c] ml-4 z-50">
        Farmisto
      </h1>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-8">
      {tabs.map((tab, index) => (
        <Link
          to={tab.path}
          key={index}
          className={`text-lg sm:text-xl w-[auto] flex flex-col gap-2 text-green-800 font-semibold`}
          onMouseEnter={() => setActive(index)}
        >
          {tab.label}
          {active === index && (
            <motion.span
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              whileHover={{ width: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 150,
                mass: 1,
                duration: 0.3, 
              }}
              className="bg-green-500 shadow-lg shadow-green-100 h-[4px] block mx-auto rounded-sm"
            />
          )}
        </Link>
      ))}
      </div>

      {/* Icons Section */}
      <div className="flex gap-4">
        <div className="h-10 sm:h-12 px-1 flex items-center justify-center gap-2 bg-[#0d331c] text-white rounded-full">
          {authToken ? (
            <div
              onClick={() => logout()}
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <BsFillDoorOpenFill
                size={16}
                className="sm:size-18"
                color="#0d331c"
              />
            </div>
          ) : (
            <Link
              to={"/form"}
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <FaUser size={16} className="sm:size-18" color="#0d331c" />
            </Link>
          )}
          <Link
            to={"/cart"}
            className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300"
          >
            <FaCartShopping size={16} className="sm:size-18" color="#0d331c" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden">
        <button
          className="text-green-800 font-semibold text-lg"
          onClick={() => alert("Toggle Mobile Menu Here")}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default NavBar;
