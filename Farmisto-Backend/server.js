const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const FarmerRoutes = require("./routes/FarmerRoutes");
const UserRoutes = require("./routes/UserRoutes");
const MarketRoutes = require("./routes/MarketRoutes");
const CartRoutes = require("./routes/CartRoutes");
const PaymentRoutes = require("./routes/PaymentRoutes");
const PromoRoutes = require("./routes/PromoRoutes")
const { fetchLocation, fetchNearbyFarmers } = require("./controllers/GeoController");
const connectCloudinary = require("./config/cloudinary");
const MongooseConnect = require("./config/Db");

dotenv.config();

// Connect to Cloudinary and MongoDB
connectCloudinary();
MongooseConnect();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/farmer", FarmerRoutes);
app.use("/market", MarketRoutes);
app.use("/user", UserRoutes);
app.use("/cart", CartRoutes);
app.use('/payments',PaymentRoutes)
app.use("/promo",PromoRoutes);
app.use("/api/geocode", fetchLocation);
app.use("/api/geoNearby", fetchNearbyFarmers);

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({
    message: "Logged out successfully",
    success: true,
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
