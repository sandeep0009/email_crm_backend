import Template from "../../models/templateSchema";


const create=async(
    body:any
):Promise<any>=>{
    const {title,htmlCode}=body;

    const createTemplate=await Template.create({
        title,
        htmlCode
    });


    return createTemplate;

}

const findAll=async():Promise<any>=>{
    const data=await Template.find();
    return data;

}


export default {
    create,
    findAll
}