import React, { useState } from 'react';
import SideNav from './sidenav';

const Message = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "We're pleased to inform you that a new customer has registered! Please follow up promptly by contacting.", time: "Just Now", isFavorite: false },
    { id: 2, text: "Hello Sales Marketing Team, We have a special offer for our customers! Enjoy a 20% discount on selected...", time: "30 minutes ago", isFavorite: true },
    { id: 3, text: "Hello Sales Marketing Team, This is a reminder to achieve this month's sales target. Currently, we've...", time: "2 days ago", isFavorite: false },
    { id: 4, text: "Hello Sales Marketing Team, We've received a product information request from a potential customer.", time: "5 days ago", isFavorite: false },
    { id: 5, text: "Hello Sales Marketing Team, A meeting or presentation has been scheduled with a customer/prospect.", time: "07 Feb, 2024", isFavorite: true },
    { id: 6, text: "Hello Sales Marketing Team, This is a reminder regarding an outstanding payment from a customer...", time: "28 Jan, 2024", isFavorite: false },
  ]);

  const toggleFavorite = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isFavorite: !notification.isFavorite }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="flex h-screen bg-gray-300">
      <SideNav />
      <div className="w-full h-screen bg-gray-300 p-6 overflow-y-auto">
        <h2 className="text-4xl font-serif mb-8">List Notification</h2>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">188 Notifications</h3>
            <input
              type="text"
              placeholder="Search by Name Product"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <table className="w-full">
            <tbody>
              {notifications.map((notification) => (
                <tr
                  key={notification.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3">
                    <button onClick={() => toggleFavorite(notification.id)}>
                      {notification.isFavorite ? (
                        <span className="text-yellow-500">★</span>
                      ) : (
                        <span className="text-gray-400">☆</span>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-800">{notification.text}</td>
                  <td className="px-4 py-3 text-gray-600">{notification.time}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Message;

