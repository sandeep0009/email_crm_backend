import nodemailer from "nodemailer";

interface EmailOption {
  from: string;
  to: string[];
  subject: string;
  body: string;
}

export async function sendEmail({ from, to, subject, body }: EmailOption) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS  
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
        from,
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
