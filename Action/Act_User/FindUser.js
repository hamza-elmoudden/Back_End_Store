import { User } from "../../Model/Users.js";
import _ from "lodash"

export default async function(req,res,next){

    if(!req.params.id){
        return res.status(400).send("NO Req In Params")
    }

    try {
        const user = await User.findOne({
            _id: req.params.id,
        })
    
        if(!user){
            return res.status(400).send("user Not Found")
        }

        return next(res.status(200).json({message:"User Found",user:_.pick(user,["_id","name"])}))
    } catch (error) {
        
        return res.status(500).json({message:'Error In Find User',error})
    }

    
}