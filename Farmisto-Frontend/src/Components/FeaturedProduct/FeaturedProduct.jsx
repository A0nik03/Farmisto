import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedProduct = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1664551734578-fe47fea8cab8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Tomato",
      description: "This is the description for product 1.",
    },
    {
      id: 2,
      image:
        "https://plus.unsplash.com/premium_photo-1708971732799-649f5526ad73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Capsicum",
      description: "This is the description for product 2.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1526470303-82c787d88682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Capsicum",
      description: "This is the description for product 3.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1669544695328-c2a61f9382e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Dough",
      description: "This is the description for product 4.",
    },
  ];
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-zinc-50 to-zinc-100">
      <div className="w-[80%] h-full mx-auto flex flex-col justify-center items-center gap-12">
        <h1 className="text-5xl text-[#242424] font-bold">
          Our Featured Product
        </h1>
        <p className="text-xl text-zinc-600 font-medium text-center">
          Discover our Featured Product, handpicked for its quality and
          freshness. Sourced directly from local farmers, it brings
          farm-to-table goodness right to you. Support fair trade while enjoying
          the best of nature’s harvest.
        </p>
        <div className="flex gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="hover:scale-[1.05] transition-all duration-300 w-60 h-60 p-4 rounded-3xl flex flex-col items-center justify-center bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 shadow-lg object-cover rounded-3xl"
              />
              <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
            </div>
          ))}
        </div>
        <p
          onClick={() => navigate("/market")}
          className="text-green-600 font-semibold text-xl hover:text-green-500 hover:scale-[1.05] cursor-pointer"
        >
          See All Products
        </p>
      </div>
    </div>
  );
};

export default FeaturedProduct;
