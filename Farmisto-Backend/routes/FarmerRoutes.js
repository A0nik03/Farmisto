const express = require("express");
const {
  FarmerRegister,
  FarmerLogin,
  getProfile,
  updateProfile,
  editPassword
} = require("../controllers/FarmerController");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.post("/register", FarmerRegister);
router.post("/login", FarmerLogin);

router.get("/settings/profile-data", Authentication, getProfile);
router.patch("/settings/update-profile", Authentication, updateProfile);
// router.patch("/settings/logout", Authentication, loggedOut);
router.patch("/settings/changePassword", Authentication, editPassword);

module.exports = router;
