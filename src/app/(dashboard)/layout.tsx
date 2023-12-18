import React from "react";
import SideBar from "../Components/SideBar";
import { Menu } from "lucide-react";
import { Mobilesidebar } from "../Components/mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="hidden z-40 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 ">
        <SideBar />
      </div>
      <div className="flex justify-between w-full absolute mt-4 px-6 top-0 sm:hidden">
        <Mobilesidebar />
        <UserButton />
      </div>

      <div className="lg:pl-72 md:pl-72 h-[100vh]  top-20">{children}</div>
    </div>
  );
};
export default DashboardLayout;
