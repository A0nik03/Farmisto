import React, { useState } from "react";
import SideNav from "./sidenav";

const AddItem = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  const productData = [
    {
      image:
        "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=",
      name: "Tomato",
      quantity: "20 Kg",
      rate: "500 Rs",
    },
    {
      image:
        "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=",
      name: "Tomato",
      quantity: "20 Kg",
      rate: "500 Rs",
    },
    {
      image:
        "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=",
      name: "Tomato",
      quantity: "20 Kg",
      rate: "500 Rs",
    },
    {
      image:
        "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=",
      name: "Tomato",
      quantity: "20 Kg",
      rate: "500 Rs",
    },
    {
      image:
        "https://media.istockphoto.com/id/174075608/photo/potatoes.jpg?s=612x612&w=0&k=20&c=3LcXA2-2qu9vFOagRZJ_WrXcUUllHyc8mDFJlvyaKiw=",
      name: "Tomato",
      quantity: "20 Kg",
      rate: "500 Rs",
    },
    // Additional sample data...
  ];

  const totalPages = Math.ceil(productData.length / productsPerPage);
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
      <SideNav />
      <div className="h-full w-full flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center bg-white shadow-sm mb-3 p-5">
          <h1 className="text-3xl font-bold text-gray-800">Add New Item</h1>
        </header>
        <div className="w-full h-full  p-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* File Upload Section */}
            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-md flex flex-col items-center justify-center">
              <p className="text-gray-500 mb-2">Drop files to upload</p>
              <button className="bg-[#03C9A9] text-white px-4 py-2 rounded-full">
                Browse
              </button>
            </div>

            {/* Details Section */}
            <div className="col-span-2 bg-white p-8 rounded-3xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Product Details
              </h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-3 border border-gray-300 rounded-full"
                  />
                </div>
                <div>
                  <select className="w-full p-3 border border-gray-300 rounded-full">
                    <option>Category</option>
                    <option>Vegetables</option>
                    <option>Fruits</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="p-3 border border-gray-300 rounded-full"
                  />
                  <select className="p-3 border border-gray-300 rounded-full">
                    <option>/Kg</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    className="p-3 border border-gray-300 rounded-full"
                  />
                </div>
                <textarea
                  rows="4"
                  placeholder="Description"
                  className="w-full p-3 border border-gray-300 rounded-3xl"
                />
                <div className="flex gap-4">
                  <button className="w-32 bg-[#03C9A9] text-white rounded-full">
                    Add Item
                  </button>
                  <button className="w-32 bg-red-500 text-white rounded-full">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="mt-10 bg-white p-8 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Product List
            </h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-lg font-semibold text-gray-700 border-b">
                    Image
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-gray-700 border-b">
                    Name
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-gray-700 border-b">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-lg font-semibold text-gray-700 border-b">
                    Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 border-b">{product.name}</td>
                    <td className="px-6 py-4 border-b">{product.quantity}</td>
                    <td className="px-6 py-4 border-b">{product.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePreviousPage}
                className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-full ${
                  currentPage === 1 ? "opacity-50" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className={`px-4 py-2 bg-[#03C9A9] text-white rounded-full ${
                  currentPage === totalPages ? "opacity-50" : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
