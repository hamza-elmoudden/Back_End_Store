import mongoose, { Schema } from "mongoose";
import Joi from "joi";
import  Jwt  from "jsonwebtoken";

// Declare the Schema of the Mongo model

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
        trim:true,
        lowercase: true,
        minLength:2,
        maxLength:30,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength:2,
        maxLength:255,

    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:5,
        maxLength:255,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        maxLength:1028,
    },
    ISadmin:{
        type:Boolean,
        default:false,
    },
    vendor:{
        type:Boolean,
        default:false,
        required:true
    }
});


userSchema.methods.Generate_token = async function(){
    const token = Jwt.sign({ Id: this._id, Name: this.name, Email: this.email, Admin: this.ISadmin, Vendor: this.vendor }, process.env.KEY,{expiresIn:process.env.expiresdata})
    return  token
}




//Export the model
const User = mongoose.model('User', userSchema);



export  function ValidUser(user){
    const Schema = Joi.object({
        name:Joi.string().min(2).max(30).required(),
        email:Joi.string().min(2).max(255).email().required(),
        mobile:Joi.string().min(5).max(255),
        password:Joi.string().min(8).max(255).required(),
        vendor:Joi.boolean().required()
    })
    return Schema.validate(user)
}

export {User}