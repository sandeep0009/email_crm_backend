import mongoose, { Document,Schema } from "mongoose";


export interface IUser extends Document{
    name:string,
    email:string,
    password:string
}

const userSchema= new Schema<IUser>({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }

},{timestamps:true});


const User= mongoose.model<IUser>('User',userSchema);

export default User;