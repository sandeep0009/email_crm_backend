import mongoose, { Document ,Schema } from "mongoose";

export interface ISender extends Document{
    email:string,
    smtp_host:string,
    smtp_port:number,
    smtp_user:string,
    smtp_pass:string
}

const senderSchema=new Schema<ISender>({
    email:{
        type:String,
        required:true
    },
    smtp_host:{
        type:String,
        required:true
    },
    smtp_port:{
        type:Number,
        required:true
    },
    smtp_user:{
        type:String,
        required:true
    },
    smtp_pass:{
        type:String,
        required:true
    }
},{timestamps:true});

const Senders=mongoose.model('Sender',senderSchema);

export default Senders;