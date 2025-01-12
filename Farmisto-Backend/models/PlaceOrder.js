const mongoose = require('mongoose');

const PlaceOrderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'customer',
    },
    items:[{
        item:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'item',
        },
        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        discount:{
            type:Number,
            required:true,
            min:0,
            max:100,
            default:0,
        },
    }],
    totalPrice:{
        type:Number,
        required:true,
    },
    orderStatus:{
        type:String,
        enum:['Pending','Shipped','Delivered','Cancelled'],
        default:'Pending',
    },
    deliveryAddress:{
        type: String,
        required:true,
    },
    deliveryDate:{
        type: Date,
        required:true,
    },
});

const PlaceOrder = mongoose.model('placeorder',PlaceOrderSchema);

module.exports = PlaceOrder;