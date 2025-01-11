import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";

const NavBar = ({transparent = false}) => {
  const { authToken, logout } = useAuth();
  const tabs = [
    { label: "Home", path: "/" },
    { label: "MarketPlace", path: "/market" },
    { label: "Nearby Farmers", path: "/farmers" },
  ];

  return (
  <div className={`h-[10vh] px-6 py-4 flex justify-between items-center ${transparent ? "bg-transparent" : "bg-zinc-100"}`}>
      {/* Brand Logo */}
      <h1 className="text-2xl sm:text-3xl font-black text-[#0d331c] ml-4 z-50">
        Farmisto
      </h1>

      {/* Navigation Links */}
      <div className="hidden sm:flex gap-8">
        {tabs.map((tab, index) => (
          <Link
            to={tab.path}
            key={index}
            className="text-lg sm:text-xl text-green-800 font-semibold hover:underline"
          >
            {tab.label}
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
