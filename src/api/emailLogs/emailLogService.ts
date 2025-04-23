import EmailLogs from "../../models/emailLogsSchema"


const findAll=async(userId:string)=>{
    const data=await EmailLogs.find({userId});
    return data;
}

export default {
    findAll
}