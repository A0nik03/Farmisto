import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";
import axios from "../../utils/axios";
import { FaSearch, FaMapMarkerAlt, FaLeaf, FaChevronDown, FaShoppingBasket } from "react-icons/fa";
import { motion } from "framer-motion";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "#065e45",
    fontSize: "0.875rem sm:1rem",
    "&:hover": {
      backgroundColor: "#f0fcf4",
    },
    "&.Mui-selected": {
      backgroundColor: "#065e45",
      color: "white",
      "&:hover": {
        backgroundColor: "#065e00",
      },
    },
  },
}));

const NearbyFarmers = () => {
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchFarmers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/user/fetch-nearby-farmers`);
        setFarmers(response.data.farmers);
        setFilteredFarmers(response.data.farmers);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarmers();
  }, []);

  useEffect(() => {
    let updatedFarmers = farmers;
    if (search) {
      updatedFarmers = updatedFarmers.filter((farmer) =>
        farmer.farmerName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category) {
      updatedFarmers = updatedFarmers.filter(
        (farmer) => farmer.farmerCategory === category
      );
    }
    setFilteredFarmers(updatedFarmers);
    setPage(1);
  }, [search, category, farmers]);

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleSearch = debounce((value) => setSearch(value), 300);
  const categories = Array.from(new Set(farmers.map((farmer) => farmer.farmerCategory)));

  const totalPages = Math.ceil(filteredFarmers.length / ITEMS_PER_PAGE);
  const paginatedFarmers = filteredFarmers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToStore = (email) => {
    navigate("/Profile", { state: { email } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f3e8]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="animate-pulse text-base sm:text-lg font-medium text-[#6b9e5b] flex items-center gap-2"
        >
          <FaMapMarkerAlt /> Loading your local farm finds...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-gradient-to-r from-green-300 to-green-400 py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <FaLeaf /> Fresh from Nearby Farms
          </h1>
          <p className="mt-2 text-white text-xs sm:text-sm md:text-base lg:text-lg max-w-xl sm:max-w-2xl mx-auto">
            Discover local farmers within 30km bringing you the freshest produce.
          </p>
        </motion.section>

        {/* Filters */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for farmers..."
                className="w-full pl-8 pr-3 py-2 sm:pl-10 sm:pr-4 sm:py-3 rounded-xl border-2 border-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-200 bg-green-50 shadow-sm text-emerald-800 placeholder-[#a3b899] hover:bg-green-100 cursor-pointer text-xs sm:text-sm md:text-base transition-all"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <FaSearch className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6b9e5b]" />
            </div>
            <div className="relative flex-1">
              <select
                className="w-full pl-3 pr-8 py-2 sm:pl-4 sm:pr-10 sm:py-3 rounded-xl border-2 border-green-100 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-200 bg-green-50 shadow-sm text-[#4a7043] text-xs sm:text-sm md:text-base appearance-none hover:bg-green-100 cursor-pointer transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Browse All Farm Goods</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#6b9e5b] pointer-events-none" />
            </div>
          </div>
        </section>

        {/* Farmers Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {paginatedFarmers.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {paginatedFarmers.map((farmer) => (
                  <motion.div
                    key={farmer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={() => navigateToStore(farmer.farmerEmail)}
                    className="group bg-green-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-green-100 hover:border-green-200 cursor-pointer overflow-hidden"
                  >
                    {/* Farmer Image */}
                    <div className="relative flex justify-center pt-3 sm:pt-4">
                      <img
                        src={
                          farmer.image ||
                          "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
                        }
                        alt={farmer.farmerName}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-green-300 group-hover:border-green-200 transition-colors"
                      />
                      <span
                        className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border-2 border-white ${
                          true ? "bg-emerald-800" : "bg-red-500"
                        }`}
                      />
                    </div>

                    {/* Farmer Info */}
                    <div className="p-3 sm:p-4 text-center">
                      <h2 className="text-sm sm:text-base md:text-lg font-bold text-emerald-800 group-hover:text-emerald-700 transition-colors truncate">
                        {farmer.farmerName}
                      </h2>
                      <p className="text-xs sm:text-sm text-emerald-800 mt-1 flex items-center justify-center gap-1 truncate">
                        <FaMapMarkerAlt className="text-emerald-800" /> {farmer.farmerAddress}
                      </p>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-emerald-800 border border-green-200 inline-block px-2 py-1 rounded-full font-medium truncate">
                        {farmer.farmerCategory}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 sm:mt-3 w-full flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm"
                      >
                        <FaShoppingBasket /> Shop
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sm:mt-8 md:mt-10">
                  <StyledPagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    size="medium sm:large"
                    siblingCount={0}
                    boundaryCount={1}
                    className="flex flex-wrap justify-center gap-1 sm:gap-2"
                  />
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16 md:py-20"
            >
              <p className="text-emerald-800 text-base sm:text-lg md:text-xl font-medium">
                No Farmers Nearby Yet
              </p>
              <p className="text-emerald-700 text-xs sm:text-sm md:text-base mt-2">
                Try a new search or category to uncover fresh farm treasures!
              </p>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NearbyFarmers;