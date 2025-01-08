const express = require('express');
const {AddItem,DeleteItem} = require('../controllers/MarketController');
const Authentication = require('../middleware/Authentication');
const router = express.Router();

router.post('/add-item',Authentication,AddItem);
router.delete('/delete-item',Authentication,DeleteItem);

module.exports = router;