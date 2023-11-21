import { User } from "../../Model/Users.js";
import _ from "lodash"

export default async function (req,res,next){

    if(!req.params.id){
        return res.status(400).send("No Req In Params")
    }

    if(!req.body){
        return res.status(400).send("No Req In Body")
    }

    try {

        const user = await User.findOne({
            _id:req.params.id
        })

        if(!user){
            return res.status(400).send("User Not Found")
        }

        if(user._id !== req.decode.Id){
            return res.status(403).send('You are not authorized to delete this product')
        }

        user.updateOne(_.pick(req.body,["name","mobile",]))

        await user.save()

        res.status(200).send("User update")

        return next()
    } catch (error) {
        return res.status(500).json({message:'Error In Update User',error})
    }
}