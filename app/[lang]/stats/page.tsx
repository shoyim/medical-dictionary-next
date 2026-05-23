import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { getGlobalStats } from "@/lib/actions";
import { StatisticsCards } from "@/components/Stats";
import { Activity } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("stats", lang, "/stats");
}

export default async function StatisticsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [dict, stats] = await Promise.all([
    getDictionary(lang),
    getGlobalStats(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="p-3 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            {dict?.stats?.title || "Platforma Ko'rsatkichlari"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg">
            {dict?.stats?.subtitle}
          </p>
        </div>

        <StatisticsCards stats={stats} dict={dict} />

        <div className="mt-12 p-8 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest">
            {dict.stats.last_update}:{" "}
            {new Date().toISOString().split("T")[0]}
          </p>
        </div>
      </div>
    </div>
  );
}
