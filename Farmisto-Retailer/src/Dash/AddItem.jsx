import React, { useState, useRef, useEffect } from "react";
import SideNav from "./sidenav";
import axios from "../utils/axios";
import { useAuth } from "../utils/Auth";
import { motion } from "framer-motion";
import {
  FaCarrot,
  FaRupeeSign,
  FaListAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaRuler,
  FaCamera,
} from "react-icons/fa";

const AddItem = () => {
  const { authToken } = useAuth();
  const [productData, setProductData] = useState([]);
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const itemName = useRef();
  const itemPrice = useRef();
  const itemCategory = useRef();
  const itemQuantity = useRef();
  const itemType = useRef();
  const itemUnit = useRef();
  const perPrice = useRef();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName.current.value);
    formData.append("itemPrice", itemPrice.current.value);
    formData.append("itemCategory", itemCategory.current.value);
    formData.append("quantity", itemQuantity.current.value);
    formData.append("itemType", itemType.current.value);
    formData.append("unit", itemUnit.current.value);
    formData.append("itemValue", perPrice.current.value);
    formData.append("itemImage", image);

    try {
      const response = await axios.post(
        "/market/add-item",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Produce added successfully!");
      setProductData((prevData) => [...prevData, response.data.item]);
      itemName.current.value = "";
      itemPrice.current.value = "";
      itemCategory.current.value = "Category";
      itemQuantity.current.value = "";
      itemType.current.value = "All";
      itemUnit.current.value = "kg";
      perPrice.current.value = "";
      setImage(null);
      setImageError(false);
    } catch (error) {
      alert("Failed to add produce. Please try again.");
      console.error("Failed to add item: ", error);
    }
  };

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        `/market/get-items-farmer`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProductData(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items: ", error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getAllItems();
    }
  }, [authToken]);

  const filteredProducts = productData.filter((product) =>
    product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-[#f7f3e9]">
      <SideNav />
      <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-none p-4">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl w-full md:w-1/4 font-semibold text-[#4a3e20] border-b-4 border-[#6b8e23] mb-8 tracking-tight">
          <p className="text-center mb-2">Add Produce</p>
        </h2>

        {/* Form Section */}
        <div className="bg-[#f5f0e1] p-4 md:p-6 rounded-lg shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            {/* Produce Name */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaCarrot className="text-[#6b8e23]" /> Produce Name
              </label>
              <input
                type="text"
                ref={itemName}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
                placeholder="e.g., Organic Tomatoes"
              />
            </div>

            {/* Total Price */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaRupeeSign className="text-[#6b8e23]" /> Total Price (INR)
              </label>
              <input
                type="number"
                ref={itemPrice}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
                placeholder="e.g., 500"
              />
            </div>

            {/* Category */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaListAlt className="text-[#6b8e23]" /> Category
              </label>
              <select
                ref={itemCategory}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
              >
                <option value="Category">Select Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Nuts">Nuts</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            {/* Type */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaCalendarAlt className="text-[#6b8e23]" /> Type
              </label>
              <select
                ref={itemType}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
              >
                <option value="All">Select Type</option>
                <option value="Seasonal">Seasonal</option>
                <option value="Daily">Daily</option>
              </select>
            </div>

            {/* Quantity */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaWeightHanging className="text-[#6b8e23]" /> Quantity
              </label>
              <input
                type="number"
                ref={itemQuantity}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
                placeholder="e.g., 10"
              />
            </div>

            {/* Price per Unit */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaRupeeSign className="text-[#6b8e23]" /> Price per Unit (INR)
              </label>
              <input
                type="number"
                ref={perPrice}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
                placeholder="e.g., 50"
              />
            </div>

            {/* Unit */}
            <div className="w-full">
              <label className="block text-sm font-medium text-[#4a3e20] mb-1 flex items-center gap-2">
                <FaRuler className="text-[#6b8e23]" /> Unit
              </label>
              <select
                ref={itemUnit}
                className="w-full px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#4a3e20]"
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
              </select>
            </div>

            {/* Image Upload Section */}
            <div className="w-full flex flex-col gap-4 items-center">
              <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="w-full h-32 relative bg-[#e8dab7] rounded-lg flex items-center justify-center cursor-pointer border-2 border-dashed border-[#6b8e23]"
                onClick={() => document.getElementById("image").click()}
                style={{
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image)})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {hover && (
                  <motion.div
                    initial={{ opacity: 0, height: "0%" }}
                    animate={{ opacity: 1, height: "30%" }}
                    exit={{ opacity: 0, height: "0%" }}
                    transition={{ duration: 0.3, damping: 25, type: "spring" }}
                    className="absolute bottom-0 bg-[#6b8e23]/80 w-full flex justify-center items-center"
                  >
                    <p className="text-white font-medium flex items-center gap-2">
                      <FaCamera /> Add Image
                    </p>
                  </motion.div>
                )}
                {!image && (
                  <p className="text-[#4a3e20] font-medium flex items-center gap-2">
                    <FaCamera /> Upload Produce Image
                  </p>
                )}
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {imageError && (
                <p className="text-[#d9534f] text-sm mt-2">
                  Please select an image
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h2 className="text-2xl md:text-3xl w-full md:w-1/4 font-semibold text-[#4a3e20] border-b-4 border-[#6b8e23] tracking-tight mb-4 md:mb-0">
              <p className="text-center">Your Produce</p>
            </h2>
            <input
              type="text"
              placeholder="Search your produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 bg-[#faf8f0] border border-[#d1c4a5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8a7a4d]/50 focus:border-[#6b8e23] transition-all text-[#807d77]"
            />
          </div>

          {/* Product Data Display */}
          <div className="rounded-md overflow-hidden">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex md:flex-row flex-nowrap items-start md:items-center justify-between p-2 bg-[#faf8f0] hover:bg-[#f0e9dc] border-l-4 border-r-4 border-b-[1px] border-[#6b8e23] transition-all duration-200 cursor-pointer"
                >
                  <div className="w-3/4 flex items-start gap-5">
                    <div className="flex-shrink-0 w-16 h-16">
                      <img
                        src={product.itemImage}
                        alt={product.itemName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#4a3e20]">
                        {product.itemName}
                      </p>
                      <p className="text-sm text-[#4a3e20]">
                        {product.itemCategory} - {product.itemType}
                      </p>
                    </div>
                  </div>

                  <div className="h-20 w-1/4 flex flex-col md:flex-row md:items-center justify-end gap-2 md:gap-6 mt-2 md:mt-0">
                    <div className="pr-8">
                      <p className="text-sm font-medium text-[#4a3e20]">
                        Price: ₹{product.itemPrice} (₹{product.itemValue}/
                        {product.ItemUnit})
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#4a3e20] text-center">
                No produce added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
