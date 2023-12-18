"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";
const Page = () => {
  
  return (
    <div className="flex min-h-full items-center flex-col justify-center">
      <SignUp/>
    </div>
  );
};

export default Page;
