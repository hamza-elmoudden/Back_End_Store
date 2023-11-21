import { Proudact } from "../../Model/Proudactes.js";


export default async function(req,res,next){

    console.log(req.params)

    if(!req.params.id){
        return res.status(400).send('No Req In Params')
    }

    try {
        
        const Pro = await Proudact.findOne({
            _id:req.params.id
        })

        if(!Pro){
            return res.status(400).send("Proudact Not Found")
        }


        if(String(Pro.Owner) !== req.decode.Id){
            return res.status(403).send('You are not authorized to delete this product')
        }

        await Pro.deleteOne()
        
       return next(res.status(200).send("Product Deleted Successfully"))
    } catch (error) {

        return res.status(500).json({message:"Error In Delete Proudact",error})
    }
}