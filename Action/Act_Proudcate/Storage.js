import multer from 'multer';
import path from 'path';
import { Proudact } from '../../Model/Proudactes.js';
import * as fs from "fs"


function isImageFile(fileName) {

    const extension = fileName.split('.').pop().toLowerCase();
  
    // Check if the extension corresponds to an image format
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].indexOf(extension) !== -1;
  }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
 
    if(!isImageFile(file.originalname)){
        return cb(new Error("Your file is not an image"));
    }

    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
    
  

});

const upload = multer({ storage: storage }).single('image');

export default async function (req, res, next) {
  if (!req.params.id) {
    return res.status(400).send("No Req In Params");
  }

  if (!req.decode) {
    return res.status(400).send("No Req Decode");
  }

  try {
    const Pro = await Proudact.findOne({
      _id: req.params.id
    });

    if (!Pro) {
      return res.status(400).send("No Proudact Found");
    }

    if (req.decode.Id !== String(Pro.Owner)) {
      return res.status(403).send('You Not Autorisation To add Image to This Proudacte');
    }

    // Use the upload middleware for handling the image upload
    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // If you reach here, the file has been successfully uploaded
      if(Pro.image === null){

        // Pro.image = req.file.path
       await Pro.updateOne({
          image: req.file.path
        })

      }else{
        
        fs.unlinkSync(path.join(Pro.image),function(error){
          console.log(error)
        })

       await Pro.updateOne({
          image: req.file.path,
        })
      }


      await Pro.save();

      res.status(200).send("Upload Image");
      return next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Error in Upload Image To Proudacte", error });
  }
}
