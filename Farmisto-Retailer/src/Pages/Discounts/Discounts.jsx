import React, { useEffect, useState } from "react";
import moment from "moment";
import { Stack, Pagination } from "@mui/material";
import SideNav from "../../Dash/sidenav";
import { useAuth } from "../../utils/Auth";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai"; // Importing delete icon
import { MdDelete } from "react-icons/md";

const Discounts = () => {
  const { authToken } = useAuth();
  const [listPromos, setListPromos] = useState([]);
  const [productData, setProductData] = useState([]);
  const [activeTab, setActiveTab] = useState("All Discounts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch promo codes
  const GetPromos = async (authToken) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/promo/list-promos",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setListPromos(response.data.promoCodes);
    } catch (error) {
      console.error("Failed to fetch promos: ", error);
    }
  };

  // Fetch product data
  const getAllItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/market/get-items-farmer",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProductData(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items: ", error);
    }
  };

  // Get product details by item ID
  const getProductDetails = (itemId) => {
    if (!productData || productData.length === 0) {
      return null;
    }
    return productData.find((product) => product?._id === itemId);
  };

  // Filter promos by search query (promo code)
  const filteredPromos = listPromos.filter((promo) =>
    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastPromo = currentPage * itemsPerPage;
  const indexOfFirstPromo = indexOfLastPromo - itemsPerPage;
  const currentPromos = filteredPromos.slice(
    indexOfFirstPromo,
    indexOfLastPromo
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle delete discount
  const handleDeleteDiscount = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:4000/promo/del-promo/" + id,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Deleted successfully", response.data);
        GetPromos(authToken);
        getAllItems();
        setListPromos(listPromos.filter((promo) => promo._id !== id));
      }
    } catch (error) {}
  };

  useEffect(() => {
    GetPromos(authToken);
    getAllItems();
  }, [authToken]);

  return (
    <div className="relative flex h-screen bg-[#f7f3e9]">
      <SideNav />
      <div className="w-full h-screen p-2 overflow-y-auto font-[Fjalla One]">
        {/* Heading */}
        <h2 className="text-3xl w-full ml-5 font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-5">
          Discounts
        </h2>

        {/* Tab Navigation */}
        <div className="flex space-x-6 mb-4">
          {["All Discounts", "Expired Discounts", "Active Discounts"].map(
            (tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === tab ? "border-[#70942e]" : "border-transparent"
                } bg-transparent hover:border-[#70942e]`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Search Input */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by promo code..."
            className="px-4 py-2 border outline-none rounded shadow-sm"
          />
        </div>

        {/* Promo List */}
        <div className="flex flex-col space-y-6">
          {currentPromos.map((discount, index) => {
            const product = getProductDetails(discount.item);
            if (!product) return null;

            const discountedPrice = (
              (product.itemPrice * (100 - discount.discountPercentage)) /
              100
            ).toFixed(2);

            return (
              <div
                key={index}
                className="flex justify-between p-4 border-b hover:bg-[#f4ead2] cursor-pointer transition ease-linear duration-300"
              >
                {/* Image */}
                <div
                  className="w-20 h-20 bg-cover bg-center rounded-full mx-4"
                  style={{ backgroundImage: `url(${product.itemImage})` }}
                ></div>

                {/* Content Columns */}
                <div className="flex flex-col justify-center flex-1 pl-5 space-y-2">
                  <span className="font-medium text-lg tracking-wide">
                    {product.itemName}
                  </span>
                  <span className="text-sm text-[#2A293E]">
                    #{discount._id}
                  </span>
                  <span className="text-sm text-[#2A293E]">
                    Code:{" "}
                    <span className="text-[#70942e] font-semibold">
                      {discount.code}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col justify-center flex-1 ml-10 space-y-2">
                  <div className="text-sm text-[#2A293E]">
                    Issued: {moment(discount.createdAt).format("MMMM D, YYYY")}
                  </div>
                  <div className="text-sm text-[#2A293E]">
                    Expires:{" "}
                    {moment(discount.expiryDate).format("MMMM D, YYYY")}
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1 space-y-2">
                  <div className="text-sm text-[#ff6347] font-semibold">
                    Original Price:{" "}
                    <span className="line-through">{product.itemPrice} ₹</span>
                  </div>
                  <div className="text-md text-[#70942e] font-bold">
                    Discounted Price: {discountedPrice} ₹
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1 space-y-2">
                  <div className="text-sm text-[#2A293E]">
                    Uses Left:{" "}
                    <span className="text-[#ff6347]">
                      {discount.usageLimit - discount.usedCount}
                    </span>
                  </div>
                </div>

                <div className="h-12 w-12 rounded-full flex justify-center items-center">
                  <div
                    onClick={() => handleDeleteDiscount(discount._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    <MdDelete size={20} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 absolute bottom-10 left-[50%]">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredPromos.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
