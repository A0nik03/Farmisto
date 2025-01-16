import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { useAuth } from "../utils/Auth";
import axios from "axios";
import {
  AiOutlineBell,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineMessage,
} from "react-icons/ai";
import {
  IoPerson,
  IoLeafOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoBagCheckOutline,
} from "react-icons/io5";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import moment from "moment";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { PuffLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { authToken, userDetails } = useAuth();
  const [salesView, setSalesView] = useState("Weekly");
  const [showNotifications, setShowNotifications] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [location, setLocation] = useState(null);

  const GetLocation = async() => {
    try {
      const response = await axios.get("http://localhost:4000/farmer/location",{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        setLocation(response.data.farmerLocation);
      } else {
        console.log("Failed to get location.");
      }
    } catch (error) {
      console.error("Error fetching location: ", error);
    }
  };

  const GetDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/farmer/dashboard",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSalesData(response.data.dashboard.salesData);
        setDashboardData(response.data.dashboard);
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };

  useEffect(() => {
    GetDashboard();
    GetLocation();
  }, [authToken, userDetails]);

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

  const stats = [
    {
      label: "Total Produce Sold",
      value: "1200 kg",
      icon: <IoBagCheckOutline size={24} className="text-green-700" />,
    },
    {
      label: "Total Revenue",
      value: `Rs ${dashboardData.revenue}`,
      icon: <IoWalletOutline size={24} className="text-yellow-600" />,
    },
    {
      label: "Transactions",
      value: dashboardData.totalTransactions,
      icon: <IoLeafOutline size={24} className="text-blue-600" />,
    },
    {
      label: "Users Reached",
      value: dashboardData.userReach,
      icon: <IoPeopleOutline size={24} className="text-red-600" />,
    },
  ];

  const salesChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: `${salesView} Sales ($)`,
        data: salesData && salesData[salesView] ? salesData[salesView] : [],
        borderColor: "#6e912d",
        backgroundColor: "#a8c686",
        borderWidth: 2,
      },
    ],
  };

  console.log("Location:",location)
  const isLoading = !location?.latitude;

  return (
    <div className="h-screen w-screen overflow-y-auto font-[Fjalla One] bg-[#f6eedb] text-[#2A293E]">
      {/* Header */}
      <div className="w-full h-[10vh] flex items-center justify-between px-4 border-b-2 border-[#2A293E]">
        <div className="w-72 h-12 flex items-center gap-2 border-b-2 border-[#2A293E]">
          <CgSearch size={28} />
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none text-md"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <AiOutlineBell
              size={32}
              className="text-[#2A293E]"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {negotiations.length}
            </span>
          </div>
          <IoPerson size={32} className="text-[#2A293E] cursor-pointer" />
        </div>
      </div>
      {/* Notification Panel */}
      {showNotifications && (
        <div className="absolute top-[10vh] right-10 w-96 select-none rounded-lg border-1 border-[#2A293E] bg-[#6e912d] bg-opacity-90 shadow-lg overflow-y-auto scrollbar-none max-h-[70vh]">
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

      {/* Farmer's Name */}
      <div className="text-2xl font-bold px-4 py-4">
        Welcome,{" "}
        <span className="text-[#6e912d] capitalize">{userDetails?.name}</span>!
      </div>

      {/* Stats Row */}
      <div className="flex justify-between px-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-full md:w-[23%] flex items-center gap-4 bg-[#f0f7e4] p-4 rounded-lg shadow-md"
          >
            {stat.icon}
            <div>
              <h3 className="text-lg font-bold">{stat.label}</h3>
              <p className="text-xl ml-2">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap px-4 gap-6">
        {/* Sales with Toggle */}
        <div className="w-full md:w-[48%] bg-[#f0f7e4] p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold mb-2">Sales Data</h3>
            <div className="flex gap-2">
              {["Weekly", "Monthly", "Yearly"].map((view) => (
                <button
                  key={view}
                  onClick={() => setSalesView(view)}
                  className={`px-4 py-1 rounded-md ${
                    salesView === view
                      ? "bg-[#4caf50] text-white"
                      : "bg-[#f6eedb] text-[#2A293E]"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <Line data={salesChartData} />
          </div>
        </div>

        {/* User Location */}
        <div className="w-full md:w-[48%] bg-[#f0f7e4] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-bold mb-4 text-[#2A293E]">Most Users</h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <PuffLoader color="#65db9e" size={60} />
            </div>
          ) : (
            <div className="relative w-full h-72 bg-red-100 overflow-hidden rounded-lg">
              {isLoading ? (
                <div className="flex justify-center items-center h-96">
                  <PuffLoader color="#65db9e" size={60} />
                </div>) : (
                  <MapContainer
                  center={[location.latitude, location.longitude]}
                  zoom={13}
                  attributionControl={true}
                  scrollWheelZoom={true}
                  style={{ width: "100%", height: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {dashboardData?.coordinates?.map((coord, index) => (
                    <Marker
                      key={index}
                      position={[
                        coord.latitude || "28.8",
                        coord.longitude || "78.3",
                      ]}
                    >
                      <Popup>{coord.name}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          )}
        </div>

        <div className="w-full bg-[#f0f7e4] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-bold mb-4 text-[#2A293E]">
            Recent Transactions
          </h3>
          <ul>
            {dashboardData?.transactions?.map((transaction, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-3 border-b border-[#2A293E] last:border-none hover:bg-[#e1e9c5] transition-colors duration-200  cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <div className="w-6 h-6 flex items-center justify-center bg-[#6e912d] rounded-full text-white">
                    <IoBagCheckOutline size={16} />
                  </div>
                  <span className="font-medium text-[#2A293E]">
                    {moment(transaction.createdAt).format("MMMM D, YYYY")}
                  </span>
                </div>
                <span className="text-md font-medium text-gray-700">
                  {transaction.buyer.name}
                </span>
                <span className="font-bold text-[#4caf50]">
                  Rs {transaction.totalAmount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
