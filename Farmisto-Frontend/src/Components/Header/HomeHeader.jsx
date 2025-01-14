import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="h-[84vh] w-full overflow-hidden p-5 bg-zinc-100">
      <div className="h-full w-full flex flex-col lg:flex-row">
        {/* Text Section */}
        <div className="lg:w-2/3 h-full p-5 pl-5 lg:ml-20">
          <div className="h-full w-full p-5 lg:p-10">
            {/* Heading */}
            <h1 className="text-4xl lg:text-7xl text-[#242424] font-bold font-[satoshi] flex flex-col gap-2 mt-5">
              <span className="z-50 flex items-center gap-2">
                Healthy Veggies{" "}
                <span className="relative flex w-20 h-full mt-3 lg:w-32 lg:mt-5">
                  <span className="h-8 w-8 lg:h-11 lg:w-11 border-[2px] border-[#0d331c] rounded-full"></span>
                  <span className="absolute left-2 lg:left-3 h-8 w-8 lg:h-11 lg:w-11 flex justify-center items-center rounded-full bg-[#0d331c]">
                    <RiLeafFill size={20} className="lg:size-25" color="#fff" />
                  </span>
                </span>
              </span>
              <span className="z-50">for a better health.</span>
            </h1>

            {/* Tagline */}
            <div className="hidden lg:block h-12 mt-5 w-full lg:w-[60%] z-50 border border-green-800 rounded-full pl-2">
              
              <p className="z-50 pt-2 text-sm lg:text-xl text-green-800 font-normal flex items-center gap-2">
              <span className="h-2 w-2 bg-green-800 rounded-full"/>
                Fuel your health with fresh, nutritious veggies.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm lg:text-md mt-6 text-green-800 font-medium w-full lg:w-[70%]">
              Delivering fresh, healthy veggies directly from the farm to your
              table, at prices that support both your well-being and your
              wallet.
            </p>

            {/* Buttons */}
            <div className="flex gap-5 mt-10 lg:mt-20">
              <div className="h-10 lg:h-11 lg:px-1 px-1 flex items-center justify-between gap-2 bg-[#0d331c] text-white rounded-full">
                <p className="text-sm font-medium text-nowrap flex">
                  Get Started <span className="hidden lg:block ml-1">Today</span>
                </p>
                <div className="h-8 w-8 lg:h-9 lg:w-9 flex items-center justify-center bg-white rounded-full">
                  <FaArrowRightLong size={16} className="lg:size-18" color="#0d331c" />
                </div>
              </div>
              <div className="h-10 lg:h-11 lg:px-3 px-2 border-[1px] border-green-700 text-green-800 flex items-center justify-center rounded-full">
                <p className="text-sm lg:text-md font-medium text-nowrap">How It Works</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/3 h-full px-5 lg:px-16 py-7 justify-center">
          <div
            className="w-full max-w-md lg:w-96 h-[50vh] lg:h-[70vh] overflow-hidden shadow-2xl"
            style={{
              borderTopLeftRadius: "10%",
              borderTopRightRadius: "50%",
              borderBottomRightRadius: "10%",
              borderBottomLeftRadius: "50%",
            }}
          >
            <img
              src="https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg"
              className="h-full w-full object-cover"
              alt="Fresh vegetables in a basket"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
