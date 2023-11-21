import {User} from "../../Model/Users.js"



export default async function(req,res,next){

    if(!req.params.id){

        return res.status(400).send("Req Params No Found")
        
    }
    try {

        const user = await User.findOne({

            _id:req.params.id

        })

        if(!user){

            return res.status(400).send("User Not Found")

        }

        if(req.decode.Admin){

            user.deleteOne()

            return next(res.status(200).json({message:"User Delete",user}))

        }

        if(req.params.id !== req.decode.Id){

            return res.status(403).send('You Are Not Authorized To Delete This User')
        }

        await User.deleteOne()

        return next(res.status(200).send('Delete User Successfully'))
        

    } catch (error) {
        res.status(500).json({message:"Error In Delete User ",error})
    }
}