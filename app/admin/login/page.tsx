"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      toast.success("Muvaffaqiyatli kirildi!", { description: "Admin panelga yo'naltirilmoqda..." });
      window.location.href = "/admin/dashboard";
    } else {
      toast.error("Kirish xatosi", { description: "Email yoki parol noto'g'ri. Qayta urinib ko'ring." });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2.5 mb-2">
            <svg width="40" height="40" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="9" fill="#2563eb" />
              <rect x="7" y="14.5" width="22" height="7" rx="2.5" fill="white" />
              <rect x="14.5" y="7" width="7" height="22" rx="2.5" fill="white" />
            </svg>
            <div className="flex flex-col leading-tight text-left">
              <span className="font-black text-lg tracking-tight text-slate-900 uppercase">Medical Science</span>
              <span className="font-black text-lg tracking-tight text-blue-600 uppercase">Dictionary</span>
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Xush kelibsiz</h1>
            <p className="text-sm text-slate-500">
              Kirish uchun email va parolingizni kiriting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <Input
                type="email"
                placeholder="admin@medterm.uz"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Parol</label>
              <Input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-slate-200 focus-visible:ring-blue-500"
              />
            </div>

            <Button
              disabled={loading}
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-md shadow-blue-200 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
              ) : null}
              {loading ? "Kirilmoqda..." : "Tizimga kirish"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Medical Science Dictionary
        </p>
      </div>
    </div>
  );
}
