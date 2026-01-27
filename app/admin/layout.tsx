import { Sidebar } from "@/components/admin/Sidebar";
import { AdminNavbar } from "@/components/admin/Navbar";
import { AuthProvider } from "@/components/Providers";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="antialiased bg-slate-50">
        <AuthProvider>
          <div className="flex min-h-screen">
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
      </body>
    </html>
  );
}