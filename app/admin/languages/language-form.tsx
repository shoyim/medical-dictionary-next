"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LanguageForm({ initialData, action }: { initialData?: any, action: any }) {
  return (
    <form action={action} className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Til nomi (masalan: Uzbek)</label>
          <input
            name="name"
            defaultValue={initialData?.name}
            required
            className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Kod (masalan: uz)</label>
          <input
            name="code"
            defaultValue={initialData?.code}
            required
            maxLength={2}
            className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-bold text-slate-700">Flag URL (FlagsAPI)</label>
          <input
            name="flag"
            placeholder="https://flagsapi.com/UZ/flat/64.png"
            defaultValue={initialData?.flag}
            className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-6 border-t">
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8">Saqlash</Button>
        <Link href="/admin/languages">
          <Button variant="ghost">Bekor qilish</Button>
        </Link>
      </div>
    </form>
  );
}