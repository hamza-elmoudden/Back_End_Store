import mongoose from "mongoose";
import Joi from "joi";

const OrderShema = new mongoose.Schema({
    ProdatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Proudact",
        required:true,
    },

    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    Date:{
        type:Date,
        default: Date.now(),
        required:true
    },

    OrderComplet:{
        type:Boolean,
        required:true
    }

})


const Order = new mongoose.model("Order",OrderShema)



export {Order}