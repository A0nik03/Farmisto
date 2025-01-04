import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { FaBucket, FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import assets from "../../assets/assets";

const Cart = () => {
  return (
    <div className="h-full w-full bg-zinc-100">
      <NavBar />
      <div className="w-[90%] h-[80%] rounded-xl bg-white mx-auto p-4 flex gap-2">
        <div className="w-2/3 flex flex-col gap-2">
          <div className="h-44 w-full rounded-xl border-[1px] border-zinc-100 flex items-center justify-between px-2">
            <div className="flex gap-2">
              <div className="h-40 w-40 bg-zinc-100 rounded-xl">
                <img src={assets.tomato} alt="" />
              </div>
              <div className="h-full ml-4">
                <h1 className="text-xl font-semibold mt-5">Tomato</h1>
                <p className="text-md font-medium text-zinc-400 mt-2">
                  Price: <span className="text-green-500">120/kg</span>
                </p>
                <span className="flex gap-1 mt-3">
                  <MdDelete size={20} className="text-red-600" />
                  <p className="text-md text-red-600 font-semibold">Delete</p>
                </span>
              </div>
            </div>
            <div className="w-40 h-full">
              <div className="h-1/2 flex flex-col gap-1 w-full rounded-lg overflow-hidden">
                <p className="text-md font-medium text-zinc-400 mt-1 mb-1">
                  Quantity
                </p>
                <div className="h-full w-full flex bg-zinc-100 rounded-lg border-[2px]">
                  <div className="w-1/3 h-full flex justify-center items-center">
                    <FaMinus className="text-zinc-500" />
                  </div>
                  <div className="w-1/3 h-full flex justify-center items-center bg-white">
                    <p className="txet-zinc-500 font-medium text-md">12</p>
                  </div>
                  <div className="w-1/3 h-full flex justify-center items-center">
                    <FaPlus className="text-zinc-500" />
                  </div>
                </div>
              </div>
              <div className="w-full h-1/2 mt-1">
                <span className="flex gap-3 mt-3">
                  <p className="text-md text-zinc-500 font-medium line-through decoration-2">
                    Rs 100
                  </p>
                  <p className="text-md font-medium">Rs 80</p>
                </span>
                <p className="text-zinc-400 font-medium text-md mt-2">
                  You save 15%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-1/3 flex flex-col p-2">
          <p className="text-xl font-semibold">Details</p>
          <span className="w-full flex justify-between p-1 mt-4">
            <p className="text-md text-zinc-500 font-medium">Temporary Amount</p>
            <p className="text-md font-semibold">Rs 340</p>
          </span>
          <span className="w-full flex justify-between p-1 mt-1">
            <p className="text-md text-zinc-500 font-medium">Shipping</p>
            <p className="text-md font-semibold">Rs 10</p>
          </span>
          <hr className="border-[1px] w-full rounded-xl border-zinc-300 mt-4 mb-4"/>
          <span className="w-full flex justify-between p-1 mt-1">
            <p className="text-xl font-semibold">Total</p>
            <p>Rs 350</p>
          </span> 
          <p className="mt-1 text-md text-zinc-400 font-medium">Including gst</p>
          <button className="w-full h-12 bg-[#0d331c] text-white font-semibold rounded-xl mt-8">
            Go to checkout
          </button>
          <button className="w-full h-12 bg-black text-white font-semibold rounded-xl mt-2">
            Negotiate
          </button>

          <h1 className="text-xl font-semibold mt-12">Apply promo code</h1>
          <div className="w-full flex items-center gap-2 mt-4">
            <input
              type="text"
              className="w-2/3 h-12 bg-white rounded-xl p-2 border-[1px]"
              placeholder="Enter your promo code"
            />
            <button className="w-1/3 h-12 bg-[#0d331c] text-white font-semibold rounded-xl">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
