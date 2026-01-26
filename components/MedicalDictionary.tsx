"use client";

import { useState, useEffect } from "react";
import { getTerms } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Globe2, ChevronLeft, ChevronRight } from "lucide-react";

const alphabets: { [key: string]: string[] } = {
  uz: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
};

export function MedicalDictionary({ initialLang, dbLanguages, dict }: { initialLang: string, dbLanguages: any[], dict: any}) {
  const [lang, setLang] = useState(initialLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [data, setData] = useState<{terms: any[], totalPages: number, totalCount: number}>({
    terms: [], totalPages: 0, totalCount: 0
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [lang, searchQuery, selectedLetter]);

  useEffect(() => {
    const fetchWithDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getTerms(searchQuery, searchQuery ? "" : selectedLetter, lang, currentPage);
        setData({
          terms: result.terms || [],
          totalPages: result.totalPages || 0,
          totalCount: result.totalCount || 0
        });
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(fetchWithDebounce);
  }, [searchQuery, selectedLetter, lang, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 transition-colors duration-300">
      
      {/* 1. CONTROL PANEL */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-48">
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="h-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-transparent dark:text-slate-200">
              <Globe2 className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              <SelectValue placeholder="Til" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
              {dbLanguages.map((l) => (
                <SelectItem key={l.id} value={l.code}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <Input 
            placeholder={dict.common.search_placeholder} 
            className="h-12 pl-12 rounded-2xl border-slate-200 dark:border-slate-700 focus:ring-blue-500 text-lg shadow-inner bg-slate-50/50 dark:bg-slate-950 dark:text-slate-200"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setSelectedLetter("");
            }}
          />
        </div>
      </div>

      {/* 2. ALIFBO FILTRI */}
      <div className="flex flex-wrap justify-center gap-1.5 py-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] p-4 border border-dashed border-slate-200 dark:border-slate-800">
        {alphabets[lang]?.map((char) => (
          <Button
            key={char}
            variant={selectedLetter === char ? "default" : "ghost"}
            onClick={() => {
              setSelectedLetter(char);
              setSearchQuery("");
            }}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold transition-all ${
              selectedLetter === char 
                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-lg scale-110" 
                : "text-slate-500 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-slate-800"
            }`}
          >
            {char}
          </Button>
        ))}
      </div>

      {/* NATIJALAR QISMI */}
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-44 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[2rem]" />
          ))
        ) : data.terms.length > 0 ? (
          <div className="flex flex-col gap-6">
            {data.terms.map((term) => (
              <Card 
                key={term.id} 
                className="relative overflow-hidden rounded-[2rem] border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all duration-300 bg-white dark:bg-slate-900 p-8"
              >
                {/* TERM ID */}
                <div className="absolute top-6 right-8">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    ID: {term.medical_term_id}
                  </span>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 dark:bg-blue-500 rounded-full" />
                    <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                      {term.name}
                    </h3>
                  </div>

                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <div 
                      className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed pl-4 border-l-2 border-slate-50 dark:border-slate-800"
                      dangerouslySetInnerHTML={{ __html: term.description }} 
                    />
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-300 dark:text-slate-600 font-bold uppercase tracking-tighter">
                  <span>{dict.terms.about}</span>
                  <div className="flex gap-1">
                    <span>{dict?.common?.last_updated || dict.updated_at}:</span>
                    <span>{term.updated_at ? term.updated_at.toString().split('T')[0] : "—"}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 dark:text-slate-600 font-medium text-lg">Ma&apos;lumot topilmadi.</p>
          </div>
        )}
      </div>
            
      {/* 4. PAGINATION CONTROLS */}
      {data.totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-12 pb-10">
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="rounded-xl border-slate-200 dark:border-slate-700 h-10 dark:text-slate-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> {dict.pagination.prev || "Oldingi"}
            </Button>

            <div className="flex gap-1">
              {[...Array(data.totalPages)].map((_, i) => {
                const pageNum = i + 1;
                if (pageNum === 1 || pageNum === data.totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all ${
                        currentPage === pageNum 
                          ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={pageNum} className="flex items-end px-1 text-slate-400 dark:text-slate-600">...</span>;
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === data.totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="rounded-xl border-slate-200 dark:border-slate-700 h-10 dark:text-slate-300"
            >
              {dict.pagination.next} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <p className="text-slate-400 dark:text-slate-600 text-xs font-medium uppercase tracking-widest">
            {currentPage}- {dict.pagination.page} / {dict.pagination.total} {data.totalCount} {dict.pagination.end}
          </p>
        </div>
      )}
    </div>
  );
}