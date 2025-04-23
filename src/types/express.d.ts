
import "express";

declare global {
    namespace Express {
        export interface Request {
            userId?: string;
        }
    }
}


export interface JwtPayload{
   userId:string
}

export {}