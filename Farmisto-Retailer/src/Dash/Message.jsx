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
    <div className="flex h-screen bg-[#f7f3e9]">
      <SideNav />
      <div className="w-full h-screen bg-[#f7f3e9] p-6 overflow-y-auto">
        <h2 className="text-4xl mb-8 text-[#2A293E]">Notifications</h2>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#2A293E]">188 Notifications</h3>
            <input
              type="text"
              placeholder="Search by Name Product"
              className="p-2 border border-[#d9d4b7] rounded-md"
            />
          </div>

          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between p-4 border-b hover:bg-[#f5f0e3] transition"
              >
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div onClick={() => toggleFavorite(notification.id)}>
                    {notification.isFavorite ? (
                      <span className="text-yellow-500 text-3xl">★</span>
                    ) : (
                      <span className="text-gray-400 text-3xl">☆</span>
                    )}
                  </div>
                  <span className="text-[#2A293E]">{notification.text}</span>
                </div>
                <div className="flex items-center space-x-4 cursor-pointer">
                  <span className="text-[#6c6c6c]">{notification.time}</span>
                  <div
                    onClick={() => deleteNotification(notification.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
