import { prisma } from "@/lib/prisma";
import { BookText, Languages, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const [termCount, abbrCount, langCount, recentTerms, recentAbbr] = await Promise.all([
    prisma.medicalTermTranslation.count(),
    prisma.abbreviations.count(),
    prisma.language.count(),
    prisma.medicalTermTranslation.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: { language: true },
    }),
    prisma.abbreviations.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
    }),
  ]).catch(() => [0, 0, 0, [], []] as const);

  const stats = [
    { label: "Tarjimalar", value: termCount, icon: BookText, color: "bg-blue-50 text-blue-600", href: "/admin/terms" },
    { label: "Qisqartmalar", value: abbrCount, icon: FileText, color: "bg-purple-50 text-purple-600", href: "/admin/abbreviations" },
    { label: "Tillar", value: langCount, icon: Languages, color: "bg-green-50 text-green-600", href: "/admin/languages" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Lug'at tizimining umumiy ko'rinishi</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <s.icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{Number(s.value).toLocaleString()}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* So'nggi terminlar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <h2 className="font-black text-slate-800 text-sm uppercase tracking-wider">So'nggi terminlar</h2>
            <Link href="/admin/terms/create" className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
              <Plus size={14} /> Qo'shish
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {(recentTerms as any[]).length === 0 ? (
              <p className="p-5 text-sm text-slate-400 text-center">Ma'lumot yo'q</p>
            ) : (
              (recentTerms as any[]).map((t: any) => (
                <div key={t.id} className="px-5 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{t.name}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{t.description?.slice(0, 60)}...</p>
                  </div>
                  {t.language?.flag && (
                    <img src={t.language.flag} alt={t.language.code} className="w-6 h-4 object-cover rounded-sm flex-shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* So'nggi qisqartmalar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
            <h2 className="font-black text-slate-800 text-sm uppercase tracking-wider">So'nggi qisqartmalar</h2>
            <Link href="/admin/abbreviations/create" className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
              <Plus size={14} /> Qo'shish
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {(recentAbbr as any[]).length === 0 ? (
              <p className="p-5 text-sm text-slate-400 text-center">Ma'lumot yo'q</p>
            ) : (
              (recentAbbr as any[]).map((a: any) => (
                <div key={a.id} className="px-5 py-3">
                  <p className="font-black text-blue-600 text-sm">{a.title}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{a.description?.slice(0, 70)}...</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
