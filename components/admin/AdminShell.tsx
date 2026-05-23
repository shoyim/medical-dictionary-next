"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminNavbar } from "@/components/admin/Navbar";
import { AuthProvider } from "@/components/Providers";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="flex min-h-screen antialiased bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <AdminNavbar />
          <main className="p-4 md:p-8 flex-1">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
