"use client"; // usePathname ishlashi uchun shart

import { Sidebar } from "@/components/admin/Sidebar";
import { AdminNavbar } from "@/components/admin/Navbar";
import { AuthProvider } from "@/components/Providers";
import { usePathname } from "next/navigation";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Agar hozirgi sahifa login sahifasi bo'lsa
  const isLoginPage = pathname === "/admin/login";

  // Login sahifasi uchun sidebar va navbarsiz oddiy ko'rinish
  if (isLoginPage) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 antialiased">
          {children}
        </div>
      </AuthProvider>
    );
  }

  // Qolgan barcha admin sahifalari uchun sidebar va navbarli ko'rinish
  return (
    <AuthProvider>
      <div className="flex min-h-screen antialiased bg-slate-50">
        {/* Sidebar chapda doimiy turadi */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Navbar tepada doimiy turadi */}
          <AdminNavbar />
          
          {/* Asosiy kontent */}
          <main className="p-4 md:p-8 flex-1">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}