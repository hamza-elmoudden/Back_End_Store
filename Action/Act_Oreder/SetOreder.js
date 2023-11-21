import { Order } from "../../Model/Orders.js";
import {Proudact} from "../../Model/Proudactes.js"
import _ from 'lodash'


export default async function(req,res,next){

    if(!req.params.id){
        return res.status(400).send("No Req In Params")
    }

    if(!req.body){
        return res.status(400).send("No Req In Body")
    }


    try {

        const Pro = await Proudact.findOne({
            _id:req.params.id
        })

        if(!Pro){
            return res.status(400).send("No Proudacte Found")
        }

        const Orde = new Order({
            ProdatId: req.params.id,
            UserId: req.decode.Id,
            OrderComplet: req.body.OrderComplet,
        })
        
        await Orde.save()

        res.status(201).send("Creat")

        return next()
        
    } catch (error) {

        return res.status(500).json({message:"Error In Set Oreder",error})
    }
}