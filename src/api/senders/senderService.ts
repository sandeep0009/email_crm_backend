import Senders from "../../models/sendersSchema";
import { encrypt } from "../../utils/encryption";


const create=async(
    body:any
):Promise<any>=>{
    const {email,smtp_host,smtp_port,smtp_user,smtp_pass}=body;

    const encryptedDetail=encrypt(smtp_pass);
    const new_sender=await Senders.create({
        email,
        smtp_host,
        smtp_port,
        smtp_user,
        smtp_pass:encryptedDetail
    });
    await new_sender.save();
    return new_sender;

}


const findAll=async():Promise<any>=>{
    const data=await Senders.find();
    return data;

}

const findById=async(id:string):Promise<any>=>{
    const data=await Senders.findById(id);
    return data;

}


export default {
    create,
    findAll,
    findById
}