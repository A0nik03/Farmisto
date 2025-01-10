const express = require("express");
const { AddItem, DeleteItem, GetItems } = require("../controllers/MarketController");
const Authentication = require("../middleware/Authentication");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage
});

router.post("/add-item", Authentication, upload.single("itemImage"), AddItem);
router.delete("/delete-item", Authentication, DeleteItem);
router.get("/get-items", GetItems);

module.exports = router;
