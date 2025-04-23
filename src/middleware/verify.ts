import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { JwtPayload } from "../types/express";

export const verifyUser=async(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<any>=>{
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if(!token){
            res.status(401).json({message:"TOKEN INVALID"});
            return;
        }
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload;
      
       
        req.userId = decoded.userId;
        console.log("req",req.userId)
        next();

        
    } catch (error) {
        res.status(404).json({message:"ERROR IN MIDDLEWARE"});
        
    }

}