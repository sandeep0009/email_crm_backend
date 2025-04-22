import nodemailer from "nodemailer";

interface EmailOption {
  from: string;
  to: string[];
  subject: string;
  body: string;
}

export async function sendEmail({ from, to, subject, body }: EmailOption) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
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
      console.log(`Email sent to ${recipient}: ${info.messageId}`);
      results.push({ recipient, success: true, messageId: info.messageId });
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
      results.push({ recipient, success: false, error });
    }
  }

  return results;
}
