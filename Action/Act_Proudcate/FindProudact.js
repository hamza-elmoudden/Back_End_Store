import { Proudact } from "../../Model/Proudactes.js";



export default async function(req,res,next){
    
    if(!req.params){
        return res.status(400).send("NO ID IN PARAMS")
    }

    try {

        const Prodact =  await Proudact.findOne({
            _id: req.params.id,
        }).populate("Owner","name")

        
        if(!Prodact){
            return res.status(400).send("Proudact Not Fund")
        }

        return next(res.status(400).json({message:"Found Proudact",data:Prodact}))
        
    } catch (error) {
        return res.status(500).send(error)
    }


}