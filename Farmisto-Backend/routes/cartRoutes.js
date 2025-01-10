const express = require("express");
const router = express.Router();
const Authentication = require('../middleware/Authentication');
const { getCartDetail } = require("../controllers/CartController");

router.get('/cart',Authentication,getCartDetail);

module.exports = router;
