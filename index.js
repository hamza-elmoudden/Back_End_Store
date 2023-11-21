import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from "helmet";
import User from "./Router/User.js";
import Proudacte from './Router/Proudacte.js';
import Order from "./Router/Order.js"
import logger from './confige/logger.js';


import dotenv from "dotenv"



dotenv.config()




const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(helmet());
app.use(logger)
// Connect MongoDB at default port 27017.
mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;

// Handle MongoDB connection events
db.on('connected', () => {
  console.log('MongoDB Connection Succeeded.');
});

db.on('error', (err) => {
  console.log('Error in DB connection: ' + err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Router 
app.use("/Order",Order)
app.use("/",User)
app.use("/Prodacte",Proudacte)
