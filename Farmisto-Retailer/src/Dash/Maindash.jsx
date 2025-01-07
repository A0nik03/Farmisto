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
    labels: orderedWeeks, // Week names
    datasets: [
      {
        label: "Profit Rate (%)",
        data: orderedWeeks.map((week) => profitData[week].profit), // Extracting profit data
        backgroundColor: "light-orange",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full h-full bg-gray-300 p-6">
      <header className="flex justify-between items-center">
        {/* Search Bar */}
        <div className="relative w-1/3">
          <AiOutlineSearch
            className="absolute top-2.5 left-3 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search plant here"
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <AiOutlineBell size={24} className="text-gray-600" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
            <span className="text-lg font-bold text-red-800">A</span>
          </div>
        </div>
      </header>

      <div className="text-xl mt-4">
        hello <br />
        <span className="text-4xl ml-7">farmer name</span>
      </div>

      <div className="w-full h-[40%] mt-5 p-2 flex gap-4">
        {/* Left Section */}
        <div className="w-[65%] h-full bg-white p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">Farmer Profit</h2>
            {/* Dropdown */}
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-36 h-10 bg-green-400 text-white rounded-full px-4 text-center focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="week1">Week 1</option>
              <option value="week2">Week 2</option>
              <option value="week3">Week 3</option>
            </select>
          </div>

          {/* Dynamic Content in Row */}
          <div className="mt-5 flex items-center gap-4 overflow-x-auto">
            {orderedWeeks.map((week) => (
              <div
                key={week}
                className={`p-4 rounded-lg min-w-[200px] ${
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
        <div className="w-[35%] h-full bg-gray-200 p-6 rounded-3xl gap-3 flex flex-col">
          <div className="w-full flex items-center h-20 rounded-full bg-white justify-between">
            <div className="text-black text-xl justify-center font-bold ml-8">
              Profit: {currentData.profit}%
            </div>
            <AiOutlineArrowUp size={24} className="text-green-300 mr-5" />
          </div>
          <div className=" flex items-center w-full rounded-full h-20 bg-white justify-between">
            <div className="text-black text-xl font-bold ml-8">
              Loss: {currentData.loss}%
            </div>
            <AiOutlineArrowDown size={24} className="text-red-300 mr-5" />
          </div>
          <div className="flex items-center rounded-full w-full h-20 bg-white justify-between">
            <div className="text-black text-xl font-bold ml-8">
              Average: {currentData.average}%
            </div>
            <AiOutlineInfoCircle size={24} className="text-yellow-300 mr-5" />
          </div>

          {/* Bar Chart for Profit */}
        </div>
      </div>
      <div className="h-[40%] w-full ">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Maindash;
