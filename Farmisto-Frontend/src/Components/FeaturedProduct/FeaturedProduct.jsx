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
      description: "Fresh, juicy tomatoes.",
    },
    {
      id: 2,
      image:
        "https://plus.unsplash.com/premium_photo-1708971732799-649f5526ad73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Capsicum",
      description: "Crisp, colorful capsicum.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1526470303-82c787d88682?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Capsicum",
      description: "Zesty, ripe capsicum.",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1669544695328-c2a61f9382e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D",
      name: "Dough",
      description: "Soft, local dough.",
    },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-100 py-8 md:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-8 md:gap-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#242424] font-bold text-center">
          Our Featured Product
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 font-medium text-center max-w-3xl">
          Discover our Featured Product, handpicked for its quality and
          freshness. Sourced directly from local farmers, it brings
          farm-to-table goodness right to you. Support fair trade while enjoying
          the best of nature’s harvest.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 w-full">
          {products.map((product) => (
            <div
              key={product.id}
              className="hover:scale-[1.05] border border-green-200 bg-green-50 transition-all duration-300 w-full max-w-[15rem] mx-auto h-60 p-4 rounded-3xl flex flex-col items-center justify-center shadow-sm"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 md:w-28 md:h-28 shadow-lg object-cover rounded-3xl"
              />
              <h2 className="text-xl md:text-2xl font-bold mt-4 text-center">
                {product.name}
              </h2>
              <p className="text-sm text-emerald-600 mt-2 text-center line-clamp-2">
                {product.description}
              </p>
            </div>
          ))}
        </div>
        <p
          onClick={() => navigate("/market")}
          className="text-emerald-800 font-semibold text-lg md:text-xl hover:text-emerald-700 hover:scale-[1.05] cursor-pointer transition-all duration-300 mt-4"
        >
          See All Products
        </p>
      </div>
    </div>
  );
};

export default FeaturedProduct;