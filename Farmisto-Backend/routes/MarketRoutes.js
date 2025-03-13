const express = require("express");
const { AddItem, DeleteItem, GetItems, GetItemsByFarmerEmail } = require("../controllers/MarketController");
const Authentication = require("../middleware/Authentication");
const upload = require('../config/multer')
const router = express.Router();



router.post("/add-item", Authentication, upload.single("itemImage"), AddItem);
router.delete("/delete-item", Authentication, DeleteItem);
router.get("/get-items", GetItems);
router.get("/get-items-farmer",Authentication,GetItemsByFarmerEmail);

module.exports = router;
