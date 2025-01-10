import React, { useState } from "react";
import SideNav from "./sidenav";

const AddItem = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8; // Number of products displayed per page

  const productData = [
    { image: "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=", name: "Tomato", quantity: "20 Kg", rate: "500 Rs" },
    { image: "https://via.placeholder.com/50", name: "Potato", quantity: "30 Kg", rate: "750 Rs" },
    { image: "https://via.placeholder.com/50", name: "Carrot", quantity: "15 Kg", rate: "450 Rs" },
    { image: "https://via.placeholder.com/50", name: "Onion", quantity: "25 Kg", rate: "600 Rs" },
    { image: "https://via.placeholder.com/50", name: "Apple", quantity: "10 Kg", rate: "1000 Rs" },
    { image: "https://via.placeholder.com/50", name: "Banana", quantity: "12 Kg", rate: "400 Rs" },
    { image: "https://via.placeholder.com/50", name: "Grapes", quantity: "8 Kg", rate: "800 Rs" },
    { image: "https://via.placeholder.com/50", name: "Orange", quantity: "18 Kg", rate: "900 Rs" },
    { image: "https://via.placeholder.com/50", name: "Cucumber", quantity: "22 Kg", rate: "700 Rs" },
    { image: "https://via.placeholder.com/50", name: "Spinach", quantity: "5 Kg", rate: "300 Rs" },
  ];

  const totalPages = Math.ceil(productData.length / productsPerPage);

  // Get the products for the current page
  const currentProducts = productData.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav className="fixed h-full top-0 left-0 shadow-lg" />
      <div className="w-full h-screen p-6 overflow-y-auto">
        <h2 className="text-4xl font-serif mb-8">ADD-ITEM</h2>
        <div className="w-full h-[70%] flex gap-6">
          {/* File Upload Section */}
          <div className="w-[30%] h-full border-dashed border-2 border-black rounded-lg flex flex-col items-center justify-center">
            <div className="text-gray-600 mb-2">Drop files to upload</div>
            <div className="text-blue-600 underline cursor-pointer">or browse</div>
          </div>

          {/* Details Section */}
          <div className="w-[70%] h-full bg-yellow-100 px-6 pt-3 rounded-lg shadow-lg">
            <h2 className="text-3xl font-serif mb-4">Add Details</h2>
            <div className="mb-2">
              <label className="block text-xl font-medium mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Enter the product name"
                className="w-full p-2 border border-gray-400 rounded-md"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xl font-medium mb-2">Category</label>
              <select className="w-full p-2 border border-gray-400 rounded-md">
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Pulses</option>
                <option>Dry Fruits</option>
              </select>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <label className="block text-xl font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  placeholder="Enter quantity"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xl font-medium mb-2">Unit</label>
                <select className="w-full p-2 border border-gray-400 rounded-md">
                  <option>/Kilogram</option>
                  <option>/Gram</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-xl font-medium mb-2">Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full p-2 border border-gray-400 rounded-md"
                />
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col h-[110px] rounded-md">
              <label className="text-xl font-medium mb-2">Description</label>
              <textarea
                rows="5"
                placeholder="Enter a description of the product"
                className="w-full h-full resize-none overflow-y-auto p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Buttons */}
            <div className="flex gap-4">
              <button className="w-24 h-8 bg-green-500 text-white rounded-md mt-4">
                Add Item
              </button>
              <button className="w-24 h-8 bg-red-600 text-white rounded-md mt-4">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-6">
          <h2 className="text-3xl font-serif mb-4">Product List</h2>
          <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr>
                {["Image", "Product Name", "Total Quantity", "Total Rate"].map(
                  (header, index) => (
                    <th
                      key={index}
                      className="px-4 py-2 text-lg font-medium text-black border-b"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => (
                <tr key={index} className="odd:bg-zinc-100">
                  <td className="px-4 py-2 border-b">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border-b">{product.name}</td>
                  <td className="px-4 py-2 border-b">{product.quantity}</td>
                  <td className="px-4 py-2 border-b">{product.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;



