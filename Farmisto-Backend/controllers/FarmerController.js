const { GenerateToken } = require("../middleware/TokenAuth");
const { hashPassword, comparePassword } = require("../middleware/Hashing");
const Farmer = require("../models/Farmer");
const { fetchLocation } = require("./GeoController");

const FarmerRegister = async (req, res) => {
  const {
    farmerName,
    farmerEmail,
    farmerPhone,
    farmerPassword,
    farmerCategory,
    farmerLocation,
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

 
    const GeoLocate = await fetchLocation(
      farmerLocation.latitude,
      farmerLocation.longitude
    );
    if (!GeoLocate || GeoLocate.length === 0) {
      return res.status(400).json({ msg: "Invalid location details provided" });
    }

    const addressArray = GeoLocate[0].formatted_address
      .split(",")
      .map((item) => item.trim());
    const len = addressArray.length;
    const geoCity = addressArray[len - 3];
    const geoStateZip = addressArray[len - 2];
    const geoCountry = addressArray[len - 1];
    const geoAddress = GeoLocate[0].formatted_address;

    const farmer = await Farmer.create({
      farmerName,
      farmerEmail,
      farmerPhone,
      farmerCity: geoCity,
      farmerStateZip: geoStateZip,
      farmerAddress: geoAddress,
      farmerCountry: geoCountry,
      farmerPassword: hashedPassword,
      farmerCategory,
      farmerLocation,
    });

    res.status(200).json({ message: "Farmer registered successfully", farmer });
  } catch (err) {
    console.error("Error in farmer registration:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

const FarmerLogin = async (req, res) => {
  const { farmerEmail, farmerPassword } = req.body;
  console.log(req.body)
  if (!farmerEmail || !farmerPassword) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const farmer = await Farmer.findOne({ farmerEmail });
    if (!farmer) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await comparePassword(
      farmerPassword,
      farmer.farmerPassword
    );
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = GenerateToken(farmer);
    res.cookie('token', token,{
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });
    return res.status(200).json({ success: "Login Successful", token });
  } catch (err) {
    console.error("Error in farmer login:", err);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  FarmerRegister,
  FarmerLogin,
};
