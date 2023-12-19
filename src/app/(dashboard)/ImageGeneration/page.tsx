"use client";
import { ArrowLeftIcon, BotIcon, MousePointer2, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IncreaseApiLimit, useApiLimit } from "@/app/libs/apilimit";
import { MAx_img } from "@/app/constants";
import { useProModal } from "@/app/hooks/useOpnemodal";
import { Card } from "@/app/Components/ui/card";
import OpenModal from "@/app/Components/OpenModal";

const Page = () => {
  const router = useRouter();
  const [prompt, setprompt] = useState("");
  // const [imageurl, setimageurl] = useState("");
  const { data, isLoading, mutate } = useApiLimit();
  const [answer, setanswer] = useState([]);
  const pro = useProModal();
  //console.log(answer);
  const handlesubmit = async () => {
    if (!isLoading && data?.user?.imgcredits < MAx_img) {
      const res = await axios.post("/api/imagegeneration", {
        messages: prompt,
      });
      setprompt("");
      // setimageurl(res.data);
      //console.log(res.data);
      await IncreaseApiLimit("imgcredits");
    } else {
      pro.onOpen();
      mutate();
    }
  };
  useEffect(() => {
    if (!isLoading) {
      setanswer(data?.user?.img);
    }
  }, [isLoading, data?.user?.img]);
  return (
    <div className="flex h-full flex-col pt-5 pl-3 z-40">
      <div
        className="cursor-pointer hidden lg:block md:block pl-10 pt-5"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
        {pro ? <OpenModal/> : ""}
      </div>
      <div className="text-4xl mt-12 font-bold text-center">
        AI Image Generator
      </div>
      <div className="flex h-full flex-col mt-10 pl-3 z-40">
        <div className=" mx-auto mb-2 flex bottom-0 relative">
          <div>
            <input
              onChange={(e) => {
                setprompt(e.target.value);
              }}
              type="text"
              className="py-3 rounded-lg w-[60vw] border border-black pl-8 pr-4"
              placeholder="Type here..."
              value={prompt}
            />
            <div
              onClick={() => {
                handlesubmit();
              }}
              className=" cursor-pointer justify-center pr-4 absolute inset-y-0 right-0 flex items-center pl-2"
            >
              <MousePointer2 />
            </div>
          </div>
        </div>
        {answer.length > 0 &&
        answer.map((item: { label: string; text: string }) => (
          <div key={item.text}>
            {item.label === "user" ? (
              <Card className="py-2 w-[60vw] mt-12  m-auto px-3 bottom-12 my-4">
                <div className=" flex justify-start items-center">
                  <div className="p-2 mr-10 rounded-full bg-green-400">
                    <UserIcon />
                  </div>
                  <div>{item.text}</div>
                </div>
              </Card>
            ) : (
              <div className=" flex  justify-center mt-12 items-center">
                <Image width={254} height={424} src={item.text} alt="image" />
                <div className="p-2 ml-10  rounded-full bg-pink-400">
                  <BotIcon />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default Page;
