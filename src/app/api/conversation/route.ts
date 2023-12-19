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
    const { userId } = auth();
    const { messages } = body;
    const user = await UserModel.findOne({ userid: userId });
    if (user) {
      const newmessage={
        text:messages,
        label:"user"
      }
      user.messages.push(newmessage);
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: "" + messages,
          },
        ],
      });
      const newreply={
        text:completion.choices[0].message.content,
        label:"bot"
      }
      await user.messages.push(newreply);
      await user.save();
      return NextResponse.json(completion.choices[0].message.content);
    } else {
      return NextResponse.json("No user found");
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
