import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { SiVisa } from "react-icons/si";
import { FaLeaf, FaTractor } from "react-icons/fa";
import { motion } from "framer-motion";
import assets from "../../assets/assets";

const PlaceOrder = () => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isCardFormValid = () => {
    return (
      cardData.number.length === 16 &&
      cardData.expiry.length === 5 &&
      cardData.cvc.length === 3 &&
      cardData.name.trim() !== ""
    );
  };

  const isPersonalFormValid = () => {
    return (
      personalData.firstName.trim() !== "" &&
      personalData.lastName.trim() !== "" &&
      personalData.email.includes("@") &&
      personalData.phone.trim() !== "" &&
      personalData.street.trim() !== "" &&
      personalData.city.trim() !== "" &&
      personalData.state.trim() !== "" &&
      personalData.zip.trim() !== ""
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
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-green-200 to-green-100 font-sans">
      <NavBar transparent={true} />
      <div className="w-full max-w-5xl mx-auto my-6 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row border border-green-200"
        >
          {/* Personal Details */}
          <div className="w-full lg:w-1/2 p-6 bg-green-50">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4a7043] mb-5 flex items-center gap-2">
              <FaLeaf className="text-[#6b9e5b]" /> Your Details
            </h2>
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={personalData.firstName}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={personalData.lastName}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={personalData.email}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={personalData.phone}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="+1234567890"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={personalData.street}
                  onChange={handlePersonalInputChange}
                  className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                  placeholder="123 Farm Lane"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={personalData.city}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="Greenville"
                  />
                </div>
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={personalData.state}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="NY"
                  />
                </div>
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Zip</label>
                  <input
                    type="text"
                    name="zip"
                    value={personalData.zip}
                    onChange={handlePersonalInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="10001"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Payment Information */}
          <div className="w-full lg:w-1/2 p-6 bg-green-50">
            <h2 className="text-2xl md:text-3xl font-bold text-[#4a7043] mb-5 flex items-center gap-2">
              <FaTractor className="text-[#6b9e5b]" /> Payment
            </h2>
            <form className="flex flex-col gap-5">
              {/* Card Preview */}
              <motion.div
                className="w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-[#6b9e5b] to-[#4a7043] text-white p-4"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={assets.chip}
                  alt="Chip"
                  className="absolute top-6 left-3 w-10 h-10"
                />
                <div className="absolute top-2 right-3">
                  <SiVisa size={50} />
                </div>
                <div className="flex flex-col justify-between h-48">
                  <p className="text-lg md:text-xl tracking-widest font-mono mt-14">
                    {formatCardNumber(cardData.number) || "1234 5678 1234 5678"}
                  </p>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm md:text-md uppercase font-medium truncate max-w-[50%]">
                      {cardData.name || "John Doe"}
                    </span>
                    <span className="flex gap-2">
                      <span className="text-sm md:text-md font-medium">
                        {formatExpiryDate(cardData.expiry) || "MM/YY"}
                      </span>
                      <span className="text-sm md:text-md font-medium">
                        {cardData.cvc || "CVC"}
                      </span>
                    </span>
                  </div>
                </div>
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Card Inputs */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Card Number</label>
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={handleCardInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="1234 5678 1234 5678"
                    maxLength={16}
                  />
                </div>
                <div>
                  <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Card Holder Name</label>
                  <input
                    type="text"
                    name="name"
                    value={cardData.name}
                    onChange={handleCardInputChange}
                    className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6b9e5b] font-medium text-sm mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardData.expiry}
                      onChange={handleCardInputChange}
                      className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="block text-[#6b9e5b] font-medium text-sm mb-1">CVV</label>
                    <input
                      type="text"
                      name="cvc"
                      value={cardData.cvc}
                      onChange={handleCardInputChange}
                      className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-[#6b9e5b] focus:outline-none text-[#4a7043] bg-green-50 placeholder-[#a3b899]"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              {/* Pay Now Button */}
              <motion.button
                type="submit"
                className={`w-full py-3 px-6 rounded-lg shadow-md text-white font-semibold text-md transition-all duration-300 flex items-center justify-center gap-2 ${
                  isCardFormValid() && isPersonalFormValid()
                    ? "bg-[#6b9e5b] hover:bg-[#5a8c4b]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                disabled={!isCardFormValid() || !isPersonalFormValid()}
                whileHover={{ scale: isCardFormValid() && isPersonalFormValid() ? 1.05 : 1 }}
                whileTap={{ scale: isCardFormValid() && isPersonalFormValid() ? 0.95 : 1 }}
              >
                <FaLeaf /> Order from the Farm
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlaceOrder;