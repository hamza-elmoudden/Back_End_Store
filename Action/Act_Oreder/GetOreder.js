import { Order } from "../../Model/Orders.js";



export default async function(req,res,next){
    try {
        const Orde = await Order.find({
            UserId : req.decode.Id,
        })
        .populate("UserId","name")
        .populate("ProdatId","title")

        if(!Orde){
            return res.status(400).send("Order Not Found")
        }

        res.status(200).json({message:"Found",data:Orde})
        return next()
        
    } catch (error) {
        return res.status(500).json({message:"Error In Get Order",error})
    }
}