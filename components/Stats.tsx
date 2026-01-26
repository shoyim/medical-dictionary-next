"use client";

import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Hash, 
  Languages, 
  FileText 
} from "lucide-react";

interface StatsProps {
  stats: {
    termsCount: number;
    abbrCount: number;
    langCount: number;
    wordsCount: number;
  };
  dict: any;
}

export function StatisticsCards({ stats, dict }: StatsProps) {
  const statItems = [
    {
      label: dict?.stats?.total_terms || "Terminlar",
      value: stats?.termsCount || 0,
      icon: <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-100 dark:border-blue-900/30",
    },
    {
      label: dict?.stats?.abbreviations || "Qisqartmalar",
      value: stats?.abbrCount || 0,
      icon: <Hash className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-100 dark:border-purple-900/30",
    },
    {
      label: dict?.stats?.languages || "Tillar",
      value: stats?.langCount || 0,
      icon: <Languages className="w-8 h-8 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-100 dark:border-green-900/30",
    },
    {
      label: dict?.stats?.total_words || "So'zlar soni",
      value: stats?.wordsCount || 0,
      icon: <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />,
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-100 dark:border-orange-900/30",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-colors duration-300">
      {statItems.map((item, index) => (
        <Card 
          key={index} 
          className={`p-8 rounded-[3rem] border shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-slate-900 ${item.borderColor}`}
        >
          <div className="flex flex-col items-center text-center space-y-5">
            {/* Ikonka foni bilan */}
            <div className={`p-5 rounded-[2rem] ${item.bgColor} shadow-inner transition-colors`}>
              {item.icon}
            </div>
            
            {/* Raqam va Matn */}
            <div className="space-y-1">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.value.toLocaleString()}
              </h3>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                {item.label}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}