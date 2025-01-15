const express = require('express');
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { createPayment, GetPayments, UpdatePayment } = require('../controllers/PaymentController');

router.post('/create-payment',Authentication,createPayment);
router.get('/farmer-get-payment',Authentication,GetPayments);
router.patch('/farmer-update-payment',Authentication,UpdatePayment);

module.exports = router;