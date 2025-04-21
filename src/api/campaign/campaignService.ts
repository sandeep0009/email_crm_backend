import Campaign from "../../models/campaignSchema";


const create=async(
    body:any
):Promise<any>=>{
    const {name,template,recipients}=body;
    const new_campaign=await Campaign.create(
        {
            name,
            template,
            recipients
        }
    );
    await new_campaign.save();
    return new_campaign;
}

export default {
    create
}