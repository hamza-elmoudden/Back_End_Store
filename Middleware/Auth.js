import { User } from "../Model/Users.js";
import  Jwt  from "jsonwebtoken";


export default async function(req,res,next){


    if(!req.headers.autorisation){
        return res.status(400).send("No Tekon  Found")
    }

    try {

        const token = req.headers.autorisation
        //Decode Token --- Jwt
        const decode = Jwt.verify(token,process.env.KEY)
        // check if Token Valid
        if (!decode || typeof decode !== "object") {
            return res.status(401).send("Invalid token");
          }
        const expirationDate = new Date(decode.exp * 1000);
          // check if Date ExpirationDate
        if (expirationDate < new Date()) {
            // The JWT is expired
            return res.status(401).send("Expired token");
          }

        //check if user existing
        const user = await User.findOne({
            _id:decode.Id
          })


        if(!user){
            return res.status(400).send("User Not Found")
        }
        
        req.decode = decode

        return next()  
      
    } catch (error) {
        return res.status(500).json({message:"Error In ",error})
    }
}