import nodemailer from "nodemailer";
import { ISender } from "../models/sendersSchema";
import { decrypt } from "./encryption";

interface EmailOption {
  sender: ISender;
  to: string[];
  subject: string;
  body: string;
}

export async function sendEmail({ sender, to, subject, body }: EmailOption) {

  const{smtp_host,smtp_port,smtp_pass,smtp_user,email}=sender;
  const decryptPass=decrypt(smtp_pass)
  const transporter = nodemailer.createTransport({
    host: smtp_host,
    port: smtp_port,
    secure: false,
    auth: {
      user: smtp_user,
      pass: decryptPass 
    },
    pool: true, 
    maxConnections: 5, 
    maxMessages: 100, 
    rateDelta: 1000,
    rateLimit: 5
  });
  const results = [];

  for (let recipient of to) {

    try {
      const info = await transporter.sendMail({
        from:email,
        to: recipient,
        subject,
        html: body,
      });
      results.push({ recipient, success: true, messageId: info.messageId });
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
      results.push({ recipient, success: false, error });
    }
  }

  return results;
}
