import { Router } from "express";
import userRouter from "../api/users/userRoute";
import templateRouter from "../api/template/templateRoute";
import senderRouter from "../api/senders/senderRotue";
import campaignRouter from "../api/campaign/campaignRouter";
import emailLogRouter from "../api/emailLogs/emailLogRotuer";


const router=Router();


router.use(userRouter);
router.use(templateRouter);
router.use(senderRouter);
router.use(campaignRouter);
router.use(emailLogRouter);

export default router;