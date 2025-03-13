import React, { useState } from "react";
import {  FaCartShopping, FaUser } from "react-icons/fa6";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";
import { motion } from "framer-motion";
import SideBar from "../SideBar/SideBar";

const NavBar = ({ transparent = false }) => {
  const { authToken, logout } = useAuth();
  const [active, setActive] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const tabs = [
    { label: "Home", path: "/" },
    { label: "MarketPlace", path: "/market" },
    { label: "Nearby Farmers", path: "/farmers" },
  ];

  return (
    <div
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 flex justify-between items-center transition-all duration-300 ${
        transparent ? "bg-transparent" : ""
      }`}
    >
    
      <h1 className="text-3xl sm:text-4xl font-black font-[Aladin] text-[#0d331c] z-10">
        Farmisto
      </h1>

      <div className="hidden md:flex gap-4 lg:gap-8">
        {tabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            className={`text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col gap-1 text-green-800 font-semibold hover:text-emerald-700 transition-colors duration-200`}
            onMouseEnter={() => setActive(index)}
          >
            {tab.label}
            {active === index && (
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                whileHover={{ width: "100%" }}
                transition={{
                  type: "linear",
                  stiffness: 150,
                  mass: 1,
                  duration: 0.3,
                }}
                className="bg-emerald-800 shadow-lg shadow-emerald-100 h-0.5 sm:h-1 md:h-[4px] block mx-auto rounded-sm"
              />
            )}
          </Link>
        ))}
      </div>

      {/* Icons Section */}
      <div className="flex items-center">
        <div className="h-9 sm:h-10 md:h-12 px-1 mr-2 sm:mr-0 flex items-center justify-center gap-2 bg-[#0d331c] text-emerald-800 rounded-full">
          {authToken ? (
            <div
              onClick={() => logout()}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex items-center justify-center bg-green-50 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <BsFillDoorOpenFill
                size={14}
                className="sm:size-3 md:size-5"
                color="#0d331c"
              />
            </div>
          ) : (
            <Link
              to={"/form"}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex items-center justify-center bg-green-50 rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <FaUser
                className="sm:size-3 md:size-5"
                color="#0d331c"
              />
            </Link>
          )}
          <Link
            to={"/cart"}
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 flex items-center justify-center bg-green-50 rounded-full hover:scale-110 transition-all duration-300"
          >
            <FaCartShopping
              className="sm:size-3 md:size-5"
              color="#0d331c"
            />
          </Link>
        </div>

        <button
          className="md:hidden text-green-800 font-semibold text-lg sm:text-xl"
          onClick={() => setIsSidebarOpen(true)}
        >
          <CgMenu size={30}/>
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <SideBar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </div>
  );
};

export default NavBar;