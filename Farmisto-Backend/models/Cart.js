const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemPrice: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    buyer:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.virtual("discountedPrice").get(function () {
  const discountValue = this.discount
    ? (this.itemPrice * this.discount) / 100
    : 0;
  return this.itemPrice - discountValue;
});

cartSchema.virtual("savingPrice").get(function () {
  const discountValue = this.discount
    ? (this.itemPrice * this.discount) / 100
    : 0;
  return discountValue * this.quantity;
});

cartSchema.virtual("totalItemCost").get(function () {
  return this.discountedPrice * this.quantity;
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
