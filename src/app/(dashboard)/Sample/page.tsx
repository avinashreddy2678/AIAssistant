"use client";
import React, {  useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const handle = async () => {
    try {
      const res = await axios.post("/api/openai", { messages: data });
      //setResponse((pre)=>([...prev,res.data]));
      setResponse(res.data[0].url);
      setData("");
    } catch (err: any) {
      setError("Error: " + (err.message || "An error occurred"));
    }
  };
  const handleclear = () => {
    setResponse([]);
  };
  return (
    <div>
      <input
        type="text"
        className="border-1"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
      <button onClick={() => handle()}>Ask Your genius assistent</button>
      <UserButton afterSignOutUrl="/"/>
      <h1>Assisstent</h1>
      {response != undefined ? response : ""}

      {/* {response} <br /> */}
    </div>
  );
};

export default HomePage;
