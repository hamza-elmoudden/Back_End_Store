import mongoose from "mongoose";
import Joi from "joi";

const ProdSchema = new mongoose.Schema({

    title:{
        type:String,
        minLength:3,
        maxLength:100,
        trim:true,
        lowercase:true,
        required:true
    },

    categorie:{
        type:String,
        mainLength:2,
        maxLength:100,
        lowercase:true,
        required:true,
    },

    description:{
        type:String,
        minLength:2,
        maxLength:300,
        lowercase:true,
        trim:true,
    },

    data:{
        type:Date,
        default:Date.now()
    },

    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],

    price:{
        type:Number,
        min:0,
        max:10000,
        required:true
    },

    Owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        trim:true,
        minLength:5,
        maxLength:255,
        required:true
    },

    image:{
        type:String,
        default:null,
    }
})


const Proudact = mongoose.model("Proudact",ProdSchema)

export function ValidProudact(user){
    const Schema = Joi.object({
        title:Joi.string().min(3).max(100).required(),
        categorie:Joi.string().min(2).max(100).required(),
        description:Joi.string().min(2).max(300).required(),
        price:Joi.number().min(2).max(10000).required(),
    })
    return Schema.validate(user)
}



export {Proudact}