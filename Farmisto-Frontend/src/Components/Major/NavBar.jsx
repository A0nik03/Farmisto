import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import assets from "../../assets/assets";
import CircularOverlay from "../Minor/CircularOverlay";

const NavBar = () => {
  const tabs = ["Home", "MarketPlace", "Nearby Farmers", "Contact Us"];
  return (
    <div className="h-[10vh] px-10 py-14 font-[satoshi] flex justify-between items-center">
      <h1 className="text-3xl font-black text-[#0d331c] ml-10 z-100">Farmisto</h1>
      <div className="flex gap-12">
        {tabs.map((tab, index) => (
          <h1 key={index} className="text-xl text-green-800 font-semibold">
            {tab}
          </h1>
        ))}
      </div>
      <div className="flex gap-7">
        <div className="h-12 px-1 flex items-center justify-center gap-2 bg-[#0d331c] text-white rounded-full">
          <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
            <FaUser size={18} color="#0d331c"/>
          </div>
          <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
            <FaCartShopping size={18} color="#0d331c"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
