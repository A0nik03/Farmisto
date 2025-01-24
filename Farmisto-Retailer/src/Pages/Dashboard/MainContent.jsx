import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { PuffLoader } from "react-spinners";
import { useAuth } from "../../utils/Auth";
import axios from "axios";

const MainContent = () => {
  const { authToken, userDetails } = useAuth();
  const [salesView, setSalesView] = useState("Weekly");
  const [salesData, setSalesData] = useState([]);
  const [location, setLocation] = useState(null);
  const [dashboardData, setDashboardData] = useState([]);

  const GetLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/farmer/location",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
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
        console.log(response.data.dashboard);
        setDashboardData(response.data.dashboard);
      }
    } catch (error) {
      console.error("Error fetching dashboard data: ", error);
    }
  };

  const salesChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: `${salesView} Sales ($)`,
        data: salesData && salesData[salesView] ? salesData[salesView] : [],
        borderColor: "#405f27",
        backgroundColor: "#a8c686",
        borderWidth: 2,
      },
    ],
  };

  const isLoading = !location?.latitude;

  useEffect(() => {
    if (authToken) {
      GetLocation();
      GetDashboard();
    }
  }, [authToken, userDetails]);

  return (
    <div>
      {/* Main Content */}
      <div className=" w-full px-5 flex flex-nowrap gap-5">
        {/* Sales with Toggle */}
        <div className="w-full md:w-[50vw] bg-gradient-to-r from-green-50 to-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#405f27] mb-2">
              Sales Data
            </h3>
            <div className="flex gap-4">
              {["Weekly", "Monthly", "Yearly"].map((view) => (
                <div
                  key={view}
                  onClick={() => setSalesView(view)}
                  className={`px-6 py-2 rounded-lg text-sm cursor-pointer hover:scale-[1.08] font-semibold  transition-all duration-300 ${
                    salesView === view
                      ? "bg-[#405f27] text-white"
                      : "bg-[#f6eedb] text-[#2A293E]"
                  }`}
                >
                  {view}
                </div>
              ))}
            </div>
          </div>
          <div className="h-72">
            <Line data={salesChartData} />
          </div>
        </div>

        {/* User Location */}
        <div className="w-full md:w-[50vw] bg-gradient-to-r from-green-50 to-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-[#405f27] mb-4">
            Most Users
          </h3>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <PuffLoader color="#65db9e" size={60} />
            </div>
          ) : (
            <div className="w-full h-72 bg-green-50 overflow-hidden rounded-lg">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
