const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'item',
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    discountPercentage:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    expiryDate:{
        type:Date,
        required:true
    },
    usageLimit:{
        type:Number,
        required:true,
        min:1
    },
    usedCount:{
        type:Number,
        default:0
    }
},{timestamps:true});

const PromoCode = mongoose.model("promocode",PromoCodeSchema);

module.exports = PromoCode;