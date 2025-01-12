const express = require("express");
const User = require("../models/User");
const { GenerateToken } = require("../middleware/TokenAuth");
const { comparePassword, hashPassword } = require("../middleware/Hashing");
const Cart = require("../models/Cart");

const UserRegister = async (req, res) => {
  const { userName, email, password, userLocation } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const isUserAlreadyRegistered = await User.findOne({ email });

    if (isUserAlreadyRegistered) {
      res.status(400).json({ msg: "User already exists" });
    }
    const HashPassword = await hashPassword(password);

    const user = await User.create({
      userName: userName,
      email: email,
      password: HashPassword,
      userLocation: userLocation,
    });

    res.status(200).json({ msg: "User registered successfully", User: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const UserInDB = await User.findOne({ email });

    if (!UserInDB) {
      return res.status(400).json({ msg: "User not exists" });
    }

    const isPasswordMatched = await comparePassword(
      password,
      UserInDB.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = GenerateToken(UserInDB);
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({ msg: "Login successful", token , user: UserInDB });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const BuyItem = async (req, res) => {
  console.log(req)
  const { itemName, itemPrice, imageUrl, quantity,id,farmer} = req.body;
  if (!itemName || !itemPrice || !imageUrl || !quantity || !id || !farmer) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  try {
    const ItemToCart = await Cart.create({
      id: id,
      itemName: itemName,
      itemPrice: itemPrice,
      imageUrl: imageUrl,
      quantity: quantity,
      buyer: req.user.id,
      farmer: {
        id: farmer.id,
        name: farmer.name,
        email: farmer.email,
      },
    });
    console.log(ItemToCart)
    return res.status(200).json({
      msg: "Item added to cart",
      item: ItemToCart,
      buyer: {
        _id: req.user.id,
        name: req.user.name,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while adding item to cart", error: error.message });
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  BuyItem,
};
