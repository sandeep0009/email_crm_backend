
import mongoose from "mongoose";
import { DB_URI } from "../config/config";

const connectionDb=async()=>{
    try {
        await mongoose.connect(DB_URI);
        
        console.log("connected to backend");
    } catch (error) {
        console.log("error in backend database",error);

        
    }

}

export default connectionDb