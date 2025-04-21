import { Request, Response } from "express";
import { STATS_MSG, STATUS_ERROR } from "../../constant/constant";
import service from "./userService";



export const signUp=async(
    req:Request,
    res:Response
):Promise<any>=>{
    console.log(req.body);
    try {
        const data=await service.signUp(req.body);
        if(!data){
            return res.status(400).json({message:STATUS_ERROR.DATA_ERROR});
        }
        return res.status(200).json({message:STATS_MSG.LOGGED_IN,data});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:STATUS_ERROR.API_ERROR});
        
    }
}

export const signIn=async(
    req:Request | any,
    res:Response
):Promise<any>=>{
    try {
        
        const data=await service.signIn(req);
        if(!data){
            return res.status(400).json({message:STATUS_ERROR.DATA_ERROR});
        }
        return res.status(201).json({message:STATS_MSG.CREATE,data});
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:STATUS_ERROR.API_ERROR});
        
    }
}

