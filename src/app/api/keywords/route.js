import { Keyword } from "@/models/keyword.model.js";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth].js";
import {doGoogleSearch} from "@/lib/rankingFunctions";
import { Result } from "@/models/result.model.js";
export async function POST(req){
    mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
    const data = await req.json();
    const session = await getServerSession(authOptions)
    const keywordDoc = await Keyword.create({
        domain:data.domain,
        keyword:data.keyword,
        owner:session.user.email
    })
    const responseId = await doGoogleSearch(data.keyword);
    await Result.create({
        domain: data.domain,
        keyword: data.keyword,
        brightDataResponseId: responseId,
      });
    return Response.json(keywordDoc)
}

export async function GET(req){
    const url = new URL(req.url);
    const domain = url.searchParams.get('domain');
    console.log("domain", domain)
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected")
    const session = await getServerSession(authOptions);
   
    console.log(url,'URL')
 
   return Response.json(
    await Keyword.find({domain})
   )
}

export async function DELETE(req) {
    const url = new URL(req.url);
    const domain = url.searchParams.get('domain');
    const keyword = url.searchParams.get('keyword');
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    await Keyword.deleteOne({domain,keyword,owner:session.user.email});
    return Response.json(true);
  }