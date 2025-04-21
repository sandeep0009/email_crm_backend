import { Router } from "express";
import { createSender, getSender, getSenderById } from "./senderController";

const router=Router();


router.post('/create-sender',createSender);
router.get('/get-all-sender',getSender);
router.get('/sender/:id',getSenderById);


export default router;