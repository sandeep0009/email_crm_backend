import express from "express";
import { PORT } from "./config/config";
import cors from "cors";
import connectionDb from "./db/connection";
import router from "./routes";

const app=express();
app.use(express.json());
app.use(cors());


const port=PORT;

connectionDb();

app.use(router);


app.listen(port,()=>{
    console.log(`Server connected: ${port}`);
})