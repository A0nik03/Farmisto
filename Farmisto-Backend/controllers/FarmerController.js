const { GenerateToken } = require("../middleware/TokenAuth");
const { hashPassword, comparePassword } = require("../middleware/Hashing");
const Farmer = require("../models/Farmer");
const { fetchLocation } = require("./GeoController");
const validateProfileData = require("../utils/validation");
const bcrypt = require("bcrypt");
const Payment = require("../models/Payment");
const User = require("../models/User");

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
  console.log("Farmer Email:", farmerEmail, "Farmer Password:", farmerPassword);
  if (!farmerEmail || !farmerPassword) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  try {
    const farmer = await Farmer.findOne({ farmerEmail });
    if (!farmer) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    console.log(farmer);

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

const GetSalesData = async (req, res) => {
  try {
    const payments = await Payment.find({
      orderStatus: "Delivered",
    });

    // Initialize sales data
    const salesData = {
      Weekly: [0, 0, 0, 0],
      Monthly: [0, 0, 0, 0],
      Yearly: [0, 0, 0, 0],
    };

    const currentDate = new Date();

    payments.forEach((payment) => {
      const orderDate = new Date(payment.createdAt);

      const weekDifference = Math.floor(
        (currentDate - orderDate) / (7 * 24 * 60 * 60 * 1000)
      );
      const monthDifference =
        currentDate.getMonth() -
        orderDate.getMonth() +
        12 * (currentDate.getFullYear() - orderDate.getFullYear());
      const yearDifference =
        currentDate.getFullYear() - orderDate.getFullYear();

      if (weekDifference < 4) {
        salesData.Weekly[3 - weekDifference] += payment.totalAmount;
      }

      if (monthDifference < 4) {
        salesData.Monthly[3 - monthDifference] += payment.totalAmount;
      }

      if (yearDifference < 4) {
        salesData.Yearly[3 - yearDifference] += payment.totalAmount;
      }
    });

    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const GetDashboard = async (req, res) => {
  try {
    const payments = await Payment.find({ "farmers.email": req.user.email });

    const revenue = payments.reduce((acc, order) => {
      return order.orderStatus === "Delivered" ? acc + order.totalAmount : acc;
    }, 0);

    const transactions = payments.filter(
      (order) => order.orderStatus === "Delivered"
    );

    const userReached = payments.reduce((acc, order) => {
      if (!acc[order.buyer.email]) {
        acc[order.buyer.email] = true;
      }
      return acc;
    }, {});

    const coordinates = await Promise.all(
      transactions.map(async (payment) => {
        const user = await User.findOne({ email: payment.buyer.email });
        if (user && user.userLocation) {
          return { email: payment.buyer.name, location: user.userLocation };
        } else {
          return null;
        }
      })
    );

    const validCoordinates = coordinates.filter(
      (location) =>
        location !== null &&
        location.location.latitude !== undefined &&
        location.location.longitude !== undefined
    );
    const uniqueCoordinates = [
      ...new Set(validCoordinates.map((user) => JSON.stringify(user.location))),
    ].map((location) => JSON.parse(location));

    const validUniqueCoordinates = uniqueCoordinates.filter(
      (loc) => loc.latitude !== null && loc.longitude !== null
    );
    console.log("Valid Unique Coordinates:", validUniqueCoordinates);

    const periods = {
      weeks: 6,
      months: 12,
      years: 5,
    };

    const salesData = {
      Weekly: Array(periods.weeks).fill(0),
      Monthly: Array(periods.months).fill(0),
      Yearly: Array(periods.years).fill(0),
    };

    const currentDate = new Date();

    transactions.forEach((payment) => {
      const orderDate = new Date(payment.createdAt);

      const weekDifference = Math.floor(
        (currentDate - orderDate) / (7 * 24 * 60 * 60 * 1000)
      );
      const monthDifference =
        currentDate.getMonth() -
        orderDate.getMonth() +
        12 * (currentDate.getFullYear() - orderDate.getFullYear());
      const yearDifference =
        currentDate.getFullYear() - orderDate.getFullYear();

      if (weekDifference < 4) {
        salesData.Weekly[3 - weekDifference] += payment.totalAmount;
      }

      if (monthDifference < 4) {
        salesData.Monthly[3 - monthDifference] += payment.totalAmount;
      }

      if (yearDifference < 4) {
        salesData.Yearly[3 - yearDifference] += payment.totalAmount;
      }
    });

    const dashData = {
      revenue: revenue,
      totalTransactions: transactions.length,
      userReach: Object.keys(userReached).length,
      salesData: salesData,
      transactions: transactions,
      coordinates: validUniqueCoordinates,
    };

    return res.json({
      message: "Dashboard Fetched Successfully",
      dashboard: dashData,
    });
  } catch (error) {
    console.error("Error in dashboard:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const GetFarmerLocation = async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ farmerEmail: req.user.email });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    return res.status(200).json({
      farmerLocation: {
        latitude: farmer.farmerLocation?.latitude,
        longitude: farmer.farmerLocation?.longitude,
      }
    });
  } catch (error) {
    console.error("Error in getting farmer location:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
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
  GetDashboard,
  GetFarmerLocation,
  // loggedOut,
};
