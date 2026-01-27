import { prisma } from "@/lib/prisma";
import { BookText, Languages, Users, PlusCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  // Model nomini Prisma generate qilganidek kichik harfda chaqiramiz
  const [totalAbbr, recentAbbr] = await Promise.all([
    prisma.abbreviations.count(),
    prisma.abbreviations.findMany({
      take: 5,
      orderBy: { created_at: 'desc' }
    })
  ]).catch(() => [0, []] as const); // Xato bo'lsa bo'sh qaytaradi

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Xush kelibsiz!</h1>
          <p className="text-slate-500 mt-1">Tizimdagi jami ma'lumotlar boshqaruvi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <StatCard label="Jami terminlar" value={0} icon={<BookText className="text-blue-600" />} color="bg-blue-50" />
         <StatCard label="Qisqartmalar" value={totalAbbr} icon={<Languages className="text-purple-600" />} color="bg-purple-50" />
         <StatCard label="Adminlar" value={1} icon={<Users className="text-orange-600" />} color="bg-orange-50" />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-xl ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}