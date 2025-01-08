const express = require("express");
const Market = require("../models/Market");

const AddItem = async (req, res) => {
  const { itemName, itemPrice, itemImage, itemCategory } = req.body;

  if (!itemName || !itemPrice || !itemImage || !itemCategory) {
    return res
      .status(400)
      .json({ message: "Farmer has not provided all details!" });
  }

  try {
    const MarketItem = await Market.create({
      itemName: itemName,
      itemPrice: itemPrice,
      itemImage: itemImage,
      itemCategory: itemCategory,
      seller: req.farmer.id,
    });

    return res
      .status(200)
      .json({ message: "Successfully added the item!", item: MarketItem });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while adding the item!", error: error.message });
  }
};

const DeleteItem = async (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).json({ message: "No item id provided!" });
  }
  try {
    const item = await Market.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found!" });
    }
    return res.status(200).json({ message: "Successfully deleted the item!" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Error while deleting the item!",
        error: error.message,
      });
  }
};

module.exports = {
    AddItem,
    DeleteItem,
};
