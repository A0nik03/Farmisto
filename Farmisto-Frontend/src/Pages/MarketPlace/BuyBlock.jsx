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
} from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import assets from "../../assets/assets";
import axios from "axios";



const BuyBlock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products,setProducts] = useState([]);

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
      const response = await axios.get("http://localhost:4000/market/get-items");
      console.log("Response: ", response.data.items);
      setProducts(response.data.items)
    } catch (error) {
      console.error("Failed to fetch products: ", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div className="h-[140vh] w-full p-10 overflow-hidden mb-20">
      <p className="text-center text-7xl font-extrabold text-green-600 font-[kurale] mt-8 w-[80%] mx-auto">
        Shop healthy fruits and vegetables like never before.
      </p>
      <div className="w-[99%] flex gap-2 mt-10 mx-auto rounded-3xl">
        <div className="w-1/5 h-full flex flex-col gap-2 bg-gradient-to-r from-green-300 through-green-100 to-green-400 rounded-3xl p-3 pt-7 transition-all duration-400">
          {/* Search Bar */}
          <div className="h-14 w-full bg-white rounded-full p-3 flex items-center shadow-md mb-3 hover:scale-[1.02] transition-all duration-300 hover:cursor-pointer">
            <FaSearch className="text-gray-500 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-full p-3 border-none outline-none rounded-full text-gray-600 placeholder-gray-400"
            />
          </div>

          <hr className="mt-2 mb-2 border-t-2 border-green-400" />

          {sideBarKinds.map((kind, index) => (
            <div
              key={index}
              className="h-14 w-full hover:bg-green-300 hover:cursor-pointer rounded-xl p-5 flex items-center gap-3"
            >
              <div className="text-2xl">{kind.icon}</div>
              <p className="text-xl font-semibold">{kind.name}</p>
            </div>
          ))}

          <hr className="mt-2 mb-2 border-t-2 border-green-400" />

          {sideBarCategory.map((category, index) => (
            <div
              key={index}
              className="h-14 w-full hover:bg-green-300 hover:cursor-pointer rounded-xl p-5 flex items-center gap-3"
            >
              <div className="text-2xl">{category.icon}</div>
              <p className="text-xl font-semibold">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-4/5 h-full rounded-3xl p-5">
          <div className="grid grid-cols-5 gap-4">
            {products
              .filter(
                (product) =>
                  product.itemName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.itemCategory
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product._id}
                  style={{
                    background:
                      "radial-gradient(circle at center, #a7f3d0, #6ee7b7, #34d399)",
                    textShadow: "0.2px 0.2px 0.2px #000",
                  }}
                  className="rounded-3xl shadow-lg overflow-hidden relative"
                >
                  <div className="flex justify-center">
                    <img
                      src={product.itemImage}
                      className="object-cover h-32 w-32"
                      alt=""
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xl font-semibold">{product.itemName}</h3>
                    <span className="text-lg font-medium">
                      Rs {product.itemPrice}/kg
                    </span>
                  </div>
                  <div
                    style={{
                      background:
                        "radial-gradient(circle at center, #fde68a, #f59e0b)",
                    }}
                    className="h-16 w-14 absolute -bottom-2 -right-3 rounded-2xl outline-none flex justify-center items-center hover:scale-[1.05] hover:cursor-pointer"
                  >
                    <BsCart4 size={26} className="mr-2 mb-2" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyBlock;
