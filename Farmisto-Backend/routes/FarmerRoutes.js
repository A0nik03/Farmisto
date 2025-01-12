const express = require('express');
const {FarmerRegister , FarmerLogin, getProfile, updateProfile, editPassword, logout} = require('../controllers/FarmerController');
const router = express.Router();

router.post('/register', FarmerRegister);
router.post('/login', FarmerLogin);

router.get("/settings/profile-data",verifyToken,getProfile) // get profile data
router.patch("/settings/update-profile",verifyToken,updateProfile)// update profile data
router.patch("/settings/logout",verifyToken,editPassword) // logged out the person from dashboard
router.patch("/settings/changePassword",verifyToken,)// changing the password


module.exports = router;