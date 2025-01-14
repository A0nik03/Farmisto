const { GenerateToken } = require("../middleware/TokenAuth");
const { hashPassword, comparePassword } = require("../middleware/Hashing");
const Farmer = require("../models/Farmer");
const { fetchLocation } = require("./GeoController");
const validateProfileData = require("../utils/validation");
const bcrypt = require("bcrypt");

const FarmerRegister = async (req, res) => {
  const { farmerName, farmerEmail, farmerPassword, farmerLocation } = req.body;

  try {
    if (!farmerName || !farmerEmail || !farmerPassword) {
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
      farmerCity: geoCity,
      farmerStateZip: geoStateZip,
      farmerAddress: geoAddress,
      farmerCountry: geoCountry,
      farmerPassword: hashedPassword,
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
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    console.error("Error in farmer login:", err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = req.person;
    const {
      farmerName,
      farmerEmail,
      farmerAddress,
      farmerCity,
      farmerCityZip,
      farmerCountry,
    } = user;
    res.json({
      message: "Profile Fetched Successfully",
      profile: {
        farmerName,
        farmerEmail,
        farmerAddress,
        farmerCity,
        farmerCityZip,
        farmerCountry,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const user = req.person;
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    if (!validateProfileData(req)) {
      return new Error("not able to Edit");
    }
    const farmerId = user?._id;
    const profile = await Farmer.findById(farmerId);
    Object.keys(req.body).forEach((key) => (profile[key] = req.body[key]));
    await profile.save();
    res.status(200).json({
      message: "Profile update Successfully",
      data: profile,
    });
  } catch (err) {
    res.status(400).json({
      message: "Not able to edit the profile",
    });
  }
};
const editPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const farmerId = req.person?._id;
    if (!farmerId) {
      return new Error("Not a valid User");
    }
    const farmerProfile = await Farmer.findById(farmerId);
    if (!farmerProfile) {
      return new Error("User Not Found");
    }
    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      farmerProfile?.farmerPassword
    );
    if (!isCorrectPassword) {
      return new Error("Invalid Password");
    }
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    farmerProfile.farmerPassword = newHashPassword;
    await farmerProfile.save();
    res.status(200).json({
      message: `${farmerProfile.farmerName} Password updated Successfuly`,
    });
  } catch (e) {
    res.status(401).send("Not Editable !!1 " + e);
  }
};
// const loggedOut = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(400).json({ msg: "No token provided" });
//     }
//     // clear the token
//     res.setHeader("Authorization", "");
//     return res.status(200).json({ msg: "Logout successful" });
//   } catch (err) {
//     console.error("Error in logout:", err);
//     return res.status(500).json({ msg: "Server Error" });
//   }
// };

module.exports = {
  FarmerRegister,
  FarmerLogin,
  getProfile,
  updateProfile,
  editPassword,
  // loggedOut,
};
