import mongoose from 'mongoose'
import express from 'events'
import bodyParser from 'body-parser'

import UserRouter from './Routers/UserRouter'

require('dotenv').config();

const app = express()

app.use("/user",UserRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server Started at ",process.env.PORT);
    
})