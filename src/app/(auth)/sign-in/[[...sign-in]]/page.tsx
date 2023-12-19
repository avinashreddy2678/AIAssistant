"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
const Page = () => {
  return (
    <div className="flex min-h-full items-center flex-col justify-center px-6 py-12 lg:px-8">
      <SignIn/>
    </div>
  );
};

export default Page;
