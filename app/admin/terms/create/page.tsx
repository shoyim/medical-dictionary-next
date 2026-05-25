import { prisma } from "@/lib/prisma";
import { CreateTermForm } from "./CreateTermForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateTermPage() {
  const languages = await prisma.language.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/terms"
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Yangi termin qo'shish</h1>
          <p className="text-sm text-slate-500 mt-0.5">Bir terminni bir vaqtda bir nechta tilda qo'shing</p>
        </div>
      </div>

      <CreateTermForm languages={languages} />
    </div>
  );
}
