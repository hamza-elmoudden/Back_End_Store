import { Proudact } from "../../Model/Proudactes.js";



export default async function(req,res,next){
    try {
        const {gte = 0,lte = 10000,page = 1,limit = 10} = req.query
        // Find all Prodact posts, sorted by name.
        const Pro = await Proudact.find({}).populate("Owner","name")
        .sort("price")
        .where("price").gt(gte -1).lt(lte +1)
        .limit(limit *1)
        .skip((page -1) * limit).exec()
        
        await Promise.all(
            Pro.map(async (e) => {
              await e.populate("like", "name _id");
                     
            }))

        if(!Pro){
            return res.status(400).json({message:"No List Proudact",data:Pro})
        }
            return next(res.status(200).send({message:"Prodact List Found",data:Pro}))
    } catch (error) {
        return res.status(500).json({message:'Proudact Not found',error})
    }

}