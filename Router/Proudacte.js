import { Router} from "express";
import AddProudact from "../Action/Act_Proudcate/AddProudact.js";
import GetProudact from "../Action/Act_Proudcate/GetProudact.js";
import FindProudact from "../Action/Act_Proudcate/FindProudact.js";
import FindProudactByCategorie from "../Action/Act_Proudcate/FindProudactByCategorie.js";
import FindProudactBytitle from "../Action/Act_Proudcate/FindProudactBytitle.js";
import DeleteProudact from "../Action/Act_Proudcate/DeleteProudact.js";
import Storage from "../Action/Act_Proudcate/Storage.js";


import Auth from "../Middleware/Auth.js";

import express from "express";

const app = express()
const router = Router()


// Public Routes

router.get("/All",GetProudact,(req,res)=>{

})

// .get("/Price",FindProudactByPrice,(req,res)=>{

// })

.get("/categorie/:categorie",FindProudactByCategorie,(req,res)=>{
    
})

.get("/:id",FindProudact,(req,res)=>{

    
})

.get("/title/:title",FindProudactBytitle,(req,res)=>{

})



// Private Routes

.post("/",[Auth,AddProudact],(req,res)=>{

})

.delete("/:id",[Auth,DeleteProudact],(req,res)=>{
})

// Uploud Image To Proudacte

.put("/image/:id",[Auth,Storage],(req,res)=>{

})


export default router