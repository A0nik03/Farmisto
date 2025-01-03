import React, { useState } from "react";
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

const products = [
  {
    id: 1,
    name: "Tomato",
    price: 20,
    category: "Vegetables",
    image: assets.tomato,
    backgroundColor: "#DB324D",
  },
  {
    id: 2,
    name: "Apple",
    price: 120,
    category: "Fruits",
    image: assets.apple,
    backgroundColor: "#FF495C",
  },
  {
    id: 3,
    name: "Carrot",
    price: 40,
    category: "Vegetables",
    image: assets.carrot,
    backgroundColor: "#EF798A",
  },
  {
    id: 4,
    name: "Almonds",
    price: 200,
    category: "Nuts",
    image: assets.almond,
    backgroundColor: "#E4B4C2",
  },
  {
    id: 5,
    name: "Cereal",
    price: 30,
    category: "Cereals",
    image: assets.tomato,
    backgroundColor: "#E3D7FF",
  },
];

const BuyBlock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="h-[140vh] w-full p-10 overflow-hidden mb-20">
      <p className="text-center text-7xl font-extrabold text-green-600 font-[kurale] mt-8 w-[80%] mx-auto">
        Shop healthy fruits and vegetables like never before.
      </p>
      <div className="w-[99%] flex gap-2 mt-10 mx-auto rounded-3xl">
        <div className="w-1/5 h-full flex flex-col gap-2 bg-green-200 rounded-3xl p-3 pt-7 transition-all duration-400">
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
                  product.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  product.category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product.id}
                  style={{ backgroundColor: product.backgroundColor,textShadow: '0.2px 0.2px 0.2px #000' }}
                  className="rounded-3xl shadow-lg overflow-hidden relative"
                >
                  <div className="flex justify-center">
                    <img
                      src={product.image}
                      className="object-cover h-32 w-32"
                      alt=""
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-lg font-medium">
                      Rs {product.price}/kg
                    </span>
                  </div>
                  <div className="h-16 w-14 absolute -bottom-2 -right-3 rounded-2xl bg-white flex justify-center items-center">
                  <BsCart4 size={26} className="mr-2 mb-2"/>
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
