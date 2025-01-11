import React, { useState } from "react";
import SideNav from "./sidenav";
import { useRef } from "react";
import axios from "axios";
import { useAuth } from "../utils/Auth";
import { useEffect } from "react";

const AddItem = () => {
  const { authToken } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemName = useRef();
  const itemPrice = useRef();
  const itemCategory = useRef();
  const itemQuantity = useRef();
  const itemType = useRef();
  const itemUnit = useRef();
  const perPrice = useRef();
  const [productData, setProductData] = useState([]);
  const [image, setImage] = useState(null);

  const productsPerPage = 8;

  // const totalPages = Math.ceil(productData.length / productsPerPage);
  // const currentProducts = productData.slice(
  //   (currentPage - 1) * productsPerPage,
  //   currentPage * productsPerPage
  // );

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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("itemName", itemName.current.value);
    formData.append("itemPrice", itemPrice.current.value);
    formData.append("itemCategory", itemCategory.current.value);
    formData.append("quantity", itemQuantity.current.value);
    formData.append("itemType", itemType.current.value);
    formData.append("unit", itemUnit.current.value);
    formData.append("itemValue", perPrice.current.value);
    formData.append("itemImage", image);

    try {
      const response = await axios.post(
        `${"http://localhost:4000"}/market/add-item`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Item added successfully!");
      console.log("Response: ", response.data);
    } catch (error) {
      alert("Failed to add item. Please try again.");
      console.error("Failed to add item: ", error);
    }
  };

  const GetAllItems = async () => {
    try {
      const response = await axios.get(
        `${"http://localhost:4000"}/market/get-items`
      );
      console.log("Response: ", response.data);
      setProductData(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items: ", error);
    }
  };

  useEffect(() => {
    GetAllItems();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="h-full w-full flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center bg-white shadow-sm mb-3 p-5">
          <h1 className="text-3xl font-bold text-gray-800">Add New Item</h1>
        </header>
        <div className="w-full h-full  p-6">
          <div className="w-full bg-white rounded-xl overflow-hidden flex gap-5">
          <div className="w-1/3 p-5 bg-green-300 rounded-xl overflow-hidden">
          <label htmlFor="image">
              <div
                className="h-full w-full rounded-xl overflow-hidden shadow-xl flex items-center justify-center"
                style={{
                  backgroundImage: image
                    ? `url(${URL.createObjectURL(image)})`
                    : "none",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {!image && <div className="h-full w-full rounded-xl">
                  <img src="https://cdn.dribbble.com/users/252114/screenshots/2618219/media/e0c7a8d4fa9d769eeb976e48508323e5.jpg?resize=800x600&vertical=center" className="h-full w-full object-cover" alt=""/>
                </div>}
              </div>
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
            {/* Details Section */}
            <div className="w-2/3 bg-white p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Product Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-3 border border-gray-300 rounded-full"
                    ref={itemName}
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    className="w-full p-3 mt-3 border border-gray-300 rounded-full"
                    ref={itemType}
                  />
                </div>
                <div>
                  <select
                    ref={itemCategory}
                    className="w-full p-3 border border-gray-300 rounded-full"
                  >
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
                    ref={itemQuantity}
                  />
                  <input
                    type="number"
                    placeholder="Per Quantity"
                    className="p-3 border border-gray-300 rounded-full"
                    ref={perPrice}
                  />
                  <select
                    ref={itemUnit}
                    className="p-3 border border-gray-300 rounded-full"
                  >
                    <option>kg</option>
                    <option>g</option>
                    <option>l</option>
                    <option>ml</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Price"
                    className="p-3 border border-gray-300 rounded-full"
                    ref={itemPrice}
                  />
                </div>

                <div className="flex gap-4">
                  <button className="w-32 bg-[#03C9A9] text-white rounded-full">
                    Add Item
                  </button>
                  <button className="w-32 bg-red-500 text-white rounded-full">
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
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
                {productData.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">
                      <img
                        src={product.itemImage}
                        alt={product.itemName}
                        className="w-16 h-16 rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4 border-b">{product.itemName}</td>
                    <td className="px-6 py-4 border-b">{product.quantity}</td>
                    <td className="px-6 py-4 border-b">{product.itemPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="flex justify-between mt-6">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
