const express = require('express');
const {FarmerRegister , Loginfarmer} = require('../controllers/FarmerController');
const router = express.Router();

router.post('/register', FarmerRegister);
router.post('/login', Loginfarmer);

module.exports = router;