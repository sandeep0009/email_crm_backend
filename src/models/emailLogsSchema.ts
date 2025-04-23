import mongoose, { Document,ObjectId,Schema } from "mongoose";


export interface IEmailLogs extends Document {
  campaign_id: ObjectId;
  recipient_email: string;
  template_id: ObjectId;
  sender_id: ObjectId;
  scheduled_time: Date;
  status: "pending" | "failed" | "sent";
  sent_at: Date;
  userId:ObjectId
}

const emailLogSchema = new Schema<IEmailLogs>(
  {
    campaign_id: {
      type: mongoose.Types.ObjectId,
      ref: "Campaign",
    },
    recipient_email: {
      type: String,
    },
    template_id: {
      type: mongoose.Types.ObjectId,
      ref: "Template",
    },
    sender_id: {
      type: mongoose.Types.ObjectId,
      ref: "Sender",
    },
    scheduled_time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "failed", "sent"],
      required: true,
    },
    sent_at: {
      type: Date,
      required: true,
    },
    userId:{
            type:mongoose.Types.ObjectId,
            ref:'User'
    }
  },
  { timestamps: true }
);

const EmailLogs = mongoose.model<IEmailLogs>("EmailLog", emailLogSchema);

export default EmailLogs;
