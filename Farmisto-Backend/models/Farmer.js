const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true,
  },
  farmerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  farmerPassword: {
    type: String,
    required: true,
  },
  farmerCategory: {
    type: String,
    required: true,
  },
  farmerPhone: {
    type: Number,
    required: true,
    unique: true,
  },
  farmerAddress: {
    type: String,
  },
  farmerCity: {
    type: String,
  },
  farmerStateZip: {
    type: String,
  },
  farmerCountry: {
    type: String,
  },
  farmerLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});
const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;
