import { Domain } from "@/models/domain.model";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route.js"
import { JSDOM } from 'jsdom';
import axios from "axios";
import { Keyword } from "@/models/keyword.model.js";
import { Result } from "@/models/result.model.js";

async function getIconUrl(domain) {
  try {
    const response = await axios.get(`https://${domain}`);
    const dom = new JSDOM(response.data);
    const links = dom.window.document.getElementsByTagName('link');
    let href = '';

    for (const link of links) {
      const rel = link.getAttribute('rel') || '';
      if (rel.includes('icon')) {
        href = link.getAttribute('href');
        if (href) break;
      }
    }

    if (href.includes('://')) {
      return href;
    } else {
      return `https://${domain}${href.startsWith('/') ? '' : '/'}${href}`;
    }
  } catch (error) {
    console.error('Error fetching icon URL:', error);
    return '';
  }
  }

  export async function POST(req) {
    const data = await req.json();
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    let icon = null;
    try {
      icon = await getIconUrl(data?.domain);
    } catch(e) {
      console.error(e);
    }
    const doc = await Domain.create({
      domain: data?.domain,
      owner: session?.user?.email,
      icon,
    });
    console.log(doc, doc)
    return Response.json(doc);
  }

  export async function GET() {
    mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOptions);
    const email = session.user?.email;
    const domains = await Domain.find({owner:email});
    const keywords= await Keyword.find(
      {
        owner: email, 
        domain: domains.map(doc=> doc.domain)
      
      })
      const results = await Result.find({
        domain:domains.map(doc => doc.domain),
        keyword:keywords.map(doc => doc.keyword)
      });
    return Response.json({domains, keywords, results});
  }

  export async function DELETE(req) {
    mongoose.connect(process.env.MONGODB_URI);
    const url = new URL(req.url);
    const domain = url.searchParams.get('domain');
    const session = await getServerSession(authOptions);
    await Domain.deleteOne({owner:session.user?.email,domain});
    return Response.json(true);
  }