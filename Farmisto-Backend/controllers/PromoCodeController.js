const PromoCode = require("../models/PromoCode");

const PromoCodeGenerator = async (req, res) => {
  const { item, code, discountPercentage, expiryDate, usageLimit } = req.body;

  if (!code || !discountPercentage || !expiryDate || !usageLimit) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields!" });
  }

  try {
    const promoCode = await PromoCode.create({
      item,
      code,
      discountPercentage,
      expiryDate: new Date(expiryDate),
      usageLimit,
      usedCount: 0,
    });
    console.log(promoCode);
    return res
      .status(200)
      .json({ message: "Promo Code created successfully", promo: promoCode});
  } catch (error) {
    console.error(error);
  }
};

const PromoCodeApply = async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res
      .status(400)
      .json({ message: "Please provide all the required fields!" });
  }

  try {
    const promoCode = await PromoCode.findOne({ code });

    if (!promoCode) {
      return res
        .status(404)
        .json({ message: "Promo Code not found or expired!" });
    }

    if (new Date(promoCode.expiryDate) < new Date()) {
      return res.status(400).json({ message: "Promo code has expired" });
    }

    if (
      promoCode.usageLimit !== 0 &&
      promoCode.usedCount >= promoCode.usageLimit
    ) {
      return res
        .status(400)
        .json({ message: "Promo code usage limit exceeded" });
    }

    const discount = promoCode.discountPercentage;
    console.log(discount);

    promoCode.usedCount += 1;
    await promoCode.save();

    return res.status(200).json({
      message: "Promo Code applied successfully",
      promo: discount,
    });
  } catch (error) {
    console.error("Promo Code Error", error);
  }
};

module.exports = { PromoCodeGenerator, PromoCodeApply };
