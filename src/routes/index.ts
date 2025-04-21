import { Router } from "express";
import userRouter from "../api/users/userRoute";


const router=Router();


router.use(userRouter);


export default router;