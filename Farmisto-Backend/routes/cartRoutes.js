const express=require("express");
const cartRoutes=express.Router();
const {getCartDetail}=require("../controllers/CartController");
cartRoutes.get("/cart",getCartDetail);
module.exports=cartRoutes;