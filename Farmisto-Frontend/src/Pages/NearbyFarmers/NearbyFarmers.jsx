import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

const NearbyFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

      const data = [
        {
          id: 1,
          name: "Ramesh Kumar",
          location: "Village A",
          rating: 4.5,
          available: true,
          category: "Veggies",
          picture:
            "https://images.pexels.com/photos/2345601/pexels-photo-2345601.jpeg",
        },
        {
          id: 2,
          name: "Sita Devi",
          location: "Village B",
          rating: 4.8,
          available: false,
          category: "Fruits",
          picture:
            "https://images.pexels.com/photos/735728/pexels-photo-735728.jpeg",
        },
        {
          id: 3,
          name: "Mukesh Yadav",
          location: "Village C",
          rating: 4.2,
          available: true,
          category: "Dairy",
          picture: "",
        },
        {
          id: 4,
          name: "Kamla Verma",
          location: "Village D",
          rating: 4.7,
          available: true,
          category: "Spices",
          picture:
            "https://images.pexels.com/photos/11691740/pexels-photo-11691740.jpeg",
        },
      ];
      setFarmers(data);
      setFilteredFarmers(data);
      setLoading(false);
    };

    fetchFarmers();
  }, []);

  // Filter farmers by search or category
  useEffect(() => {
    let updatedFarmers = farmers;

    if (search) {
      updatedFarmers = updatedFarmers.filter((farmer) =>
        farmer.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      updatedFarmers = updatedFarmers.filter(
        (farmer) => farmer.category === category
      );
    }

    setFilteredFarmers(updatedFarmers);
  }, [search, category, farmers]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((value) => setSearch(value), 300);

  const categories = Array.from(new Set(farmers.map((farmer) => farmer.category)));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl font-medium text-green-800">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-auto w-full bg-gradient-to-b from-zinc-100 to-white">
      <NavBar />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center text-green-800">
          Nearby Farmers
        </h1>
        <p className="text-md text-center text-gray-600 mt-2">
          Farmers within 30km of your location
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 mt-10">
          <input
            type="text"
            placeholder="Search by name"
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filteredFarmers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredFarmers.map((farmer) => (
              <Link
                to="/Profile"
                key={farmer.id}
                className="bg-white p-6 shadow-lg rounded-lg hover:scale-[1.02] transition"
                aria-label={`View profile of ${farmer.name}`}
              >
                <div className="flex justify-center">
                  <img
                    src={
                      farmer.picture ||
                      "https://via.placeholder.com/150/FFFFFF?text=No+Image"
                    }
                    alt={
                      farmer.picture
                        ? farmer.name
                        : "Placeholder image for farmer profile"
                    }
                    className="w-24 h-24 object-cover rounded-full shadow-lg"
                  />
                </div>

                <div className="mt-5 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {farmer.name}
                  </h2>
                  <p className="text-sm text-gray-600">{farmer.location}</p>
                  <div className="flex items-center justify-center mt-2">
                    <p className="text-yellow-500 font-semibold mr-2">
                      {farmer.rating.toFixed(1)}
                    </p>
                    <span className="text-sm text-gray-500">⭐</span>
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      farmer.available ? "text-green-700" : "text-red-500"
                    }`}
                  >
                    {farmer.available ? "Available" : "Not Available"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {farmer.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-xl font-medium text-green-800">
              No farmers found.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NearbyFarmers;

