import React, { useEffect, useState } from "react";
import {
  FaAppleAlt,
  FaSeedling,
  FaShoppingBasket,
  FaCarrot,
  FaPepperHot,
  FaLeaf,
  FaFish,
  FaSearch,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import assets from "../../assets/assets";
import axios from "axios";
import { useAuth } from "../../utils/Auth";
import { ImCross } from "react-icons/im";
import { motion } from "framer-motion";

const BuyBlock = () => {
  const { userDetails, authToken } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedKind, setSelectedKind] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const sideBarKinds = [
    { name: "Seasonal", icon: <FaSeedling /> },
    { name: "Daily", icon: <FaShoppingBasket /> },
  ];

  const sideBarCategory = [
    { name: "Vegetables", icon: <FaCarrot /> },
    { name: "Fruits", icon: <FaAppleAlt /> },
    { name: "Nuts", icon: <FaLeaf /> },
    { name: "Dairy", icon: <FaFish /> },
    { name: "Spices", icon: <FaPepperHot /> },
    { name: "Pulses", icon: <FaSeedling /> },
  ];

  const GetProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/market/get-items"
      );
      const allItems = response.data.items;
      setAllProducts(allItems);

      const filteredProducts = Object.values(
        allItems.reduce((acc, item) => {
          if (
            !acc[item.itemName] ||
            acc[item.itemName].itemPrice > item.itemPrice
          ) {
            acc[item.itemName] = item;
          }
          return acc;
        }, {})
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Failed to fetch products: ", error);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const AddToCart = async (product, quantity = 1) => {
    const item = {
      id: product._id,
      itemName: product.itemName,
      itemPrice: product.itemPrice,
      imageUrl: product.itemImage,
      quantity: quantity,
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
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Failed to add item to cart: ", error);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setQuantity(1);
    setTimeout(() => {
      setSelectedProduct(null);
      setQuantity(1);
    }, 500);
  };

  const filterProducts = () => {
    let filtered = allProducts;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.itemCategory === selectedCategory
      );
    }

    if (selectedKind) {
      filtered = filtered.filter(
        (product) => product.itemKind === selectedKind
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.itemCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filtered);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedKind, selectedCategory]);

  return (
    <div className="relative h-full w-full p-10 overflow-hidden mb-20">
      {modal && selectedProduct && (
        <div className="fixed inset-28 z-50 max-h-[65%] w-1/2 mx-auto rounded-2xl">
          <span
            onClick={() => closeModal()}
            className="absolute -right-2 -top-5 hover:cursor-pointer select-none"
          >
            <ImCross size={18} />
          </span>
          <div className="h-full w-full flex flex-col gap-1 p-1">
            {/* Modal Content */}
            {modal && selectedProduct && (
              <motion.div
                className="fixed inset-28 z-50 max-h-[65%] w-1/2 mx-auto bg-white rounded-2xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span
                  onClick={() => closeModal()}
                  className="absolute -right-2 -top-5 hover:cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImCross size={18} />
                </motion.span>

                <div className="h-full w-full flex flex-col gap-1 p-1">
                  <div className="h-44 w-full rounded-xl border-[1px] border-zinc-400 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="h-40 w-40 m-1 bg-green-200 rounded-xl flex justify-center items-center">
                        <img
                          src={selectedProduct.itemImage || assets.defaultImage}
                          alt={selectedProduct.itemName || "Product"}
                          className="h-40 w-40 object-contain"
                        />
                      </div>
                      <div className="h-full ml-4">
                        <h1 className="text-xl font-semibold mt-5">
                          {selectedProduct.itemName}
                        </h1>
                        <p className="text-md font-semibold text-zinc-600 mt-2">
                          Price:{" "}
                          <span className="text-green-500">
                            Rs {selectedProduct.itemPrice} / Kg
                          </span>
                        </p>
                        <div className="flex h-10 flex-col gap-1 bg-green-400 w-full rounded-md mt-4 overflow-hidden">
                          <div className="h-full w-full flex rounded-lg">
                            <motion.div
                              onClick={() => handleQuantityChange(-1)}
                              className="w-1/3 h-full flex justify-center items-center cursor-pointer hover:scale-[1.2] shadow-xl select-none"
                              whileTap={{ scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <FaMinus className="text-white" />
                            </motion.div>

                            <div className="w-1/3 h-full flex justify-center items-center bg-white">
                              <p className="text-zinc-600 font-semibold text-lg">
                                {quantity}
                              </p>
                            </div>
                            <motion.div
                              onClick={() => handleQuantityChange(1)}
                              className="w-1/3 h-full flex justify-center items-center cursor-pointer hover:scale-[1.2] shadow-xl select-none"
                              whileTap={{ scale: 0.9 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                            >
                              <FaPlus className="text-white" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-40 h-full mt-10">
                      <motion.div
                        onClick={() => AddToCart(selectedProduct, quantity)}
                        className="h-12 mt-10 mr-5 flex items-center justify-center border rounded-xl bg-amber-500 hover:bg-amber-600 hover:cursor-pointer select-none"
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <p className="text-xl font-semibold text-white">
                          Add To Cart
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  <div className="h-full w-full flex flex-col gap-2 rounded-2xl p-1">
                    {allProducts
                      .filter(
                        (product) =>
                          product.itemName === selectedProduct.itemName
                      )
                      .map((product) => (
                        <div className="h-32 w-full flex items-center bg-zinc-100 border-[1px] border-zinc-400 rounded-xl px-2">
                          <div className="h-28 w-28 bg-zinc-50 rounded-xl">
                            <img
                              src={product.itemImage}
                              alt="Cart Icon"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <div className="h-full w-1/2 flex flex-col gap-2 p-4">
                            <p className="text-md font-medium text-black">
                              {product.itemName}
                            </p>
                            <p className="text-md font-medium text-green-500">
                              Rs {product.itemPrice} / Kg
                            </p>
                            <p className="font-medium">By: {product.seller.name}</p>
                          </div>
                          <motion.div
                            onClick={() => setSelectedProduct(product)}
                            whileHover={{ scale: 1 }}
                            whileTap={{ scale: 0.1 }}
                            className="px-6 py-2 border-2 ml-32 border-green-800 rounded-xl bg-green-900 text-center shadow-lg hover:cursor-pointer hover:bg-green-800 transition-all duration-300 ease-in-out select-none"
                          >
                            <p className="text-xl font-semibold text-white">
                              Switch
                            </p>
                          </motion.div>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <p
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        className="text-center text-7xl font-extrabold text-[#0d331c] font-[kurale] mt-8 w-[80%] mx-auto"
      >
        Shop healthy fruits and vegetables like never before.
      </p>
      <div className="w-[99%] flex gap-2 mt-10 mx-auto rounded-3xl">
        {/* Sidebar */}
        <div
          style={{
            background: "linear-gradient(to left,  #6ee7b7, #34d399, #10b981)",
          }}
          className="w-1/5 h-full flex flex-col gap-2 rounded-3xl p-3 pt-7 transition-all duration-400"
        >
          {/* Search Bar */}
          <div className="h-14 w-full bg-white rounded-full p-3 flex items-center shadow-md mb-3 hover:scale-[1.02] transition-all duration-300 hover:cursor-pointer">
            <FaSearch className="text-gray-500 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full p-3 border-none outline-none rounded-full text-gray-600 placeholder-gray-400"
            />
          </div>
          <hr className="mt-2 mb-2 border-t-2 border-green-400" />
          {/* Kinds */}
          {sideBarKinds.map((kind, index) => (
            <div
              key={index}
              onClick={() => setSelectedKind(kind.name)}
              className={`h-14 w-full hover:bg-amber-300 hover:cursor-pointer rounded-xl p-5 flex items-center gap-3 ${
                selectedKind === kind.name ? "bg-green-300" : ""
              }`}
            >
              <div className="text-2xl">{kind.icon}</div>
              <p className="text-xl font-semibold">{kind.name}</p>
            </div>
          ))}
          <hr className="mt-2 mb-2 border-t-2 border-green-400" />
          {/* Categories */}
          {sideBarCategory.map((category, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(category.name)}
              className={`h-14 w-full hover:bg-amber-300 hover:cursor-pointer rounded-xl p-5 flex items-center gap-3 ${
                selectedCategory === category.name ? "bg-green-300" : ""
              }`}
            >
              <div className="text-2xl">{category.icon}</div>
              <p className="text-xl font-semibold">{category.name}</p>
            </div>
          ))}
        </div>
        {/* Product List */}
        <div className="w-4/5 h-full rounded-3xl p-5">
          {!products.length ? (
            <div className="flex justify-center items-center h-full">
              <img
                src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
                alt="No Products"
                className="max-w-full h-auto object-contain"
                style={{ height: "600px", width: "600px" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="h-56 w-48 bg-red-100 rounded-3xl hover:shadow-green-400 shadow-md cursor-pointer overflow-hidden relative"
                  style={{
                    background:
                      "radial-gradient(circle at center, #a7f3d0, #6ee7b7, #34d399, #10b981, #059669)",
                    textShadow: "0.2px 0.2px 0.2px #000",
                  }}
                >
                  <div className="h-[65%] w-full flex justify-center items-center">
                    <img
                      src={product.itemImage}
                      className="object-cover h-[75%] w-[75%]"
                      alt={product.itemName}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xl font-semibold text-green-900">
                      {product.itemName}
                    </h3>
                    <span className="text-lg font-medium text-green-900">
                      Rs {product.itemPrice} g
                    </span>
                  </div>
                  <div
                    onClick={() => openModal(product)}
                    className="h-16 w-14 absolute -bottom-2 -right-3 rounded-2xl flex justify-center items-center hover:scale-[1.05] hover:cursor-pointer"
                    style={{
                      background:
                        "radial-gradient(circle at center, #fde68a, #f59e0b)",
                    }}
                  >
                    <BsCart4 size={26} className="mr-2 mb-2 text-green-900 select-none" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyBlock;
