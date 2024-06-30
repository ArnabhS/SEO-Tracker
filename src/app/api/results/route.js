import axios from "axios";
import mongoose from "mongoose";

export async function POST(req){
    // mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const response_id = data.response_id;
    const url = 'https://api.brightdata.com/serp/get_result?customer=hl_9c85b7f3&zone=rank_tracker&response_id='+ response_id;
    const headers = {'Authorization': 'Bearer '+process.env.BRIGHTDATA_API_KEY};
    const response = await axios.get(url, {headers});
    
    return Response.json(true)
}