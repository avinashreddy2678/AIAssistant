"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "./fetcher";
const useApiLimit = () => {
  const {data,error,isLoading,mutate}=useSWR("/api/user",fetcher);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/api/user");
  //       const {data,error,isLoading,mutate}=useSWR("/api/users/allposts",fetcher);
  //       setChatCredits(res.data.user.chatcredits);
  //       setImgCredits(res.data.user.imgcredits);
  //     } catch (error) {
  //       console.error("Error fetching data:");
  //     }
  //   };

  //   fetchData();
  // }, []);
  //console.log(data);
  return { data,isLoading,mutate };
};

const IncreaseApiLimit = async (label:string) => {
  try {
    await axios.post("/api/user",{label});
  } catch (error) {
    console.error("Error fetching data:");
  }
};

export { useApiLimit, IncreaseApiLimit };
