import React, { useState, useRef, useEffect } from "react";
import SideNav from "./sidenav";
import axios from "axios";
import { useAuth } from "../utils/Auth";
import "./AddItem.css";
import { motion } from "framer-motion";

const AddItem = () => {
  const { authToken } = useAuth();
  const [productData, setProductData] = useState([]);
  const [hover, setHover] = useState(false);
  const [image, setImage] = useState(null);

  const itemName = useRef();
  const itemPrice = useRef();
  const itemCategory = useRef();
  const itemQuantity = useRef();
  const itemType = useRef();
  const itemUnit = useRef();
  const perPrice = useRef();

  const productsPerPage = 8;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
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
        "http://localhost:4000/market/add-item",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Item added successfully!");
      setProductData([...productData, response.data.item]);
    } catch (error) {
      alert("Failed to add item. Please try again.");
      console.error("Failed to add item: ", error);
    }
  };

  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/market/get-items"
      );
      setProductData(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items: ", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <SideNav />
      <div className="flex flex-col h-full w-full overflow-y-auto p-6">
          <h2 className="text-3xl text-nowrap w-1/6 ml-5 font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-8 font-[Fjalla One]">
            Product Details
          </h2>
        {/* Form Section */}
        <div
          className="product bg-[#70942e] p-6 mb-4 rounded-xl shadow-lg"
          style={{
            boxShadow:
              "15px 15px 1px #80e0a7, 15px 15px 1px 2px rgba(0, 128, 0, 0.8)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="add-item grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Product Name
              </label>
              <input
                type="text"
                ref={itemName}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Price
              </label>
              <input
                type="number"
                ref={itemPrice}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
                placeholder="Enter price"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Category
              </label>
              <select
                ref={itemCategory}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
              >
                <option>Category</option>
                <option>Vegetables</option>
                <option>Fruits</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Quantity
              </label>
              <input
                type="number"
                ref={itemQuantity}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
                placeholder="Enter quantity"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Per Quantity
              </label>
              <input
                type="number"
                ref={perPrice}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
                placeholder="Enter per quantity price"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                Unit
              </label>
              <select
                ref={itemUnit}
                className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
              >
                <option>kg</option>
                <option>g</option>
                <option>l</option>
                <option>ml</option>
              </select>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <label className="block text-sm text-[#2A293E] mb-1 font-[Fjalla One]">
                  Product Type
                </label>
                <input
                  type="text"
                  ref={itemType}
                  className="w-full p-2 border-b-2 border-black bg-[#f7f3e9] focus:border-[#70942e] outline-none font-[Fjalla One] text-[#2A293E] text-sm"
                  placeholder="Enter product type"
                />
              </div>
            </div>
            <div className="w-full flex gap-5 items-center">
              <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                <div
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  className="w-full h-full relative bg-gray-200 rounded-md flex items-center justify-center cursor-pointer border-2 border-dashed border-[#70942e]"
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
                      animate={{ opacity: 1, height: "25%" }}
                      exit={{ opacity: 0, height: "0%" }}
                      transition={{
                        duration: 0.3,
                        damping: 25,
                        type: "spring",
                      }}
                      className="absolute bottom-0 bg-green-100 h-24 w-full flex justify-center items-center"
                    >
                      <p className="text-2xl font-bold text-green-800">
                        Add Image
                      </p>
                    </motion.div>
                  )}
                  {!image && (
                    <img
                      src="https://cdn.dribbble.com/users/252114/screenshots/2618219/media/e0c7a8d4fa9d769eeb976e48508323e5.jpg?resize=800x600&vertical=center"
                      alt="Placeholder"
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="mt-4 p-2 w-48 h-16 bg-[#03b79e] text-white rounded-md hover:bg-[#25a392] focus:ring-2 focus:ring-[#ffa580] text-xl font-semibold font-[Fjalla One]"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div className="bg-opacity-70 p-4 mt-10">
          {/* Search Bar */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-3xl font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-6 font-[Fjalla One]">
              Product List
            </h2>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-1/2 p-2 border-b-2 border-[#70942e] outline-none text-[#2A293E] font-[Fjalla One] focus:border-[#2A293E]"
            />
          </div>

          {/* Product List */}
          <div className="space-y-4 w-full">
            {productData.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-green-100 shadow-sm rounded-md hover:bg-green-200"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-16 h-16">
                  <img
                    src={product.itemImage}
                    alt={product.itemName}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Name */}
                <div className="flex-1 px-4">
                  <p className="text-lg font-semibold text-[#2A293E]">
                    {product.itemName}
                  </p>
                </div>

                {/* Product Quantity */}
                <div className="flex-shrink-0 px-4">
                  <p className="text-sm font-medium text-[#2A293E]">
                    {product.quantity}
                  </p>
                </div>

                {/* Product Price */}
                <div className="flex-shrink-0 px-4">
                  <p className="text-sm font-medium text-[#2A293E]">
                    {product.itemPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
