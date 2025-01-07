const { hashPassword, comparePassword } = require("../middleware/hashing");
const Farmer = require("../models/Farmer");
const { fetchLocation } = require("./GeoController");

const FarmerRegister = async (req, res) => {
  const {
    farmerName,
    farmerEmail,
    farmerPhone,
    farmerPassword,
    farmerCategory,
    farmerLocation
  } = req.body;

  try {
    if (
      !farmerName ||
      !farmerEmail ||
      !farmerPhone ||
      !farmerCategory ||
      !farmerPassword
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const isEmailRegistered = await Farmer.findOne({ farmerEmail });
    if (isEmailRegistered) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await hashPassword(farmerPassword);

    const GeoLocate = await fetchLocation(farmerLocation.latitude, farmerLocation.longitude);
    const addressArray = GeoLocate[0].formatted_address.split(",").map(item => item.trim());
    const len = addressArray.length;
    const geoCity = addressArray[len - 3];
    const geoStateZip = addressArray[len - 2];
    const geoCountry = addressArray[len - 1];
    const geoAddress =  GeoLocate[0].formatted_address;

    const farmer = await Farmer.create({
      farmerName: farmerName,
      farmerEmail: farmerEmail,
      farmerPhone: farmerPhone,
      farmerCity: geoCity,
      farmerStateZip: geoStateZip,
      farmerAddress: geoAddress,
      farmerCountry: geoCountry,
      farmerPassword: hashedPassword,
      farmerCategory: farmerCategory,
      farmerLocation: farmerLocation
    });

    res.status(200).json({ message: "farmer is register sucessfully ",farmer});
  } catch (err) {
    console.log("Error in farmer register", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

const Loginfarmer = async (req, res) => {
  const { farmerEmail, farmerPassword } = req.body;
  try {
    if (!farmerEmail || !farmerPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const farmer = await Farmer.findOne({ farmerEmail });
    const token = comparePassword(farmer, farmerPassword, farmer.farmerPassword);
    if (!token) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    res.status(200).json({ success: "Login Sucessful", token });
  } catch (err) {
    res.status(500).json({ Error: "Error in Loggin !" });
  }
};
module.exports = {
  FarmerRegister,
  Loginfarmer,
};
