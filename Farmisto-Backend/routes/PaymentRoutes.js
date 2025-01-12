const express = require('express');
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { createPayment, GetPayments } = require('../controllers/PaymentController');

router.post('/create-payment',Authentication,createPayment);
router.get('/farmer-get-payment',Authentication,GetPayments);

module.exports = router;