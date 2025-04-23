
import { Request, Response } from "express"
import { STATS_MSG, STATUS_ERROR } from "../../constant/constant";
import service from "./emailLogService";
export const getEmailLogs = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ message: "INVALID Request" });
        }
        const data = await service.findAll(userId);
        if (!data) {
            return res.status(404).json({ message: STATUS_ERROR.DATA_ERROR });
        }
        return res.status(201).json({ message: STATS_MSG.GET, data });
    } catch (error) {
        console.log("error in backend of email-logs", error);
        return res.status(500).json({ message: STATUS_ERROR.API_ERROR });

    }
}