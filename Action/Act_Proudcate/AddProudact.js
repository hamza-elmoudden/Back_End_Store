import { Proudact,ValidProudact } from "../../Model/Proudactes.js";

import _ from "lodash"


export default  async function(req,res,next){

    const Validpro = ValidProudact(req.body)
    
    console.log(req.decode.Id)
    
    if(!req.body){

        return res.status(400).sand("No req")
    }

    if(Validpro.error){

        return res.status(400).send(Validpro.error.details[0].message)
    }

    
    try {
        const Prod = new Proudact(_.pick(req.body,["title","categorie","description","price"]))
        
        Prod.Owner = req.decode.Id

        await Prod.save()

        return next(res.status(200).json({message:"Create Prudact ",Prudact:Prod._id}))

    } catch (error) {

        return res.status(500).json({message:"Error in Add Prodact",error})
    }
}
