const Cart = require("../models/Cart");

const getCartDetail = async (req, res) => {
  try {
    const cartItems = await Cart.find({});
    if (!cartItems.length) {
      return res.status(200).json({
        message: "Cart is empty",
        data: [],
        success: true,
      });
    }
    let grandTotal = 0;
    let totalSavings = 0;
    const allItemsOfCart = cartItems.map((item) => {
      const discountedPrice = item?.discountedPrice;
      const savings = item.savingPrice;
      const totalCost = item?.totalItemCost;
      grandTotal += totalCost;
      totalSavings += savings;
      return {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        imageUrl: item.imageUrl,
        discount: item.discount,
        saving: savings,
        quantity: item.quantity,
        totalCost: totalCost,
        discountedPrice: discountedPrice,
      };
    });
    res.status(200).json({
      message: "All Cart data is here ",
      data: allItemsOfCart,
      success: true,
    });
  } catch (err) {
    console.error("Error fetching cart details:", err);
    res.status(500).json({ error: "Failed to fetch cart details" });
  }
};
module.exports = {
  getCartDetail,
};
