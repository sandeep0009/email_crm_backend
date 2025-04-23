import { Router } from "express";
import { createSender, getSender, getSenderById } from "./senderController";
import { verifyUser } from "../../middleware/verify";

const router=Router();


router.post('/create-sender',verifyUser,createSender);
router.get('/get-all-sender',verifyUser,getSender);
router.get('/sender/:id',getSenderById);


export default router;