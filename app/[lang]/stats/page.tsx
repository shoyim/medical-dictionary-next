import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { getGlobalStats } from "@/lib/actions";
import { StatisticsCards } from "@/components/Stats";
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
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {dict?.stats?.title || "Platforma Ko'rsatkichlari"}
          </h1>
          {dict?.stats?.subtitle && (
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto">
              {dict.stats.subtitle}
            </p>
          )}
        </div>

        <StatisticsCards stats={stats} dict={dict} />

        <p className="text-center text-xs text-slate-400 dark:text-slate-600 font-medium pb-8">
          {dict?.stats?.last_update || "Oxirgi yangilanish"}:{" "}
          {new Date().toISOString().split("T")[0]}
        </p>
      </div>
    </div>
  );
}
