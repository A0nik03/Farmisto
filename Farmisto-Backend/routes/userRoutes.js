const express = require('express');
const { UserRegister, UserLogin, BuyItem, GetUser } = require('../controllers/UserController');
const Authentication = require('../middleware/Authentication');

const router = express.Router();

router.post('/register', UserRegister);
router.post('/login', UserLogin);
router.post('/buy-item',Authentication,BuyItem)
router.post('/get-user/:id',GetUser);

module.exports = router;