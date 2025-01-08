const express = require("express");
const User = require("../models/User");
const { GenerateToken } = require("../middleware/TokenAuth");
const { comparePassword, hashPassword } = require("../middleware/Hashing");

const UserRegister = async (req, res) => {
  const { userName, email, password,userLocation } = req.body;

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
      userLocation: userLocation
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
      UserInDB,
      password,
      isUserAlreadyRegistered.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = GenerateToken(isUserAlreadyRegistered);
    res.cookie("token", token);
    return res
      .status(200)
      .json({ msg: "User logged in successfully", User: UserInDB  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
    UserRegister,
    UserLogin,
 };
