import React, { useState } from 'react';
import SideNav from './sidenav';

const Order = () => {
  const ordersPerPage = 8; // Number of orders per page
  const allOrders = [
    // Example orders
    { order: 'Tamato', id: '#ID238976', date: 'Apr 24, 2022', customer: 'Chieko Chute', payment: 'Paid', status: 'Unfulfilled', price: '500rs' },
    { order: 'Potato', id: '#ID264923', date: 'May 10, 2022', customer: 'Jacob Jones', payment: 'Unpaid', status: 'Unfulfilled', price: '300rs' },
    { order: 'Potato', id: '#ID264923', date: 'May 10, 2022', customer: 'Jacob Jones', payment: 'Unpaid', status: 'Unfulfilled', price: '300rs' },
    { order: 'Potato', id: '#ID264923', date: 'May 10, 2022', customer: 'Jacob Jones', payment: 'Unpaid', status: 'Unfulfilled', price: '300rs' },
    { order: 'Potato', id: '#ID264923', date: 'May 10, 2022', customer: 'Jacob Jones', payment: 'Unpaid', status: 'Unfulfilled', price: '300rs' },
    { order: 'Potato', id: '#ID264923', date: 'May 10, 2022', customer: 'Jacob Jones', payment: 'Unpaid', status: 'Unfulfilled', price: '300rs' },

    // Add more orders here as needed
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  // Get current page orders
  const currentOrders = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Handle page change
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex h-screen bg-gray-300">
        <SideNav />
      {/* Main Content */}
        <div className="w-full h-screen bg-white p-6 overflow-y-auto">
        <h2 className="text-4xl font-serif mb-8">ORDERS</h2>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            {['All Orders', 'Drafts', 'Shipping', 'Completed', 'Canceled'].map((tab, index) => (
              <button
                key={index}
                className="px-4 py-2 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-500 hover:text-blue-500"
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">
            Download as CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100">
              Filter
            </button>
            <button className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100">
              01 Dec - 16 Dec
            </button>
          </div>
        </div>

        {/* Order Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              {['Orders', 'Date', 'Customer', 'Payment', 'Status', 'Price'].map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-sm font-medium text-gray-600 border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">
                  <div>{item.order}</div>
                  <div className="text-sm text-gray-500">{item.id}</div>
                </td>
                <td className="px-4 py-2 border-b">{item.date}</td>
                <td className="px-4 py-2 border-b">{item.customer}</td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      item.payment === 'Paid'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {item.payment}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      item.status === 'Shipping'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => changePage(currentPage - 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-600'
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-white text-gray-600'
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

