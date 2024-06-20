import express from 'express';
import dbConnect from './utils/db.js';
import dotenv from 'dotenv';
import routers from './routes/routes.js'
import cors from 'cors'



dotenv.config()

const app = express();

dbConnect();
app.use(express.json());
app.use(cors());

 app.use('/api',routers)
app.listen(process.env.PORT, ()=>{
    console.log(`hello from server ${process.env.PORT}`);
})






