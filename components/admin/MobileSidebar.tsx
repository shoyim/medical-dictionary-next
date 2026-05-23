"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sahifa o'zgarganda sidebar yopilishi uchun
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 md:hidden hover:bg-slate-100 rounded-lg transition-colors">
          <Menu size={24} className="text-slate-600" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SheetHeader className="sr-only">
          <SheetTitle>Admin menyu</SheetTitle>
          <SheetDescription>Admin navigatsiya paneli</SheetDescription>
        </SheetHeader>
        <div className="h-full flex flex-col bg-white">
           <Sidebar isMobile />
        </div>
      </SheetContent>
    </Sheet>
  );
}