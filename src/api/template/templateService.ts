import Template from "../../models/templateSchema";


const create=async(
    body:any,
    id:string
):Promise<any>=>{
    const {title,htmlCode}=body;

    const createTemplate=await Template.create({
        title,
        htmlCode,
        userId:id
    });


    return createTemplate;

}

const findAll=async(userId:string):Promise<any>=>{
    const data=await Template.find({userId});
    return data;

}


export default {
    create,
    findAll
}