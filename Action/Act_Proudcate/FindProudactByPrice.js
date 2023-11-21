import {Proudact} from "../../Model/Proudactes.js"
import Joi from "joi"



export default async function(req,res,next){

    try {

        const {gte = 0,lte = 10000,page = 1,limit = 10} = req.query


        const Pro = await Proudact.find({})
        .sort("price")
        .where("price").gt(gte -1).lt(lte +1)
        .limit(limit * 1)
        .skip((page -1 ) * limit).exec()

        if(!Pro){
            return res.status(400).send("No Proudact Found")
        }

        return next(res.status(200).send(Pro))
    } catch (error) {
        return res.status(500).json({message:"Error In Find Proudacte By Price",error})
    }
}