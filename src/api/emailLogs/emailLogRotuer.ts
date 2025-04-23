import { Router } from "express";
import { verifyUser } from "../../middleware/verify";
import { getEmailLogs } from "./emailLogController";
const router=Router();

router.get('/all-email-logs',verifyUser,getEmailLogs);

export default router;