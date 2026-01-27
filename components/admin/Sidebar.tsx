"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookText, Languages, LogOut, Stethoscope } from "lucide-react";
import { signOut } from "next-auth/react";

export function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Tillar", href: "/admin/languages", icon: <Languages size={20} /> },
    { name: "Terminlar", href: "/admin/terms", icon: <BookText size={20} /> },
    { name: "Qisqartmalar", href: "/admin/abbreviations", icon: <Languages size={20} /> },
  ];

  return (
    <aside className={`${isMobile ? "flex" : "hidden md:flex"} w-64 bg-white border-r flex-col h-screen sticky top-0`}>
        <div className="p-6 flex items-center gap-3 border-b">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <Stethoscope size={20} />
        </div>
        <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Admin</h2>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                isActive 
                ? "bg-blue-600 text-white shadow-md shadow-blue-100" 
                : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={20} /> Chiqish
        </button>
      </div>
    </aside>
  );
}