const express =  require('express');
const Authentication = require('../middleware/Authentication');
const { PromoCodeGenerator, PromoCodeApply } = require('../controllers/PromoCodeController');
const router = express.Router();

router.post('/gen-promo',Authentication,PromoCodeGenerator);
router.post('/apply-promo',PromoCodeApply);

module.exports = router;