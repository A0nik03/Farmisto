import React, { useRef, useState } from "react";
import { useAuth } from "../utils/Auth";
import axios from "axios";
import { RiPlantFill } from "react-icons/ri";
import { IoWallet } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { BsPeopleFill } from "react-icons/bs";
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
import "leaflet/dist/leaflet.css";
import { RxCross2 } from "react-icons/rx";
import DashHeader from "../Pages/Dashboard/DashHeader";
import MainContent from "../Pages/Dashboard/MainContent";
import DiscountSection from "../Pages/Dashboard/DiscountSection";

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
  const { authToken} = useAuth();
  const [dashboardData, setDashboardData] = useState([]);

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
        setDashboardData(response.data.dashboard);
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };

  const stats = [
    {
      label: "Total Produce Sold",
      value: `${dashboardData.produceCount?.amount} ${dashboardData.produceCount?.unit}`,
      icon: <RiPlantFill size={24} className="text-green-700" />,
    },
    {
      label: "Total Revenue",
      value: `Rs ${dashboardData.revenue}`,
      icon: <IoWallet size={24} className="text-yellow-600" />,
    },
    {
      label: "Transactions",
      value: dashboardData.totalTransactions,
      icon: <GrTransaction size={24} className="text-blue-600" />,
    },
    {
      label: "Users Reached",
      value: dashboardData.userReach,
      icon: <BsPeopleFill size={24} className="text-red-600" />,
    },
  ];

  useEffect(() => {
    GetDashboard();
  }, [authToken]);

  return (
    <div className="h-screen w-screen relative overflow-y-auto scrollbar-none font-[Fjalla One] bg-[#f6eedb] text-[#2A293E]">
      {/* Header: -> LogOut,Notification,Settings */}
      <DashHeader />
      {/* Stats Row */}
      <div className="flex justify-between px-5 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="w-full md:w-[24%] flex items-center gap-5 bg-gradient-to-r from-green-100 to-yellow-100 p-4 rounded-lg shadow-md"
          >
            {stat.icon}
            <div>
              <h3 className="text-lg font-bold">{stat.label}</h3>
              <p className="text-xl font-medium ml-2">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Users Location and Sales Chart (Weekly,Monthly,Yearly) */}
      <MainContent />
      {/* PromoCode Generate */}
      <DiscountSection />
    </div>
  );
};

export default Dashboard;
