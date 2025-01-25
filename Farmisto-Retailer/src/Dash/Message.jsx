import React, { useState } from "react";
import SideNav from "./sidenav";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const Message = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      mobile: "1-770-736-8031 x56442",
      city: "Gwenborough",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/75.jpg",
      message: "Hello, how are you doing today?",
    },
    {
      id: 2,
      name: "Ervin Howell",
      mobile: "010-692-6593 x09125",
      city: "Wisokyburgh",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/78.jpg",
      message: "Can you send me the report by 3 PM?",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      mobile: "1-463-123-4447",
      city: "McKenziehaven",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/79.jpg",
      message: "I need help with the new project. Can we talk?",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      mobile: "493-170-9623 x156",
      city: "South Elvis",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/77.jpg",
      message: "Don't forget about the meeting at 2 PM!",
    },
    {
      id: 5,
      name: "Sam Whisley",
      mobile: "(254)954-1289",
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/80.jpg",
      message: "Let's catch up soon, it's been a while!",
    },
    {
      id: 6,
      name: "Emily Smith",
      mobile: "(254)954-1289",
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      profileImage: "https://randomuser.me/api/portraits/med/women/81.jpg",
      message: "Let's catch up soon, it's been a while!",
    },
    {
      id: 7,
      name: "Tanya Boswolth",
      mobile: "(254)954-1289",
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      profileImage: "https://randomuser.me/api/portraits/med/women/90.jpg",
      message: "Let's catch up soon, it's been a while!",
    },
    {
      id: 8,
      name: "Jack Molter",
      mobile: "(254)954-1289",
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      profileImage: "https://randomuser.me/api/portraits/med/men/92.jpg",
      message: "Let's catch up soon, it's been a while!",
    },
    {
      id: 9,
      name: "Eliza Molter",
      mobile: "(254)954-1289",
      city: "Roscoeview",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
      profileImage: "https://randomuser.me/api/portraits/med/women/24.jpg",
      message: "Let's catch up soon, it's been a while!",
    },
  ]);

  return (
    <div className="flex h-screen bg-[#f7f3e9]">
      <SideNav />
      <div className="w-full h-screen bg-[#f7f3e9] p-6 overflow-y-auto">
        <h2 className="text-4xl mb-8 text-[#2A293E]">Messages</h2>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#2A293E]">
              {messages.length} Messages
            </h3>
            <input
              type="text"
              placeholder="Search by Name"
              className="p-2 border border-[#d9d4b7] rounded-md"
            />
          </div>

          <div className="flex flex-col overflow-y-auto scrollbar-none">
            {messages.map((message) => (
              <div
                key={message.id}
                className="relative flex items-center justify-between cursor-pointer p-4 border-b hover:bg-[#f5f0e3] select-none transition"
              >
                <div className="flex items-center cursor-pointer">
                  <div className="h-14 w-14 rounded-lg overflow-hidden">
                    <img
                      src={message.profileImage}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ml-6">
                    <span className="text-[#2A293E] text-[1.1rem] font-semibold">
                      {message.name}
                    </span>
                    <span className="text-[#2A293E] text-[1rem]">
                      {message.message}
                    </span>
                  </div>
                  <span className="absolute right-10 text-[#2A293E] text-md font-medium">45+</span>
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
