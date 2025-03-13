import React, { useState } from "react";
import {
  AiFillBell,
  AiFillSetting,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineMessage,
} from "react-icons/ai";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/Auth";

const DashHeader = () => {
  const { authToken, userDetails, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const negotiations = [
    {
      id: 1,
      requester: {
        name: "John Doe",
        location: "New York, USA",
        image: "https://via.placeholder.com/40",
      },
      message: "Negotiation started for Product A",
      status: "Pending",
    },
    {
      id: 2,
      requester: {
        name: "Jane Smith",
        location: "London, UK",
        image: "https://via.placeholder.com/40",
      },
      message: "Offer received for Product B",
      status: "In Progress",
    },
    {
      id: 3,
      requester: {
        name: "Alice Johnson",
        location: "Sydney, Australia",
        image: "https://via.placeholder.com/40",
      },
      message: "Counteroffer sent for Product C",
      status: "Awaiting Response",
    },
    {
      id: 4,
      requester: {
        name: "Bob Brown",
        location: "Toronto, Canada",
        image: "https://via.placeholder.com/40",
      },
      message: "Negotiation closed for Product D",
      status: "Completed",
    },
  ];

  return (
    <>
      <div className="w-full h-[10vh] relative flex items-center justify-between px-4 sm:px-10 border-b-2 mb-5 border-[#2A293E]">
        <div className="hidden sm:block text-xl sm:text-2xl font-bold py-2">
          Welcome,{" "}
          <span className="text-[#405f27] capitalize">
            {userDetails?.name || "Guest"}
          </span>
          !
        </div>
        <div className="absolute right-5 sm:block  flex items-center gap-3 sm:gap-4">
          <div className="h-10 sm:h-12 px-1 flex items-center gap-2 justify-center bg-[#7a9f35] text-white rounded-full">
            <Link
              to={"/Settings"}
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300"
            >
              <AiFillSetting size={20} className="text-[#405f27]" />
            </Link>
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300">
              <AiFillBell
                size={20}
                className="text-[#405f27]"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {negotiations.length}
              </span>
            </div>
            {authToken ? (
              <div
                onClick={() => logout()}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300"
              >
                <BsFillDoorOpenFill size={16} className="text-[#405f27]" />
              </div>
            ) : (
              <Link
                to={"/register"}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300"
              >
                <FaUser size={16} className="text-[#7a9f35]" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="absolute top-[10vh] right-5 sm:right-10 sm:w-80 w-[90%] z-50 rounded-lg border border-[#2A293E] bg-[#6e912d] bg-opacity-90 shadow-lg overflow-y-auto scrollbar-none max-h-[70vh]">
          <h3 className="text-lg font-bold ml-4 mt-2 pb-2 text-[#2A293E]">
            Negotiations
          </h3>
          <ul className="flex flex-col">
            {negotiations.map((negotiation) => (
              <li
                key={negotiation.id}
                className="p-4 px-8 py-3 shadow-md border-b border-[#2A293E] bg-[#f6eedb] bg-opacity-90"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={negotiation.requester.image}
                    alt={negotiation.requester.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-[#2A293E] truncate">
                      {negotiation.requester.name}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {negotiation.requester.location}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3 truncate">
                  {negotiation.message}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    aria-label="Accept"
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600"
                    onClick={() => console.log("Accepted", negotiation.id)}
                  >
                    <AiOutlineCheck size={20} className="text-white" />
                  </button>
                  <button
                    aria-label="Decline"
                    className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                    onClick={() => console.log("Declined", negotiation.id)}
                  >
                    <AiOutlineClose size={20} className="text-white" />
                  </button>
                  <button
                    aria-label="Chat"
                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600"
                    onClick={() => console.log("Chat", negotiation.id)}
                  >
                    <AiOutlineMessage size={20} className="text-white" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DashHeader;
