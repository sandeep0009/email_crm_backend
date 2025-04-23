import { Request } from "express";
import User from "../../models/userSceham";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config";

const signUp=async(
    body:any
):Promise<any>=>{
    console.log(body);
    const {email,password,name}=body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return null;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword,
        name
    });

    const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };

}
const signIn=async(
    req:Request
    
):Promise<any>=>{
    const {email,password}=req.body

    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email},
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { token };

}








export default {
    signIn,
    signUp
}