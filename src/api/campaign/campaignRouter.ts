import { Router } from "express";import { createCampaign } from "./campaignController";
import { verifyUser } from "../../middleware/verify";
;

const router=Router();

router.post('/create-campaign',verifyUser,createCampaign);


export default router;