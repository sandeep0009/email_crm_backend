import { Router } from "express";
import { createTemplate, getTemplate } from "./templateController";

const router=Router();


router.post('/create-template',createTemplate);
router.get('/get-all-template',getTemplate);

export default router;