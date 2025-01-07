const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {GenerateToken} = require('../authentication/TokenAuth')

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
  farmerPassword: {
    type: String,
    required: true,
  },
  farmerCategory: {
    type: String,
    required: true,
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

// FarmerSchema.pre("save", async function (next) {
//   if (!this.isModified("farmerPassword")) {
//     return next();
//   }
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.farmerPassword = await bcrypt.hash(this.farmerPassword, salt);
//   } catch (error) {
//     return next(error);
//   }
// });

// FarmerSchema.static("ComparePassword", async function (farmer,password, hashedPassword) {

 
//   try {
//     const isMatch = await bcrypt.compare(password, hashedPassword);

//     if(isMatch){
//       const token = GenerateToken(farmer);
//       return token;
//     }
//     else{
//       throw new Error("Failed to Create Token !");
//     }
    
//   } catch (error) {
//     console.log("Error in farmer login", error);
//   }
// });

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;
