import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa6";

const AllBuyBlock = ({
  products,
  openModal,
  sideBarKinds,
  sideBarCategory,
  setSelectedKind,
  setSelectedCategory,
  selectedKind,
  selectedCategory,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 mt-8">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-green-100 rounded-lg p-4 sm:p-6 shadow-md">
        <div className="relative h-12 w-full bg-green-50 rounded-md flex items-center shadow-sm">
          <FaSearch className="text-[#6b8e23] ml-3" />
          <input
            type="text"
            placeholder="Search produce or farmer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-full px-3 bg-transparent border-none outline-none text-[#155724] placeholder-[#155724]/50 text-sm"
          />
        </div>
        <hr className="my-4 border-[#a3cfae]" />
        <div className="space-y-2">
          {sideBarKinds.map((kind) => (
            <div
              key={kind.name}
              onClick={() =>
                setSelectedKind(kind.name === selectedKind ? null : kind.name)
              }
              className={`h-12 flex items-center gap-3 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                selectedKind === kind.name
                  ? "bg-[#6b8e23] text-white"
                  : "hover:bg-[#d4edda]"
              }`}
            >
              {kind.icon}
              <p
                className={`text-sm font-medium ${
                  selectedKind === kind.name ? "text-white" : "text-[#155724]"
                }`}
              >
                {kind.name}
              </p>
            </div>
          ))}
        </div>
        <hr className="my-4 border-[#a3cfae]" />
        <div className="space-y-2">
          {sideBarCategory.map((category) => (
            <div
              key={category.name}
              onClick={() =>
                setSelectedCategory(
                  category.name === selectedCategory ? null : category.name
                )
              }
              className={`h-12 flex items-center gap-3 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                selectedCategory === category.name
                  ? "bg-[#6b8e23] text-white"
                  : "hover:bg-[#d4edda]"
              }`}
            >
              {category.icon}
              <p
                className={`text-sm font-medium ${
                  selectedCategory === category.name
                    ? "text-white"
                    : "text-[#155724]"
                }`}
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="w-full lg:w-3/4 h-full rounded-lg p-4 sm:p-6">
        {!products.length ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-[#155724] text-center text-lg flex items-center gap-2">
              <FaLeaf /> No produce available from farmers yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="h-72 w-full bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden relative border border-[#a3cfae]"
              >
                <div className="h-[55%] w-full flex justify-center items-center p-3">
                  <img
                    src={product.itemImage || "https://via.placeholder.com/150"}
                    className="object-contain h-full w-full"
                    alt={product.itemName}
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-base sm:text-lg font-semibold text-[#155724] truncate">
                    {product.itemName}
                  </h3>
                  <p className="text-sm text-[#6b8e23]">
                    ₹{product.itemPrice} / {product.unit}
                  </p>
                  <p className="text-xs text-[#155724]/80 mt-1">
                    Farmer: {product.farmerName}
                  </p>
                  <p className="text-xs text-[#155724]/80">
                    Stock: {product.quantity} {product.unit}
                  </p>
                </div>
                <div
                  onClick={() => openModal(product)}
                  className="absolute bottom-2 right-2 p-2 bg-[#6b8e23] hover:bg-[#8ab644] rounded-full shadow-md"
                >
                  <BsCart4 className="text-white" size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBuyBlock;
