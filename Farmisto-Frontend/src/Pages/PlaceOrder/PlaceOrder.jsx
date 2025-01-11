import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Cards from "react-credit-cards-2";
import { color, motion } from "framer-motion";
import { SiVisa } from "react-icons/si";
import assets from "../../assets/assets";

const PlaceOrder = () => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      cardData.number.length === 16 &&
      cardData.expiry.length === 5 &&
      cardData.cvc.length === 3 &&
      cardData.name !== ""
    );
  };

  const formatCardNumber = (number) => {
    return number.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (expiry) => {
    return expiry
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{1,2})?/, (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1))
      .slice(0, 5);
  };
  

  return (
    <div className="w-full flex flex-col bg-gradient-to-b from-green-200 to-green-400">
      <NavBar transparent={true} />
      <div className="w-[80%] mx-auto my-8 p-4 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">

        <div className="w-full lg:w-1/2 p-6 rounded-lg bg-green-50">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Personal Details
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="John"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            <div className="">
              <label className="block text-green-700 font-semibold mb-2">
                Street Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                placeholder="123 Main St"
              />
            </div>

            <div className="">
              <label className="block text-green-700 font-semibold mb-2">
                City
              </label>
              <input
                type="text"
                className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                placeholder="New York"
              />
            </div>

            <div className="flex gap-6 mb-6">
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  State
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="NY"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-green-700 font-semibold mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="10001"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 p-6 rounded-lg bg-green-50">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Payment Information
          </h2>
          <form>
            <div className="w-96 h-56 rounded-2xl flex flex-col justify-between items-start mb-6">
              <motion.div
                className="bg-gradient-to-tr from-green-400 via-yellow-400 to-blue-400 via-pink-400 rounded-xl h-full shadow-lg text-white w-full p-5 relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={assets.chip}
                  alt="Chip"
                  className="absolute top-12 left-4 w-12 h-12"
                />

                <div className="absolute top-2 right-4">
                  <SiVisa size={70} />
                </div>

                <div className="flex flex-col justify-between h-full">
                  <p className="text-2xl tracking-widest font-mono mt-20">
                    {formatCardNumber(cardData.number) || "1234 5678 1234 5678"}
                  </p>

                  <div className="flex justify-between items-center w-full">
                    <span className="text-md uppercase font-medium">
                      {cardData.name || "John Doe"}
                    </span>
                    <span className="flex gap-4">
                    <span className="text-md font-medium">
                      {formatExpiryDate(cardData.expiry) || "MM/YY"}
                    </span>
                    <span className="text-md font-medium">
                      {cardData.cvc || "CVC"}
                    </span>
                    </span>
                  </div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            <div className="w-full flex flex-col gap-4">
              {/* Card Number */}
              <div className="w-full">
                <label className="block text-green-700 font-semibold">
                  Card Number
                </label>
                <input
                  type="text"
                  name="number"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="1234 5678 1234 5678"
                  value={cardData.number}
                  onChange={handleInputChange}
                  maxLength={16}
                />
              </div>

            
              <div className="w-full">
                <label className="block text-green-700 font-semibold">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                  value={cardData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="w-full flex gap-2 mb-4">
                <div className="w-1/2">
                  <label className="block text-green-700 font-semibold">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiry"
                    className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                </div>

    
                <div className="w-1/2">
                  <label className="block text-green-700 font-semibold">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    className="w-full p-3 border border-green-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500"
                    placeholder="123"
                    value={cardData.cvc}
                    onChange={handleInputChange}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>

   
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                disabled={!isFormValid()}
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
