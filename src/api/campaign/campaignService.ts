import Campaign from "../../models/campaignSchema";
import { myQueue } from "../../utils/bullmq";
import { calculateDelay } from "../../utils/util";


const create=async(
    body:any,
    id:string
):Promise<any>=>{
    const {name,template,recipients}=body;
 
    const new_campaign=await Campaign.create(
        {
            name,
            template,
            recipients,
            userId:id
        }
    );


    for(let entry of template){
       
        const delay=calculateDelay(entry.scheduled_time);
        
        await myQueue.add('sender_mail',new_campaign.toObject(),{delay});
    }


    return new_campaign;
}

export default {
    create
}