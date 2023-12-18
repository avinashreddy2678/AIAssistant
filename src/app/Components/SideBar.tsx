"use client";
import React from "react";

import { Icon, ImageIcon, MessageSquare, Pen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { UserButton, useUser } from "@clerk/nextjs";
const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const routers = [
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
    <div className="flex h-full flex-col pt-5 pl-3 justify-between z-40 bg-gray-900">
      <div>
        <div
          onClick={() => router.push("/")}
          className="title cursor-pointer text-white flex py-3"
        >
          <div className="relative h-8 w-8 mr-4 pt-1 text-50">
            <Pen/>
          </div>
          <h1 className="font-bold text-3xl">AI   Assistant</h1>
        </div>
        <div className="mt-10">
          {routers.map((route: { href: string; label: string; icon: Icon }) => (
            <div key={route.href} className="my-2">
              <Link
                key={route.href}
                href={route.href}
                className={` ${
                  route.href === pathname ? "bg-slate-700 text-white " : ""
                }text-sm group flex p-3 w-full justify-start font-medium text-white cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition`}
              >
                <div className="flex items-center flex-1">
                  <route.icon className="w-4 h-4 mr-3" />
                  {route.label}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8 ml-3 hidden lg:flex md:flex item-center text-white">
        <UserButton afterSignOutUrl="/" />
        <p className="ml-3 font-mono mt-1">{user?.fullName}</p>
      </div>
    </div>
  );
};

export default SideBar;
