"use client";

import { useState, useEffect } from "react";
import { getAbbreviations } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Clock } from "lucide-react";

export function AbbreviationList({ dict, initialLang }: { dict: any, initialLang: string }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: [], totalPages: 0, totalCount: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAbbreviations(query, page);
        setData(res);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 400);
    return () => clearTimeout(timer);
  }, [query, page]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 transition-colors duration-300">
      
      {/* SARLAVHA VA QIDIRUV */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          {dict?.abbreviation?.title || "Qisqartmalar lug'ati"}
        </h1>
        <div className="relative max-w-md mx-auto group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            placeholder={dict?.abbreviation?.desc || "Qisqartmani yozing..."}
            className="h-12 pl-12 rounded-2xl shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* RO'YXAT: Qatoriga 2 tadan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-48 w-full bg-slate-100 dark:bg-slate-900/50 animate-pulse rounded-[2.5rem]" />
          ))
        ) : data.items.length > 0 ? (
          data.items.map((item: any) => (
            <Card 
              key={item.id} 
              className="relative p-8 rounded-[2.5rem] border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-900 flex flex-col justify-between overflow-hidden group"
            >
              {/* ID TEPADA */}
              <div className="absolute top-6 right-8">
                <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest">
                  #{item.id}
                </span>
              </div>

              <div className="space-y-4">
                {/* NOMI */}
                <h2 className="text-2xl font-black text-blue-600 dark:text-blue-400 uppercase pr-10 leading-tight">
                  {item.title}
                </h2>

                {/* TAVSIFI */}
                <div 
                  className="text-slate-600 dark:text-slate-400 text-base leading-relaxed line-clamp-4 font-medium"
                  dangerouslySetInnerHTML={{ __html: item.description }} 
                />
              </div>

              {/* PASTI: VAQT */}
              <div className="flex items-center gap-2 pt-6 mt-6 border-t border-slate-50 dark:border-slate-800/50 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.updated_at?.split('T')[0]}</span>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">{dict?.common?.no_results || "Hech narsa topilmadi"}</p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {data.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-10">
          <Button 
            variant="outline" 
            className="rounded-xl h-11 px-6 border-slate-200 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all active:scale-95"
            disabled={page === 1} 
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> {dict?.pagination?.previous || "Back"}
          </Button>
          
          <div className="font-bold text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-full min-w-[100px] text-center">
            {page} <span className="mx-1 text-slate-300 dark:text-slate-600">/</span> {data.totalPages}
          </div>

          <Button 
            variant="outline" 
            className="rounded-xl h-11 px-6 border-slate-200 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition-all active:scale-95"
            disabled={page === data.totalPages} 
            onClick={() => setPage(p => p + 1)}
          >
            {dict?.pagination?.next || "Next"} <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}