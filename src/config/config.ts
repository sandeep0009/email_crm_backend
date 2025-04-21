
import dotenv from "dotenv";

dotenv.config();

export const DB_URI=process.env.DB_URI ?? "";
export const PORT=process.env.PORT

export const JWT_SECRET=process.env.JWT_SECRET || "random@123"