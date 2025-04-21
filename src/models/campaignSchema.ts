
import mongoose, { Document,ObjectId,Schema } from "mongoose";

interface ITemplateEntry {
    template_id: ObjectId;
    sender_id: ObjectId;
    scheduled_time: string;
}
  
export interface ICampaign extends Document {
    name: string;
    template: ITemplateEntry[];
    recipients: string[];
}


const campaignSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    template:[
        {
            template_id:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:"Template"
            },
            sender_id:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:"Sender"
            },
            scheduled_time: {
                type: String,
                required: true,
            },
        }
    ],
    recipients: [
        {
          type: String,
          required: true,
        },
    ],
},{timestamps:true});

const Campaign=mongoose.model<ICampaign>('Campaign',campaignSchema);
export default Campaign;