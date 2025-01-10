const express = require("express");
const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    itemImage: {
      type: String,
      required: true,
    },
    itemCategory: {
      type: String,
      required: true,
    },
    itemType:{
      type: String,
      required: true,
      default:"All"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Market = mongoose.model("market", marketSchema);

module.exports = Market;
