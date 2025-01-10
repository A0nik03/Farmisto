const express = require('express');
const { UserRegister, UserLogin, BuyItem } = require('../controllers/UserController');
const Authentication = require('../middleware/Authentication');

const router = express.Router();

router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.post('/buy-item',Authentication,BuyItem)

module.exports = router;