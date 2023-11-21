import { User } from "../../Model/Users.js";
import bcrypt from "bcrypt";
import Joi from "joi";



function Validelogin(user){

    const Schema = Joi.object({
        email:Joi.string().min(2).max(255).email().required(),
        password:Joi.string().min(8).max(255).required()
    })

    return Schema.validate(user)
}




export default async function(req,res,next){

    if(!req.body){

        return res.status(400).send("Req Body Not Found")
    }

    const Valid = Validelogin(req.body)

    if(Valid.error){
        
       return res.status(400).json({message:"In Valid Data",error:Valid.error.details[0].message})
    }
    

    try {
        
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).send("Wrong Email ")
        }

        const chakepassword =  bcrypt.compareSync(req.body.password,user.password)


        if(!chakepassword){
            return res.status(401).send("Ronge Email OR Password")
        }

        const UserToken = await user.Generate_token()

        return next(res.status(200).json({message:"Login Successfully",Token:UserToken}))

    } catch (error) {
        res.status(500).json({message:"Error In Auth",error})
    }
}