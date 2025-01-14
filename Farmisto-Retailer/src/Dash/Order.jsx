import React, { useEffect, useState } from "react";
import SideNav from "./sidenav";
import axios from "axios";
import { useAuth } from "../utils/Auth";
import moment from "moment";


const Order = () => {
  const { authToken} = useAuth();
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/payments/farmer-get-payment",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setAllOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [authToken]);


  return (
    <div className="flex h-screen bg-[#f7f3e9]">
      <SideNav />
      {/* Main Content */}
      <div className="w-full h-screen p-6 overflow-y-auto font-[Fjalla One]">
        <h2 className="text-3xl text-nowrap w-28 ml-5 font-bold border-b-4 p-2 border-[#70942e] text-[#2A293E] mb-8 font-[Fjalla One]">
          Orders
        </h2>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {["All Orders", "Drafts", "Shipping", "Completed", "Canceled"].map(
              (tab, index) => (
                <button
                  key={index}
                  className="px-4 py-2 text-sm font-medium border-b-2 border-transparent bg-transparent hover:border-[#70942e]"
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <div className="px-4 py-2 text-white bg-[#70942e] rounded outline-none hover:bg-[#65822d] cursor-pointer">
            Download as CSV
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border outline-none rounded shadow-sm"
          />
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-[#2A293E] border border-black rounded">
              Filter
            </button>
            <button className="px-4 py-2 text-[#2A293E] border-black rounded">
              01 Dec - 16 Dec
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          {allOrders.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border-b hover:bg-[#f4ead2] cursor-pointer transition ease-linear duration-300"
            >
              <div className="flex flex-col w-1/6">
                <span className="font-medium">Order-{index}</span>
                <span className="text-sm text-[#2A293E]">#{item._id}</span>
              </div>
              <div className="w-1/6">{moment(item.createdAt).format("MMMM D, YYYY")}</div>
              <div className="w-1/6">{item.buyer.name}</div>
              <div className="w-1/6">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    item.paymentMethod === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.paymentMethod}
                </span>
              </div>
              <div className="w-1/6">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    item.paymentStatus === "Shipping"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.paymentStatus}
                </span>
              </div>
              <div className="w-1/6">{item.totalAmount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
