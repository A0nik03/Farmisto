const { hashPassword, comparePassword } = require("../middleware/hashing");
const Farmer = require("../models/Farmer");

const FarmerRegister = async (req, res) => {
  const {
    farmerName,
    farmerEmail,
    farmerPhone,
    farmerCity,
    farmerState,
    farmerAddress,
    farmerCountry,
    farmerZip,
    farmerPassword,
    farmerCategory,
    farmerlocation
  } = req.body;

  try {
    if (
      !farmerName ||
      !farmerEmail ||
      !farmerPhone ||
      !farmerCity ||
      !farmerCategory ||
      !farmerState ||
      !farmerAddress ||
      !farmerCountry ||
      !farmerZip ||
      !farmerPassword
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const isEmailRegistered = await Farmer.findOne({ farmerEmail });
    if (isEmailRegistered) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await hashPassword(farmerPassword);

    const farmer = await Farmer.create({
      farmerName: farmerName,
      farmerEmail: farmerEmail,
      farmerPhone: farmerPhone,
      farmerCity: farmerCity,
      farmerState: farmerState,
      farmerAddress: farmerAddress,
      farmerCountry: farmerCountry,
      farmerZip: farmerZip,
      farmerPassword: hashedPassword,
      farmerCategory: farmerCategory,
      farmerlocation: farmerlocation
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
