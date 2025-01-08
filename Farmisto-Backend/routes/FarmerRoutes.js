const express = require('express');
const {FarmerRegister , FarmerLogin} = require('../controllers/FarmerController');
const router = express.Router();

router.post('/register', FarmerRegister);
router.post('/login', FarmerLogin);


module.exports = router;