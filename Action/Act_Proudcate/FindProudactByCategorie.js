import { Proudact } from "../../Model/Proudactes.js";
import Joi from "joi";


function ValidCate(user){
    const Shema = Joi.object({
        categorie : Joi.string().min(2).max(50).required()
    })
    return Shema.validate(user)
}


export default async function(req,res,next){
    console.log(req.params.categorie)

    if(!req.params.categorie){

        return res.status(400).send("No Req In Params")
    }

    const Valid = ValidCate(req.params)

    if(Valid.error){
        return res.status(400).json({message:"In Valid Data",error:Valid.error.details[0].message})
    }

    const categorie = req.params.categorie
    

    try {
        const {page=1,limit=10} = req.query

        
        const Pro = await Proudact.findOne({
            categorie
        })
        .sort("categorie")
        .limit(limit * 1)
        .skip((page -1 ) * limit).exec()

        if(!Pro){
            return res.status(400).send("No Proudact Found")
        }
        
        return next(res.status(200).send(Pro))

    } catch (error) {
        return res.status(500).json({message:"Error in Serche",error})
    }
}