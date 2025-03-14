import React, { useEffect, useState } from "react";
import {
  FaAppleAlt,
  FaSeedling,
  FaShoppingBasket,
  FaCarrot,
  FaPepperHot,
  FaLeaf,
  FaFish,
  FaMinus,
  FaPlus,
  FaCartPlus,
  FaTractor,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from "../../utils/axios";
import { useAuth } from "../../utils/Auth";
import { motion } from "framer-motion";
import MobileBuyBlock from "../../Components/BuySection/MobileBuyBlock";
import AllBuyBlock from "../../Components/BuySection/AllBuyBlock";

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
    { name: "Seasonal", icon: <FaSeedling className="text-[#155724]" /> },
    { name: "Daily", icon: <FaShoppingBasket className="text-[#155724]" /> },
  ];

  const sideBarCategory = [
    { name: "Vegetables", icon: <FaCarrot className="text-[#155724]" /> },
    { name: "Fruits", icon: <FaAppleAlt className="text-[#155724]" /> },
    { name: "Nuts", icon: <FaLeaf className="text-[#155724]" /> },
    { name: "Dairy", icon: <FaFish className="text-[#155724]" /> },
    { name: "Spices", icon: <FaPepperHot className="text-[#155724]" /> },
    { name: "Pulses", icon: <FaSeedling className="text-[#155724]" /> },
  ];

  const GetProducts = async () => {
    try {
      const response = await axios.get("/market/get-items");
      const allItems = response.data.items || [];
      setAllProducts(allItems);
      setProducts(allItems);
    } catch (error) {
      console.error("Failed to fetch farmer produce: ", error);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const AddToCart = async (product, quantity = 1) => {
    console.log(product)
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
        "/user/buy-item",
        item
      );
      console.log("Added to cart: ", response.data);
      closeModal();
    } catch (error) {
      console.error("Failed to add item to cart: ", error);
      alert("Failed to add item to cart.");
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
      filtered = filtered.filter((product) => product.itemCategory === selectedCategory);
    }
    if (selectedKind) {
      filtered = filtered.filter((product) => product.itemType === selectedKind);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.itemCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="w-full min-h-screen bg-green-50 p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden mt-10">
      {/* Modal */}
      {modal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#155724]/50" onClick={closeModal} />
          <motion.div
            className="relative w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#f0f7e4] rounded-lg shadow-xl max-h-[90vh] z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              onClick={closeModal}
              className="absolute -top-5 -right-5 p-2 cursor-pointer hover:scale-105 z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ImCross size={18} className="text-[#6b8e23] hover:text-[#8ab644]" />
            </motion.span>
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between border border-[#a3cfae] rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 bg-[#d4edda] rounded-lg flex justify-center items-center">
                    <img
                      src={selectedProduct.itemImage || "https://via.placeholder.com/150"}
                      alt={selectedProduct.itemName || "Produce"}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h1 className="text-lg sm:text-xl font-semibold text-[#155724]">
                      {selectedProduct.itemName}
                    </h1>
                    <p className="text-sm sm:text-base font-medium text-[#155724] mt-1">
                      From: <span className="text-[#6b8e23]">{selectedProduct.farmerName}</span>
                    </p>
                    <p className="text-sm sm:text-base font-medium text-[#155724] mt-1">
                      Price: <span className="text-[#6b8e23]">₹{selectedProduct.itemPrice} / {selectedProduct.unit}</span>
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                      <motion.div
                        onClick={() => handleQuantityChange(-1)}
                        className="w-8 h-8 flex justify-center items-center bg-[#6b8e23] text-white rounded-md cursor-pointer hover:bg-[#8ab644]"
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaMinus />
                      </motion.div>
                      <div className="w-10 h-8 flex justify-center items-center bg-[#f0f7e4] border border-[#a3cfae] rounded-md">
                        <p className="text-lg font-semibold text-[#155724]">{quantity}</p>
                      </div>
                      <motion.div
                        onClick={() => handleQuantityChange(1)}
                        className="w-8 h-8 flex justify-center items-center bg-[#6b8e23] text-white rounded-md cursor-pointer hover:bg-[#8ab644]"
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaPlus />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <motion.div
                  onClick={() => AddToCart(selectedProduct, quantity)}
                  className="w-full sm:w-32 h-10 mt-4 sm:mt-0 flex items-center justify-center bg-[#6b8e23] hover:bg-[#8ab644] text-white rounded-md cursor-pointer shadow-sm"
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="text-sm font-medium flex items-center gap-2">
                    <FaCartPlus /> Buy Now
                  </p>
                </motion.div>
              </div>
              <div className="space-y-2">
                {allProducts
                  .filter((product) => product.itemName === selectedProduct.itemName)
                  .map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center bg-[#e6f4cc] border border-[#a3cfae] rounded-lg p-3"
                    >
                      <div className="h-16 w-16 bg-[#d4edda] rounded-md flex-shrink-0">
                        <img
                          src={product.itemImage}
                          alt={product.itemName}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 px-3">
                        <p className="text-sm font-medium text-[#155724]">
                          {product.farmerName}
                        </p>
                        <p className="text-sm text-[#6b8e23]">
                          ₹{product.itemPrice} / {product.unit}
                        </p>
                        <p className="text-xs text-[#155724]/80">
                          Stock: {product.quantity} {product.unit}
                        </p>
                      </div>
                      <motion.div
                        onClick={() => setSelectedProduct(product)}
                        className="px-3 py-1 bg-[#6b8e23] hover:bg-[#8ab644] text-white rounded-md shadow-sm cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                      >
                        <p className="text-sm font-medium">Select</p>
                      </motion.div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="text-center p-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[#155724] tracking-tight flex items-center justify-center gap-2">
          <FaTractor className="text-[#6b8e23]" />Farmisto
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#155724]/80 mt-2">
          Fresh Produce Direct from Local Farmers
        </p>
      </div>

      {/* Main Content */}
      <div className="hidden lg:block w-full">
          <AllBuyBlock
            products={products}
            openModal={openModal}
            sideBarKinds={sideBarKinds}
            sideBarCategory={sideBarCategory}
            setSelectedKind={setSelectedKind}
            setSelectedCategory={setSelectedCategory}
            selectedKind={selectedKind}
            selectedCategory={selectedCategory}
          />
        </div>

      <div className="lg:hidden w-full">
          <MobileBuyBlock
            products={products}
            openModal={openModal}
            sideBarKinds={sideBarKinds}
            sideBarCategory={sideBarCategory}
            setSelectedKind={setSelectedKind}
            setSelectedCategory={setSelectedCategory}
            selectedKind={selectedKind}
            selectedCategory={selectedCategory}
          />
        </div>
    </div>
  );
};

export default BuyBlock;