
import mongoose, { Document,Schema } from "mongoose";

export interface ITemplate extends Document{
    title:string,
    htmlCode:string
}

const templateSchema=new Schema<ITemplate>({
    title:{
        type:String,
        required:true

    },
    htmlCode:{
        type:String,
        required:true
    }
},{timestamps:true});

const Template=mongoose.model<ITemplate>("Template",templateSchema);
export default Template;