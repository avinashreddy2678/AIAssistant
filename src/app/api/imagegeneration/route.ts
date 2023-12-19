import UserModel from "@/app/modals/User";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {userId} = auth();
    const { messages } = body;
    //console.log(messages)
    const user = await UserModel.findOne({ userid: userId });
    //console.log(userId);
    if (user) {
      const newmessage={
        text:messages,
        label:"user"
      }
      //console.log(newmessage);
      await user.img.push(newmessage);
      const completion = await openai.images.generate({
        // model: "dall-e-3",
        prompt: messages,
        n: 1,
        size: "1024x1024",
      });
      
      const image_url = completion.data[0].url;
      const newreply={
        text:image_url,
        label:"bot"
      }
      await user.img.push(newreply);
      await user.save()
      return NextResponse.json(image_url);
    
    }
  } catch (err) {
    return NextResponse.json(err+"hwllo");
  }
}
