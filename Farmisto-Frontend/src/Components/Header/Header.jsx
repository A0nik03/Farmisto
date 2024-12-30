import React from "react";
import { RiLeafFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="h-[84vh] p-5">
      <div className="h-full w-full flex">
        <div className="w-2/3 h-full p-5 pl-5 ml-20">
          <div className="h-full w-full p-10">
            <div className="h-12 w-[58%] border border-green-800 rounded-full flex items-center gap-2 px-2">
              <span className="h-2 w-2 bg-green-800 rounded-full" />
              <p className="text-xl text-green-800 font-normal">
                Fuel your health with fresh, nutritious veggies.
              </p>
            </div>
            <h1 className="text-7xl text-[#242424] font-bold font-[satoshi] flex flex-col gap-2 mt-5">
              <span className="flex items-center gap-2">
                Healthy Veggies{" "}
                <span className="relative flex w-32 h-full mt-5 ml-2">
                  <span className="h-11 w-11 border-[2px] border-[#0d331c] rounded-full"></span>
                  <span className="absolute left-3 h-11 w-11 flex justify-center items-center rounded-full bg-[#0d331c]">
                    <RiLeafFill size={25} color="#fff" />
                  </span>
                </span>
              </span>

              <span>for a better health.</span>
            </h1>
            <p className="text-md mt-6 text-green-800 font-medium w-[70%]">
              Delivering fresh, healthy veggies directly from the farm to your
              table, at prices that support both your well-being and your
              wallet.
            </p>

            <div className="flex gap-5 mt-20">
              <div className="h-11 px-1 flex items-center justify-center gap-2 bg-[#0d331c] text-white rounded-full">
                <p className="text-md pb-1 pl-3 pr-2 font-medium">Get Started Today</p>
                <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full">
                  <FaArrowRightLong size={18} color="#0d331c" />
                </div>
              </div>
              <div className="h-11 px-5 py-2 border-[1px] border-green-700 text-green-800 rounded-full">
                <p className="text-md font-medium">How It Works</p>
              </div>
            </div>
            
          </div>
        </div>
        <div className="w-1/3 h-full px-16 py-7">
          <div
            className="w-96 h-[70vh] overflow-hidden"
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
