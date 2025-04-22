import { Worker } from "bullmq";
import Template from "../models/templateSchema";
import Senders from "../models/sendersSchema";
import { sendEmail } from "./sendMail";
import IORedis from "ioredis";
import { myQueue } from "./bullmq";
import { calculateDelay } from "./util";
import mongoose from "mongoose";
import connectionDb from "../db/connection";


const connection=new IORedis({ maxRetriesPerRequest: null });
connectionDb().then(()=>{
    const worker=new Worker('email_sender',async(job)=>{

        const { template: templates, recipients } = job.data;

        for(let temp of templates){

            const {template_id,sender_id}=temp;

            const template = await Template.findById(new mongoose.Types.ObjectId(template_id)).exec();
            const sender = await Senders.findById(new mongoose.Types.ObjectId(sender_id)).exec();
        
            if (!template || !sender) {
                console.error(`Template or Sender not found for template_id: ${template_id}, sender_id: ${sender_id}`);
                continue;
            }
            
    
            const result = await sendEmail({
                from: sender.email,
                to: recipients,
                subject: template.title,
                body: template.htmlCode,
              });
              console.log(result);
        }
    },{connection});
    
    worker.on('ready', () => {
        console.log('Worker connected to Redis and is ready to process jobs');
    });

}).catch((error)=>{
    console.log('error',error);
})
