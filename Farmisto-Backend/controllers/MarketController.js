const express = require("express");
const Market = require("../models/Market");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const fs = require("fs/promises");
const path = require("path");
const FormData = require("form-data");
const streamifier = require("streamifier");

const REMOVE_BG_API_KEY = '9oT87irw47jn9XUmB6mg9rGq';

const AddItem = async (req, res) => {
  const { itemName, itemPrice, itemCategory,itemType,quantity,unit,itemValue } = req.body;

  if (!itemName || !itemPrice || !itemCategory || !itemType || !quantity || !unit || ! itemValue) {
    return res.status(400).json({ message: "Missing item details!" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No image file provided!" });
  }

  try {
    const imagePath = path.join(__dirname, '..', req.file.path);
    const imageBuffer = await fs.readFile(imagePath);

    const form = new FormData();
    form.append('image_file', imageBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append('size', 'auto');

    const removeBgResponse = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      form, {
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY,
          ...form.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    const processedImageBuffer = removeBgResponse.data;
    const supportedImages = ["image/jpeg", "image/png", "image/jpg"];
    const contentType = removeBgResponse.headers['content-type'];

    if (!supportedImages.includes(contentType)) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    const imageStream = streamifier.createReadStream(processedImageBuffer);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "Farmisto" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      imageStream.pipe(uploadStream);
    });

    const marketItem = await Market.create({
      itemName,
      itemPrice,
      itemImage: result?.secure_url,
      quantity,
      itemCategory,
      itemType,
      itemUnit:{
        value: itemValue,
        unit: unit
      },
      seller: req.user.id,
    });

    return res.status(200).json({ message: "Successfully added the item!", item: marketItem });

  } catch (error) {
    return res.status(500).json({ message: "Error while adding the item!", error: error.message });
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
    return res.status(500).json({ message: "Error while deleting the item!", error: error.message });
  }
};

const GetItems = async (req, res) => {
  try {
    const items = await Market.find({});
    if (!items.length) {
      return res.status(200).json({ message: "No items available!" });
    }
    return res.status(200).json({ message: "Items fetched successfully!", items });
  } catch (error) {
    return res.status(500).json({ message: "Error while fetching items!", error: error.message });
  }
};

module.exports = {
  AddItem,
  DeleteItem,
  GetItems,
};
