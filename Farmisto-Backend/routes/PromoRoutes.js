const express = require("express");
const Authentication = require("../middleware/Authentication");
const {
  PromoCodeGenerator,
  PromoCodeApply,
  PromoCodeDelete,
  PromoCodeList,
} = require("../controllers/PromoCodeController");
const router = express.Router();

router.post("/gen-promo", Authentication, PromoCodeGenerator);
router.post("/apply-promo", PromoCodeApply);
router.delete("/del-promo/:id", Authentication, PromoCodeDelete);
router.get("/list-promos", Authentication, PromoCodeList);

module.exports = router;
