
import mongoose, { Document,ObjectId,Schema } from "mongoose";

export interface ITemplate extends Document{
    title:string,
    htmlCode:string,
    userId:ObjectId
}

const templateSchema=new Schema<ITemplate>({
    title:{
        type:String,
        required:true

    },
    htmlCode:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true});

const Template=mongoose.model<ITemplate>("Template",templateSchema);
export default Template;