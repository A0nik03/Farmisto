const express = require("express");
const cartRoutes = express.Router();
const { getCartDetail } = require("../controllers/CartController");

cartRoutes.post("/cart", getCartDetail);

module.exports = cartRoutes;
