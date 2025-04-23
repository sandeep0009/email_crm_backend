import { Request, Response } from "express";
import { STATS_MSG, STATUS_ERROR } from "../../constant/constant";
import service from "./templateService";

export const createTemplate=async(
    req:Request,
    res:Response
):Promise<any>=>{
    try {
        const userId = req.userId;
        if(!userId){
            return res.status(400).json({message:"INVALID Request"});
        }
        const data =await service.create(req.body,userId);
        if(!data){
            return res.status(404).json({message:STATUS_ERROR.DATA_ERROR});
        }
        return res.status(201).json({message:STATS_MSG.CREATE,data});
        
    } catch (error) {
        console.log("error in template api",error);
        return res.status(400).json({message:STATUS_ERROR.API_ERROR});
        
    }
}


export const getTemplate=async(
    req:Request,
    res:Response
):Promise<any>=>{
    try {
        const id=req.userId;
        if(!id){
            return res.status(400).json({message:"INVALID Request"});
        }
        const data=await service.findAll(id);
        if(!data){
            return res.status(404).json({message:STATUS_ERROR.DATA_ERROR});
        }
        return res.status(200).json({message:STATS_MSG.GET,data});

        
        
    } catch (error) {
        console.log("error in template api",error);
        return res.status(400).json({message:STATUS_ERROR.API_ERROR});
        
    }
}

export const removeTemplate=async(
    req:Request,
    res:Response
):Promise<any>=>{
    try {
        
    } catch (error) {
        console.log("error in template api",error);
        return res.status(400).json({message:STATUS_ERROR.API_ERROR});
        
    }
}