import React, { useState } from "react";
import SideNav from "./sidenav";

const Order = () => {
  const ordersPerPage = 8; // Number of orders per page
  const allOrders = [
    {
      order: "Tamato",
      id: "#ID238976",
      date: "Apr 24, 2022",
      customer: "Chieko Chute",
      payment: "Paid",
      status: "Unfulfilled",
      price: "500rs",
    },
    {
      order: "Potato",
      id: "#ID264923",
      date: "May 10, 2022",
      customer: "Jacob Jones",
      payment: "Unpaid",
      status: "Unfulfilled",
      price: "300rs",
    },
    {
      order: "Potato",
      id: "#ID264923",
      date: "May 10, 2022",
      customer: "Jacob Jones",
      payment: "Unpaid",
      status: "Unfulfilled",
      price: "300rs",
    },
    {
      order: "Potato",
      id: "#ID264923",
      date: "May 10, 2022",
      customer: "Jacob Jones",
      payment: "Unpaid",
      status: "Unfulfilled",
      price: "300rs",
    }
  ];

  const currentOrders = allOrders;

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
          {currentOrders.map((item, index) => (
            <div
              key={index}
              className="flex justify-between p-4 border-b hover:bg-[#f5f0e3] cursor-pointer"
            >
              <div className="flex flex-col w-1/6">
                <span className="font-medium">{item.order}</span>
                <span className="text-sm text-[#2A293E]">{item.id}</span>
              </div>
              <div className="w-1/6">{item.date}</div>
              <div className="w-1/6">{item.customer}</div>
              <div className="w-1/6">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    item.payment === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.payment}
                </span>
              </div>
              <div className="w-1/6">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    item.status === "Shipping"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="w-1/6">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
