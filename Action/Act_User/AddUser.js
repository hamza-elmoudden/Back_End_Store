import { User, ValidUser } from "../../Model/Users.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import dotenv from "dotenv";

dotenv.config()


export default async function createUser(req, res, next) {
  // Validate email format
  const Valid = ValidUser(req.body)

  if (Valid.error) {

    return res.status(400).send(Valid.error.details[0].message);
  }

  // Check if user already exists
  let user = await User.findOne({email:req.body.email,})


  if (user) {
    return res.status(400).send("User Already Exists");
  }

  // Create and save new user
  try {

    user =  new User(_.pick(req.body,["name", "email", "mobile", "password", "vendor"]));
    console.log("save"+user)
    const saltRounds = 8;
    const salt = bcrypt.genSaltSync(saltRounds);
    user.password = bcrypt.hashSync(user.password,salt);
    
    await user.save();
    const token = await user.Generate_token()
    return next(res.status(200).json({ message: "User added" ,Token:token}));

  } catch (error) {
      // Handle other errors
      return res.status(500).json({ message: "Unexpected error adding user", error });
  }

}