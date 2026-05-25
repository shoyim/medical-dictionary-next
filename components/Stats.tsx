"use client";

import { BookOpen, Hash, Languages, Globe2 } from "lucide-react";

interface LangBreakdown {
  code: string;
  name: string;
  flag: string;
  count: number;
}

interface StatsProps {
  stats: {
    termsCount: number;
    abbrCount: number;
    langCount: number;
    langBreakdown: LangBreakdown[];
  };
  dict: any;
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}

export function StatisticsCards({ stats, dict }: StatsProps) {
  const mainCards = [
    {
      label: dict?.stats?.total_terms || "Tibbiy Terminlar",
      value: stats?.termsCount || 0,
      icon: <BookOpen className="w-7 h-7" />,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/50",
      border: "border-blue-100 dark:border-blue-900/40",
    },
    {
      label: dict?.stats?.abbreviations || "Qisqartmalar",
      value: stats?.abbrCount || 0,
      icon: <Hash className="w-7 h-7" />,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/50",
      border: "border-purple-100 dark:border-purple-900/40",
    },
    {
      label: dict?.stats?.languages || "Tillar",
      value: stats?.langCount || 0,
      icon: <Languages className="w-7 h-7" />,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/50",
      border: "border-green-100 dark:border-green-900/40",
    },
    {
      label: dict?.stats?.total_translations || "Tarjimalar",
      value: stats?.langBreakdown?.reduce((s, l) => s + l.count, 0) || 0,
      icon: <Globe2 className="w-7 h-7" />,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/50",
      border: "border-orange-100 dark:border-orange-900/40",
    },
  ];

  const total = stats?.langBreakdown?.reduce((s, l) => s + l.count, 0) || 1;

  return (
    <div className="space-y-8">
      {/* Main stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mainCards.map((item, i) => (
          <div
            key={i}
            className={`bg-white dark:bg-slate-900 rounded-2xl border ${item.border} p-6 flex flex-col items-center text-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
          >
            <div className={`p-3 rounded-xl ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <AnimatedNumber value={item.value} />
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Language breakdown */}
      {stats?.langBreakdown?.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">
            {dict?.stats?.by_language || "Tillarga ko'ra taqsimot"}
          </h2>
          <div className="space-y-4">
            {stats.langBreakdown.map((lang) => {
              const pct = Math.round((lang.count / total) * 100);
              return (
                <div key={lang.code} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      {lang.flag && (
                        <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm flex-shrink-0" />
                      )}
                      {lang.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 tabular-nums font-medium">
                      {lang.count.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sample multi-language card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/40 p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
          {dict?.stats?.sample_term || "Namuna: bir termin — uch tilda"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { flag: "🇺🇿", lang: "O'zbek", term: "Abort", desc: "Homiladorlikning sun'iy ravishda to'xtatilishi" },
            { flag: "🇷🇺", lang: "Русский", term: "Аборт", desc: "Искусственное прерывание беременности" },
            { flag: "🇬🇧", lang: "English", term: "Abortion", desc: "Artificial termination of pregnancy" },
          ].map((item) => (
            <div
              key={item.lang}
              className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl p-4 border border-white dark:border-slate-800"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.flag}</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{item.lang}</span>
              </div>
              <p className="font-bold text-slate-900 dark:text-slate-100 text-lg">{item.term}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
