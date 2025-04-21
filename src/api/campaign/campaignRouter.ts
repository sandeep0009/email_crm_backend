import { Router } from "express";import { createCampaign } from "./campaignController";
;

const router=Router();

router.post('/create-campaign',createCampaign);


export default router;