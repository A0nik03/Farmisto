import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import MobileBuyBlock from "../../Components/BuySection/MobileBuyBlock";
import AllBuyBlock from "../../Components/BuySection/AllBuyBlock";
import { FaCarrot, FaFish, FaLeaf, FaPepperHot, FaSeedling } from "react-icons/fa6";
import { FaAppleAlt, FaShoppingBasket } from "react-icons/fa";
import MobileFarmerStore from "./Components/MobileFarmerStore";
import LargerFarmerStore from "./Components/LargerFarmerStore";

const FarmerProfile = () => {
  const location = useLocation();
  const [farmerEmail, setFarmerEmail] = useState(location.state?.email || "");
  const [farmer, setFarmer] = useState({});
  const [farmerItems, setFarmerItems] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const fetchFarmer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/user/get-farmer`,
        { farmerEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setFarmer(response.data.farmer || {});
    } catch (error) {
      console.error("Error fetching farmer:", error);
    }
  };

  const fetchFarmerItems = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/user/get-items-by-farmerId`,
        { farmerEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setFarmerItems(response.data.items || []);
    } catch (error) {
      console.error("Error fetching farmer items:", error);
    }
  };

  useEffect(() => {
    if (farmerEmail) {
      fetchFarmer();
      fetchFarmerItems();
    }
  }, [farmerEmail]);

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max(1, (prevQuantities[itemId] || 1) + change),
    }));
  };

  const AddToCart = async (product) => {
    const quantity = quantities[product._id] || 1;
    const item = {
      id: product._id,
      itemName: product.itemName,
      itemPrice: product.itemPrice,
      imageUrl: product.itemImage,
      quantity,
      itemUnit: {
        value: product.itemPrice,
        unit: product.itemUnit.unit,
      },
      farmer: {
        id: product.seller.id,
        name: product.seller.name,
        email: product.seller.email,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/user/buy-item",
        item,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Failed to add item to cart: ", error);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const displayedItems = farmerItems.slice(0, 14);

  return (
    <div className="h-screen flex flex-col ">
      <NavBar />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        {/* Farmer Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Welcome to{" "}
            {farmer.farmerName
              ? farmer.farmerName
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")
              : "Unknown Farmer"}
            's Store
          </h1>
        </div>

        {/* Farmer Profile Card */}
        <div className="relative bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-2xl shadow-sm p-4 sm:p-6 mb-8 sm:mb-10 border border-emerald-100 flex flex-col md:flex-row items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={
                farmer.farmerProfilePhoto ||
                "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
              }
              alt={farmer.farmerName || "Farmer"}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-emerald-200"
            />
            <span
              className={`absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white ${
                farmer.available ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {farmer.farmerName
                ? farmer.farmerName
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : "Unknown Farmer"}
            </h2>
            <p className="text-sm sm:text-md md:text-lg text-gray-600 mt-1 sm:mt-2">
              <span className="font-semibold">Phone:</span>{" "}
              {farmer.farmerMobile || "+91234976990"}
            </p>
            <p className="text-sm sm:text-md md:text-lg text-gray-600 mt-1 sm:mt-2">
              <span className="font-semibold">Address:</span>{" "}
              {farmer.farmerAddress || "Not provided"}
            </p>
          </div>

          <div className="mt-4 md:mt-0 md:absolute md:bottom-4 md:right-4 z-10">
            <button
              onClick={toggleChat}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full shadow-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 text-sm sm:text-md"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <span className="font-medium">Ask Me</span>
            </button>
          </div>
        </div>

        {/* Items Section */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-green-800 mb-4 sm:mb-6">
          Fresh from the Farm
        </h2>

        {/* Farmer Store */}
        <div className="lg:hidden w-full">
          <MobileFarmerStore
            products={displayedItems}
            addToCart={AddToCart}
            handleQuantityChange={handleQuantityChange}
            quantities={quantities}
          />
        </div>
        <div className="hidden md:block w-full">
          <LargerFarmerStore
            products={displayedItems}
            addToCart={AddToCart}
            handleQuantityChange={handleQuantityChange}
            quantities={quantities}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FarmerProfile;
