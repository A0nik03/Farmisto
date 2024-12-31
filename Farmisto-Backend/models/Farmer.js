const express = require(`express`);
const mongoose = require(`mongoose`);

const farmerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: false,
      },
      longitude: {
        type: Number,
        required: false,
      },
    },
  },
  { timestamps: true }
);

farmerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

farmerSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error in comparing password");
  }
};

const Farmer = mongoose.model(`Farmer`, farmerSchema);

module.exports = Farmer;
