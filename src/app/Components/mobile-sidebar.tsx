import { Menu } from "lucide-react"
import {  Sheet,
    SheetContent,
   SheetTrigger } from "./ui/sheet"
import SideBar from "./SideBar"
  

export function Mobilesidebar() {
  return (
    <>
    <Sheet>
    <SheetTrigger>
        <Menu size={30} color="black" />
    </SheetTrigger>
    <SheetContent>
      <SideBar/>
    </SheetContent>
  </Sheet>
  </>
  )
}
