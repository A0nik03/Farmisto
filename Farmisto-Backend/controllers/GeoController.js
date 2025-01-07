const { default: axios } = require("axios");
const Farmer = require("../models/Farmer");

// Reverse GeoCoding

const fetchLocation = async (lat, lng) => {
  if (!lat || !lng) {
    console.log("Latitude and Longitude are required.");
  }
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.Google_Map_key}`
    );
    if (response.data.results.length > 0) {
      return response.data.results;
    } else {
      console.log("Couldn't get location !");
    }
  } catch (error) {
    console.error("Error fetching location: ", error);
    throw error;
  }
};

// Haversine formula for calculating distance
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const Radius = 6371;
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const angular_Distance =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const actual_Distance =
    2 *
    Math.atan2(Math.sqrt(angular_Distance), Math.sqrt(1 - angular_Distance));
  return Radius * actual_Distance;
};

// Nearby Farmers in a Radius of 30 Km

const fetchNearbyFarmers = async (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required." });
  }
  try {
    const farmers = await Farmer.find({});
    const nearbyFarmers = farmers.filter((farmer) => {
      const distance = calculateDistance(
        lat,
        lng,
        farmer.farmerLocation.latitude,
        farmer.farmerLocation.longitude
      );
      return distance <= 30;
    });
    res.status(200).json({ success: nearbyFarmers });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error("Error fetching nearby farmers: ", error);
  }
};

module.exports = {
  fetchLocation,
  fetchNearbyFarmers,
};
