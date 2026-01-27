"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/admin/dashboard");
    else alert("Email yoki parol xato!");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Tizimga Kirish</h1>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Parol" onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Kirish</Button>
      </form>
    </div>
  );
}