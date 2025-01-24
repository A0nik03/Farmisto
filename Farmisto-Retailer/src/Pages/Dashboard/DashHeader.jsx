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
      <div className="w-full h-[10vh] flex items-center justify-between border-b-2 mb-5 border-[#2A293E]">
        {/* Farmer's Name */}
        <div className="text-2xl font-bold pl-10 py-4">
          Welcome,{" "}
          <span className="text-[#405f27] capitalize">{userDetails?.name}</span>
          !
        </div>
        <div className="flex items-center gap-4 pr-4">
          <div className="h-10 sm:h-12 px-1 flex items-center gap-2 justify-center bg-[#7a9f35] text-white rounded-full">
            <Link
              to={"/Settings"}
              className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
            >
              <AiFillSetting size={23} className="sm:size-18 text-[#405f27]" />
            </Link>
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer">
              <AiFillBell
                size={23}
                className="sm:size-18 text-[#405f27]"
                onClick={() => setShowNotifications(!showNotifications)}
              />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {negotiations.length}
              </span>
            </div>
            {authToken ? (
              <div
                onClick={() => logout()}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
              >
                <BsFillDoorOpenFill
                  size={16}
                  className="sm:size-18"
                  color="#405f27"
                />
              </div>
            ) : (
              <Link
                to={"/register"}
                className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-white rounded-full hover:scale-110 transition-all duration-300 hover:cursor-pointer"
              >
                <FaUser size={16} className="sm:size-18 text-[#7a9f35]" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute top-[10vh] right-10 w-96 select-none z-50 rounded-lg border-1 border-[#2A293E] bg-[#6e912d] bg-opacity-90 shadow-lg overflow-y-auto scrollbar-none max-h-[70vh]">
          <h3 className="text-lg font-bold ml-4 mt-2 pb-2 text-[#2A293E]">
            Negotiations
          </h3>
          <ul className="flex flex-col">
            {negotiations.map((negotiation) => (
              <li
                key={negotiation.id}
                className="p-4 px-8 py-3 shadow-md border-b-[1px] border-[#2A293E] bg-[#f6eedb] bg-opacity-90"
              >
                {/* Requester Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={negotiation.requester.image}
                    alt={negotiation.requester.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-[#2A293E]">
                      {negotiation.requester.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {negotiation.requester.location}
                    </p>
                  </div>
                </div>

                {/* Negotiation Details */}
                <p className="text-sm text-gray-700 mb-3">
                  {negotiation.message}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600">
                    <AiOutlineCheck
                      size={20}
                      className="text-white"
                      title="Accept"
                    />
                  </div>
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600">
                    <AiOutlineClose
                      size={20}
                      className="text-white"
                      title="Decline"
                    />
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                    <AiOutlineMessage
                      size={20}
                      className="text-white"
                      title="Chat"
                    />
                  </div>
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
