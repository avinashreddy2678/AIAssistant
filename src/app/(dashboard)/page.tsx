"use client";
import React, { useState } from "react";

import TypewriterComponent from "typewriter-effect";
import { Card } from "../Components/ui/card";
import { ArrowRight, ImageIcon, Info, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/ui/dialogbox";

const Page = () => {
  const router = useRouter();
  const tools = [
    {
      href: "/Conversation",
      label: "Conversation",
      icon: MessageSquare,
    },
    {
      href: "/ImageGeneration",
      label: "Image Generation",
      icon: ImageIcon,
    },
  ];
  return (
    <div className="space-y-4 pt-10 flex flex-col  justify-center">
      <h2 className="text-2xl mt-4 lg:text-4xl md:text-3xl text-center font-bold">
        Make Use of AI
      </h2>
      <h4 className="text-center text-lg lg:text-2xl md:text-2xl">
        Chat or Generate an image with AI 
      </h4>
      <div className="pt-10 px-10 md:px-20 lg:px-36 space-y-4">
        {tools.map((tool) => (
          <div
            key={tool.href}
            onClick={() => {
              router.push(tool.href);
            }}
            className="m-auto"
          >
            <Card className="p-4 border-black/5 flex items-center gap-x-4 justify-between hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-x-4">
                <tool.icon className="w-5 h-5" />
                <div className="font-bold">{tool.label}</div>
              </div>
              <div>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="font-bold pt-10 text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-50 to-blue-900">
        <TypewriterComponent
          options={{
            strings: [
              "After Hello World.",
              "Machine Learing.",
              "Block Chain.",
              "Deep Learing.",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="flex items-center justify-center pt-10">
        <Dialog>
          <DialogTrigger>
            <div className="flex btn text-white btn-success">
              <Info color="white" />
              Must Read
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                &quot;I&apos;ve designed this app with a free trial of OpenAI since
                I&apos;m not currently earning. Feel free to 
                features for free. You can figure out how it works with a few
                clicks. I&apos;ve also integrated this with payment gateways, and
                you can try that too! 😂 On a successful transaction, you will
                also be able to generate one more image.&quot;
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Page;
