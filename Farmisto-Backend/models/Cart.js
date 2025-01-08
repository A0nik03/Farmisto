const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    itemName:{
        type:String,
        required:true,
    },
    itemPrice:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
        trim:true
    },
    discount:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    saving:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    totalCost:{
        type:Number,
        required:true,
        default:0
    },
    discountedPrice:{
        type:Number,
        required:true,
        default:0
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
cartSchema.virtual("discountedPrice").get(function(){
    const result=this.itemPrice-(this.itemPrice*this.discount)/100;
    return result;
});
cartSchema.virtual("savingPrice").get(function(){
    const savings=(this.itemPrice-this.discountedPrice)*this.quantity;
    return savings;
})
cartSchema.virtual("totalItemCost").get(function(){
    const cost=this.discountedPrice*this.quantity;
    return cost;
})
const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;
// item -> name/price/url/discount/saving/quantity