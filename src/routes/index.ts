import { Router } from "express";
import userRouter from "../api/users/userRoute";
import templateRouter from "../api/template/templateRoute";


const router=Router();


router.use(userRouter);
router.use(templateRouter);


export default router;