import { Router } from "express";
import { createTemplate, getTemplate } from "./templateController";
import { verifyUser } from "../../middleware/verify";

const router=Router();


router.post('/create-template',verifyUser,createTemplate);
router.get('/get-all-template',verifyUser,getTemplate);

export default router;