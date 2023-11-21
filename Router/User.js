import {Router} from "express";
import AddUser from "../Action/Act_User/AddUser.js"
import FindUser from "../Action/Act_User/FindUser.js";
import Login from "../Action/Act_User/Login.js";
import DeletUser from "../Action/Act_User/DeletUser.js";
import UpdetaUser from "../Action/Act_User/UpdetaUser.js";

import Auth from "../Middleware/Auth.js";

const router = Router();


// Public Routes

router

.post("/addUser",AddUser,(req,res)=>{
    
})

.post("/login",Login,(req,res)=>{

})

// Private Routes

.get("/:id",[Auth,FindUser],(req,res)=>{
    
})

.delete("/:id",[Auth,DeletUser],(req,res)=>{

})

.put("/:id",[Auth,UpdetaUser],(req,res)=>{

})

export default router