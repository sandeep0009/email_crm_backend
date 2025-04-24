import { Worker } from "bullmq";
import Template from "../models/templateSchema";
import Senders from "../models/sendersSchema";
import { sendEmail } from "./sendMail";
import IORedis, { Redis } from "ioredis";

import mongoose from "mongoose";
import connectionDb from "../db/connection";
import EmailLogs from "../models/emailLogsSchema";


const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });


connectionDb().then(() => {
  const worker = new Worker('email_sender', async (job) => {

    const { template: templates, recipients,userId } = job.data;

    for (let temp of templates) {

      const { template_id, sender_id, scheduled_time } = temp;

      const template = await Template.findById(new mongoose.Types.ObjectId(template_id)).exec();
      const sender = await Senders.findById(new mongoose.Types.ObjectId(sender_id)).exec();

      if (!template || !sender) {
        console.error(`Template or Sender not found for template_id: ${template_id}, sender_id: ${sender_id}`);
        continue;
      }

      try {
        const result = await sendEmail({
          sender: sender,
          to: recipients,
          subject: template.title,
          body: template.htmlCode,
        });
        if (result) {
          for(let recipient_email of recipients){
            await EmailLogs.create({
              campaign_id: job.data.campaign_id,
              recipient_email,
              template_id,
              sender_id,
              scheduled_time: new Date(scheduled_time),
              status: result ? 'sent' : 'pending',
              sent_at: new Date(),
              userId
            })

          }
          
        }


      } catch (error) {
        console.error(`Error sending to ${recipients}:`, error);
        for(let recipient_email of recipients){
          await EmailLogs.create({
            campaign_id: job.data.campaign_id,
            recipient_email,
            template_id,
            sender_id,
            scheduled_time: new Date(scheduled_time),
            status: 'failed',
            sent_at: new Date(),
            userId
          })

        }
        

      }


    }
  }, { connection });

  worker.on('ready', () => {
    console.log('Worker connected to Redis and is ready to process jobs');
  });

}).catch((error) => {
  console.log('error', error);
})