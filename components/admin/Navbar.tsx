"use client";

import { User, LogOut, ChevronDown, Bell } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileSidebar } from "./MobileSidebar";

export function AdminNavbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="hidden sm:block font-bold text-slate-400 text-sm tracking-widest uppercase">
          ADMIN PANEL
        </div>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="h-8 w-[1px] bg-slate-100"></div>

        {/* PROFILE DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-xl transition-all outline-none">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-purple-100 font-bold">
                {session?.user?.name?.charAt(0) || "A"}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-black text-slate-900 leading-none">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Administrator
                </p>
              </div>
              <ChevronDown size={16} className="text-slate-400 hidden md:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 p-2 mt-2 rounded-2xl border-slate-100 shadow-2xl">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-black leading-none text-slate-900">
                  {session?.user?.name}
                </p>
                <p className="text-xs leading-none text-slate-500">
                  {session?.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-slate-50" />
            
            
            <DropdownMenuSeparator className="bg-slate-50" />
            
            <DropdownMenuItem 
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="p-3 rounded-xl cursor-pointer font-bold text-red-500 focus:bg-red-50 focus:text-red-600 gap-2"
            >
              <LogOut size={18} /> Tizimdan chiqish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}