import React, { useState } from "react";
import { BsCart4, BsChevronDown } from "react-icons/bs";

const MobileBuyBlock = ({ products, openModal, sideBarKinds, sideBarCategory, setSelectedKind, setSelectedCategory, selectedKind, selectedCategory }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allOptions = [
    ...sideBarKinds.map(kind => ({ ...kind, type: "kind" })),
    ...sideBarCategory.map(category => ({ ...category, type: "category" })),
  ];

  const handleSelection = (option) => {
    if (option.type === "kind") {
      setSelectedKind(option.name);
    } else {
      setSelectedCategory(option.name);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full min-h-screen p-2 rounded-lg bg-gradient-to-b from-green-50 to-white">
      <div className="relative mb-4">
        <div
          className="w-full h-12 bg-green-100 rounded-xl flex items-center justify-between px-4 shadow-md cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <p className="text-md font-semibold text-green-900">
            {selectedKind || selectedCategory || "Categories"}
          </p>
          <BsChevronDown className={`text-green-800 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} size={20} />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-14 left-0 w-full max-h-64 bg-white overflow-y-scroll rounded-2xl shadow-lg z-10">
            {allOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelection(option)}
                className={`h-12 w-full flex items-center px-4 hover:bg-green-100 cursor-pointer ${
                  (option.type === "kind" && selectedKind === option.name) ||
                  (option.type === "category" && selectedCategory === option.name)
                    ? "bg-green-200"
                    : ""
                }`}
              >
                <div className="text-lg text-green-800 mr-2">{option.icon}</div>
                <p className="text-sm font-medium text-green-900">{option.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="w-full">
        {!products.length ? (
          <div className="flex justify-center items-center h-64">
            <img
              src="https://www.breathearomatherapy.com/assets/images/global/no-product.png"
              alt="No Products"
              className="w-full max-w-[200px] h-auto object-contain"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="h-44 w-full bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-300 cursor-pointer overflow-hidden relative transition-all duration-300"
              >
                <div className="h-[60%] w-full flex justify-center items-center p-2">
                  <img
                    src={product.itemImage}
                    className="object-contain h-full w-full"
                    alt={product.itemName}
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-green-900 truncate">
                    {product.itemName}
                  </h3>
                  <span className="text-xs font-medium text-green-800">
                    Rs {product.itemPrice}/{product.itemUnit.unit}
                  </span>
                </div>
                <div
                  onClick={() => openModal(product)}
                  className="absolute bottom-1 right-1 p-1.5 bg-green-500 hover:bg-green-600 rounded-full shadow-md"
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

export default MobileBuyBlock;