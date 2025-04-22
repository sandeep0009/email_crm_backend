import { Queue } from "bullmq";

export const myQueue=new Queue('email_sender');