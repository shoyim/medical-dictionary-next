"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      alert("Email yoki parol xato!");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-slate-200">
        <div className="text-center space-y-2">
          <div className="mx-auto bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Xush kelibsiz</h1>
          <p className="text-slate-500 font-medium">Admin panelga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email manzilingiz</label>
            <Input 
              type="email" 
              placeholder="admin@example.com" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Parol</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="h-12 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button 
            disabled={loading}
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Tizimga kirish"}
          </Button>
        </form>
      </div>
    </div>
  );
}