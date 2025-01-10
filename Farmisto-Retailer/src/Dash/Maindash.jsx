import {
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BsPerson, BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Maindash = () => {
  const [selectedWeek, setSelectedWeek] = useState("week1");

  const activityDetails = {
    week1: "Week 1: Seed Phase - The plant begins to sprout from the seed.",
    week2: "Week 2: Vegetation - The plant starts growing leaves and stems.",
    week3: "Week 3: Final Growth - The plant reaches maturity and flowers.",
  };

  const profitData = {
    week1: { profit: 6, loss: 3, average: 4.5 },
    week2: { profit: 8, loss: 2, average: 5 },
    week3: { profit: 12, loss: 4, average: 7 },
  };

  const orderedWeeks = Object.keys(activityDetails);
  const currentData = profitData[selectedWeek];

  // Chart.js Data for Profit
  const chartData = {
    labels: orderedWeeks,
    datasets: [
      {
        label: "Profit Rate (%)",
        data: orderedWeeks.map((week) => profitData[week].profit),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-6 shadow-sm">
        {/* Search Bar */}
        <div className="w-1/3 flex gap-2 items-center border border-gray-300 rounded-xl pl-2">
          <AiOutlineSearch
            className=" text-gray-400"
            size={30}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 bg-transparent text-xl font-normal outline-none"
          />
        </div>
        {/* Notifications and Profile */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <AiOutlineBell size={30} className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
          <Link to = {'/Register'} className="w-12 h-12 rounded-full flex items-center justify-center">
            <BsPersonCircle size={36} className="text-gray-600 hover:scale-[1.05] hover:cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="p-6">
        <h1 className="text-xl">Hello,</h1>
        <h2 className="text-4xl ml-2 font-bold text-green-700">Farmer Name</h2>
      </div>

      {/* Main Dashboard */}
      <div className="w-full p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-3xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Farmer Profit</h2>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-36 h-10 bg-green-500 text-white rounded-full px-4 text-center focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
            </select>
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {orderedWeeks.map((week) => (
              <div
                key={week}
                className={`p-4 rounded-lg min-w-[200px] shadow-md ${
                  week === selectedWeek
                    ? "bg-green-500 text-white font-bold"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {activityDetails[week]}
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-3xl shadow-md">
          <div className="mb-4 flex items-center justify-between p-4 bg-white rounded-full shadow-sm">
            <span className="text-lg font-bold text-gray-800">
              Profit: {currentData.profit}%
            </span>
            <AiOutlineArrowUp size={24} className="text-green-500" />
          </div>
          <div className="mb-4 flex items-center justify-between p-4 bg-white rounded-full shadow-sm">
            <span className="text-lg font-bold text-gray-800">
              Loss: {currentData.loss}%
            </span>
            <AiOutlineArrowDown size={24} className="text-red-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-white rounded-full shadow-sm">
            <span className="text-lg font-bold text-gray-800">
              Average: {currentData.average}%
            </span>
            <AiOutlineInfoCircle size={24} className="text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6">
        <div className="bg-white p-6 rounded-3xl shadow-md">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Maindash;
