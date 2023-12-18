"use client";
import { ArrowLeftIcon, MousePointer2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { IncreaseApiLimit, useApiLimit } from "@/app/libs/apilimit";
import { MAx_img } from "@/app/constants";
import { useProModal } from "@/app/hooks/useOpnemodal";

const Page = () => {
  const router = useRouter();
  const [prompt, setprompt] = useState("");
  const [imageurl, setimageurl] = useState("");
  const { data, isLoading, mutate } = useApiLimit();
  const pro = useProModal();
  const handlesubmit = async () => {
    if (!isLoading && data?.user?.imgcredits < MAx_img) {
      const res = await axios.post("/api/imagegeneration", {
        messages: prompt,
      });
      setprompt("");
      setimageurl(res.data);
      await IncreaseApiLimit("imgcredits");
    } else {
      pro.onOpen();
      mutate();
    }
  };
  return (
    <div className="flex h-full flex-col pt-5 pl-3 z-40">
      <div
        className="cursor-pointer hidden lg:block md:block pl-10 pt-5"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
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
        <div className="flex items-center mt-12 justify-center">
          {imageurl !== "" ? (
            <Image width={254} height={424} src={imageurl} alt="image" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
