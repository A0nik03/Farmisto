import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import assets from "../../assets/assets";

const Confirmation = () => {
  const location = useLocation();
  const [data, setData] = useState({});

  useEffect(() => {
    if (location.state) {
      setData(location.state.data.confirmData || {});
    }
  }, [location.state]);

  console.log("Data: ", data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-400 flex justify-center items-center overflow-hidden p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="relative p-4 sm:p-6 md:p-8">
          {/* Close Button */}
          <div className="absolute top-4 right-4">
            <button
              className="text-black hover:text-gray-600 transition-colors duration-200"
              onClick={() => window.history.back()} // Simple close action, adjust as needed
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12 text-center">
            <h5 className="uppercase text-sm sm:text-md md:text-lg font-semibold text-gray-800">
              {data.buyer?.name || "Customer"}
            </h5>

            <div className="flex justify-between items-center mt-4 sm:mt-5 mb-4 sm:mb-5">
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800">
                Thanks for your order
              </h4>
              <img
                src={assets.truck}
                alt="Truck"
                className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
              />
            </div>

            <span className="text-green-800 text-md sm:text-lg md:text-xl font-semibold">
              Payment Summary
            </span>
            <div className="mb-3 sm:mb-4">
              <hr className="border-t-2 border-dashed border-green-200 my-2" />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 text-left">
              <div className="flex justify-between">
                <span className="font-bold text-sm sm:text-md md:text-lg">
                  Items Price ({data.cart?.length || 0})
                </span>
                <span className="text-gray-500 text-sm sm:text-md md:text-lg">
                  Rs {data.grandTotal || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <small className="text-gray-600 text-xs sm:text-sm md:text-md">
                  Shipping
                </small>
                <small className="text-gray-600 text-xs sm:text-sm md:text-md">
                  Rs 10
                </small>
              </div>

              <div className="flex justify-between">
                <small className="text-gray-600 text-xs sm:text-sm md:text-md">
                  Tax
                </small>
                <small className="text-gray-600 text-xs sm:text-sm md:text-md">
                  18%
                </small>
              </div>

              <div className="flex justify-between mt-3 sm:mt-4">
                <span className="font-bold text-sm sm:text-md md:text-lg">
                  Total
                </span>
                <span className="font-bold text-green-800 text-sm sm:text-md md:text-lg">
                  Rs {((data.grandTotal || 0) * 0.18 + (data.grandTotal || 0) + 10).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <button className="bg-green-800 hover:bg-green-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-sm text-sm sm:text-md md:text-lg font-semibold transition-colors duration-200">
                Track your order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;