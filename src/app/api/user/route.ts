import UserModel from "@/app/modals/User";
import { connect } from "@/dbCofig/dbConfig";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

// Establish MongoDB connection
connect();
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    const user = await UserModel.findOne({ userid: userId });
    if (user) {
      return NextResponse.json({ user });
    }
    const newuser = await UserModel.create({
      userid: userId,
    });
    await newuser.save();
    return NextResponse.json({ msg: "User not found" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {label}=body;
    const user = await UserModel.findOne({ userid: userId });
    if (user) {
      if(label==="chatcredits"){
        user.chatcredits += 1;
      }
      else{
        user.imgcredits+=1;
      }
      await user.save();
      return NextResponse.json({ user });
    }
    return NextResponse.json({ msg: "User not found" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
