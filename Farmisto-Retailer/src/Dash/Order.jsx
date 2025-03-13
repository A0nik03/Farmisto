import React, { useEffect, useState } from "react";
import SideNav from "./sidenav";
import axios from "axios";
import { useAuth } from "../utils/Auth";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Footer from "../Components/Footer/Footer";

const Order = () => {
  const { authToken } = useAuth();
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderIndex, setOrderIndex] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/payments/farmer-get-payment",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200 && Array.isArray(response.data.payments)) {
          setAllOrders(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [authToken]);

  useEffect(() => {
    filterOrders();
  }, [activeTab, searchQuery, dateRange, allOrders]);

  const SetOrderStatus = async (id, value) => {
    try {
      const data = { field: "orderStatus", value: value, id: id };
      const response = await axios.patch(
        `http://localhost:4000/payments/farmer-update-payment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const updatedOrders = allOrders.map((order) =>
          order._id === id ? { ...order, orderStatus: value } : order
        );
        setAllOrders(updatedOrders);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filterOrders = () => {
    let filtered = allOrders;

    if (activeTab !== "All Orders") {
      filtered = filtered.filter((order) => order.orderStatus === activeTab);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order._id.includes(searchQuery) ||
          order.buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter((order) => {
        const orderDate = moment(order.createdAt);
        return orderDate.isBetween(dateRange[0], dateRange[1], null, "[]");
      });
    }

    setFilteredOrders(filtered);
  };

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedOrders = filteredOrders.slice(start, end);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#f7f3e9] md:flex-row">
      <SideNav className="hidden md:block md:w-1/4 lg:w-1/5" />
      <div className="w-full h-screen p-2 md:p-4 overflow-y-auto font-[Fjalla One]">
        <h2 className="text-2xl md:text-3xl w-32 flex items-center mt-10 md:ml-5 font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-4 md:mb-6">
          Orders
        </h2>

        {/* Header */}
        <div className="flex flex-col space-y-2 md:flex-row md:flex-wrap md:justify-between md:items-center mb-4 px-2 md:px-4">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {[
              "All Orders",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
            ].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-1 md:px-4 md:py-2 text-sm font-medium border-b-2 ${
                  activeTab === tab ? "border-[#70942e]" : "border-transparent"
                } bg-transparent hover:border-[#70942e] whitespace-nowrap`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-4 px-2 md:px-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 md:px-4 md:py-2 border outline-none rounded shadow-sm w-full max-w-md text-sm"
          />
          <div
            onClick={() =>
              setDateRange([moment("2025-01-01"), moment("2025-01-30")])
            }
            className="px-2 py-1 md:px-4 md:py-2 text-white bg-[#70942e] text-sm font-medium cursor-pointer rounded w-full max-w-[200px] text-center"
          >
            01 Jan - 30 Jan
          </div>
        </div>

        {/* Orders */}
        <div className="flex flex-col px-2 md:px-4 overflow-x-auto">
          <div className="min-w-[768px]">
            {displayedOrders.map((item, index) => (
              <div
                key={index}
                onMouseLeave={() => setOrderIndex(null)}
                className="flex justify-between items-center p-2 md:p-3 border-b hover:bg-[#f4ead2] cursor-pointer transition ease-linear duration-300"
              >
                <div className="flex flex-col justify-center w-[15%] min-w-[80px]">
                  <span className="font-medium text-sm">Order-{index + 1}</span>
                  <span className="text-xs text-[#2A293E] truncate">
                    #{item._id}
                  </span>
                </div>
                <div className="w-[20%] min-w-[100px] text-sm truncate">
                  {moment(item.createdAt).format("MMM D, YYYY")}
                </div>
                <div className="w-[15%] min-w-[80px] text-sm truncate">
                  {item.buyer.name}
                </div>
                <div className="w-[15%] min-w-[80px]">
                  <span
                    className={`px-1 py-0.5 md:px-2 md:py-1 text-xs font-medium rounded ${
                      item.paymentMethod === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.paymentMethod}
                  </span>
                </div>
                <div className="w-[20%] min-w-[100px] relative select-none">
                  <span
                    onClick={() => setOrderIndex(index)}
                    className={`px-1 py-0.5 md:px-2 md:py-1 text-xs font-medium cursor-pointer hover:scale-[1.02] rounded ${
                      item.paymentStatus === "Shipping"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    <span>{item.orderStatus}</span>
                    {index === orderIndex && (
                      <span className="absolute flex flex-col md:flex-row gap-1 top-6 md:top-8 left-0 md:-left-28 py-1 px-2 text-xs font-medium transition-all ease-linear duration-200 z-10 bg-white shadow-md">
                        {[
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status, i) => (
                          <p key={i}>
                            <span
                              onClick={() => SetOrderStatus(item._id, status)}
                              className="hover:text-green-800 font-medium rounded-sm py-0.5 px-1 md:py-1 md:px-2 text-center transition ease-linear duration-300 whitespace-nowrap"
                            >
                              {status}
                            </span>
                          </p>
                        ))}
                      </span>
                    )}
                  </span>
                </div>
                <div className="w-[15%] min-w-[80px] text-sm truncate">
                  {item.totalAmount}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Stack
          spacing={2}
          className="w-full md:w-60 mt-6 pb-4 md:absolute md:bottom-5 md:left-[50%] md:translate-x-[-50%]"
        >
          <Pagination
            count={Math.ceil(filteredOrders.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            className="flex justify-center"
          />
        </Stack>
      </div>
    </div>
  );
};

export default Order;
