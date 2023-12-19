"use client";
import { Card } from "@/app/Components/ui/card";
import axios from "axios";
import { ArrowLeftIcon, BotIcon, MousePointer2, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import React, { useEffect, useState } from "react";
import { IncreaseApiLimit, useApiLimit } from "@/app/libs/apilimit";
import { MAx_chat } from "@/app/constants";
import OpenModal from "@/app/Components/OpenModal";
import { useProModal } from "@/app/hooks/useOpnemodal";

interface Question {
  text: string;
  label: string;
  time: Date;
}

const ConvoPage = () => {
  const router = useRouter();

  const { data, isLoading, mutate } = useApiLimit();
  const [question, setquestion] = useState("");
  const [alltexts, setalltexts] = useState<Question[]>([]);
  const [loading, setloading] = useState(false);

  const pro = useProModal();
  const handleEnter = async (e: any) => {
    e.preventDefault();
    if (!isLoading && data?.user?.chatcredits < MAx_chat) {
      const newQuestion = {
        text: question,
        from: "user",
        time: new Date(),
      };

      //setalltexts((prev: any) => [...prev, newQuestion]);
      setloading(true);
      const res = await axios.post("/api/conversation", { messages: question });
      setloading(false);
      const reply = {
        text: res.data,
        from: "bot",
        time: new Date(),
      };
      //setalltexts((prev: any) => [...prev, reply]);
      await IncreaseApiLimit("chatcredits");
      mutate();
    } else {
       pro.onOpen();
      mutate();
    }
    setloading(false);
    setquestion("");
  };


  useEffect(() => {
    if (!isLoading) {
      setalltexts(data?.user?.messages);
    }
  }, [isLoading, data?.user?.messages]);
  return (
    <div className="flex h-full flex-col pt-5 pl-3 justify-between z-40">
      <div
        className="cursor-pointer hidden lg:block md:block pl-10 pt-5"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeftIcon />
        {pro ? <OpenModal /> : ""}
      </div>
      <div className="flex h-[88vh] lg:h-[80vh] my-auto overflow-scroll scrollbar-hide flex-col mt-10 lg:mt-5 pl-3 justify-between z-40">
        <div className="px-10 my-auto md:px-20 lg:px-36 space-y-4">
          {alltexts.length <= 0 ? (
            <>
              <h1 className="text-center">No conversation strated</h1>
            </>
          ) : (
            ""
          )}
          {alltexts.map((item) => (
            <div key={item.text}>
              <Card className="py-2 px-3 bottom-12 my-4">
                {item.label === "user" ? (
                  <div className=" flex justify-end items-center">
                    <div className=" font-bold">{item.text}</div>
                    <div className="p-2 ml-10 rounded-full bg-pink-400">
                      <UserIcon />
                    </div>
                  </div>
                ) : (
                  <div className=" flex justify-start items-center">
                    <div className="p-2 mr-10 rounded-full bg-green-400">
                      <BotIcon />
                    </div>
                    <div>{item.text}</div>
                  </div>
                )}
              </Card>
            </div>
          ))}
          <div className="text-center flex items-center justify-center  mt-3">
            {loading ? (
              <>
                <ClipLoader
                  color="black"
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="pr-3"
                />
                Wait
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="fixed inset-x-0 bottom-0 p-4 ml-16 text-center">
          <form
            onSubmit={handleEnter}
            className="inline-block ml-12 lg:ml-48 md:ml-32"
          >
            <input
              type="text"
              className="py-3 w-[55vw] rounded-lg border border-black pl-8 pr-4"
              placeholder="Type here..."
              value={question}
              onChange={(e) => {
                setquestion(e.target.value);
              }}
            />
            <button type="submit" className="ml-2">
              <MousePointer2 />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConvoPage;
