const Cart=require("../models/Cart");

const getCartDetail=async(req,res)=>{
    try{
        const cartItem=await Cart.find({});
        let grandTotal=0
        let totalSavings=0;
        const allItemsOfCart=cartItem.map((item)=>{
            const discountedPrice=item.discountedPrice;
            const savings=item.savingPrice;
            const totalCost=item.totalItemCost;
            grandTotal+=totalCost;
            totalSavings+=savings;
            return({
                itemName:item.itemName,
                itemPrice:item.itemPrice,
                imageUrl:item.imageUrl,
                discount:item.discount,
                saving:savings,
                quantity:item.quantity,
                totalCost:totalCost,
                discountedPrice:discountedPrice,
            });
        });
        res.status(200).json({
            message:"All Cart data is here ",
            data:allItemsOfCart,
            success:true,
        });
    }
    catch(err){
        console.error('Error fetching cart details:', err);
        res.status(500).json({ error: 'Failed to fetch cart details' });
    }
}
module.exports={
    getCartDetail
}