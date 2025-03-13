import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsCart4 } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa6";
import NavBar from "../../Components/Major/Navbar";
import Footer from '../../Components/Footer/Footer'
import { useAuth } from "../../utils/Auth";

const Market = () => {
  const [farmer, setFarmer] = useState({});
  const [farmerItems, setFarmerItems] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const { userDetails } = useAuth();

  const farmerEmail = userDetails?.user.email;

  const fetchFarmer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/user/get-farmer`,
        { farmerEmail: farmerEmail },
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
      quantity: quantity,
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
    <div className="min-h-screen bg-[#f7f3e9] flex flex-col">
      <NavBar />

      <main className="flex-grow container mx-auto px-4 py-12 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
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

        <div className="relative h-[230px] bg-white rounded-2xl shadow-sm p-6 mb-10 border border-emerald-100 flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={
                farmer.farmerProfilePhoto ||
                "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
              }
              alt={farmer.farmerName || "Farmer"}
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-200"
            />
            <span
              className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${
                farmer.available ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
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
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Phone:</span>{" "}
              {farmer.farmerMobile || "+91234976990"}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Address:</span>{" "}
              {farmer.farmerAddress}
            </p>
          </div>

          <div className="absolute bottom-5 right-5 z-10">
            <button
              onClick={toggleChat}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full shadow-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5"
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
              <span className="text-sm font-medium">Ask Me</span>
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-green-800 mb-6">
          Fresh from the Farm
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-emerald-100 rounded-lg shadow-sm p-4 flex flex-col items-center text-center"
            >
              <img
                src={item.itemImage || "https://via.placeholder.com/150"}
                alt={item.itemName}
                className="w-32 h-32 object-cover mb-4 rounded-md"
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.itemName}
              </h3>
              <p className="text-gray-600 mb-4">Price: ₹{item.itemPrice}</p>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                >
                  <FaMinus />
                </button>
                <span className="px-3 py-1 border rounded-md text-gray-800">
                  {quantities[item._id] || 1}
                </span>
                <button
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                >
                  <FaPlus />
                </button>
              </div>
              <button
                onClick={() => AddToCart(item)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <BsCart4 /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Market;
