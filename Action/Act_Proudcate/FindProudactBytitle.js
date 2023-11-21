import { Proudact } from "../../Model/Proudactes.js";
import Joi from "joi";


function Validtile(user){
    const Schema = Joi.object({
        title : Joi.string().min(2).max(255).required()
    })
    return Schema.validate(user)
}


export default async function(req,res,next){
    if(!req.params.title){
        return res.status(400).send("No Req In Params")
    }

    const Valid = Validtile(req.params)

    if(Valid.error){
        return res.status(400).json({message:"Error In Valid Data",error:Valid.error.details[0].message})
    }

    try {
        const {page=1,limit=10} = req.query

        const Pro = await Proudact.find({
            title:req.params.title
        }).sort("title")
        .limit(limit * 1)
        .skip((page -1 ) * limit).exec()

        if(!Pro){
            return res.status("400").send("No Proudact Found")
        }

        return next(res.status(200).json({message:"Find",data:Pro}))
        
    } catch (error) {
        return res.status(500).json({message:"Error In Find Proudact by title",error})
    }
}