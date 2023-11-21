import { Router } from "express";
import SetOreder from "../Action/Act_Oreder/SetOreder.js";
import Auth from "../Middleware/Auth.js"
import GetOreder from "../Action/Act_Oreder/GetOreder.js";

const router = Router()



router.post("/:id",[Auth,SetOreder],(req,res)=>{
   
})

.get("/",[Auth,GetOreder],(req,res)=>{
})


export default router