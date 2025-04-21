import express from "express";
import { PORT } from "./config/config";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());


const port=PORT;


app.listen(port,()=>{
    console.log(`Server connected: ${port}`);
})