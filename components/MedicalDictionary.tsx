"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getTerms } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, X, BookOpen } from "lucide-react";

const alphabets: Record<string, string[]> = {
  uz: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
  en: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
};

const langColors: Record<string, string> = {
  uz: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
  ru: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  en: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800",
};

interface Translation {
  id: number;
  name: string;
  description: string;
  language: { code: string; flag: string };
}

interface Term {
  id: number;
  medical_term_id: number;
  name: string;
  description: string;
  term: { translations: Translation[] };
}

export function MedicalDictionary({
  initialLang,
  dbLanguages,
  dict,
}: {
  initialLang: string;
  dbLanguages: { id: number; code: string; name: string; flag: string }[];
  dict: any;
}) {
  const [lang, setLang] = useState(initialLang);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const topRef = useRef<HTMLDivElement>(null);
  const alphabetRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<{ terms: Term[]; totalPages: number; totalCount: number }>({
    terms: [],
    totalPages: 0,
    totalCount: 0,
  });

  useEffect(() => {
    setCurrentPage(1);
    setExpanded(new Set());
  }, [lang, searchQuery, selectedLetter]);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getTerms(
          searchQuery,
          searchQuery ? "" : selectedLetter,
          lang,
          currentPage
        );
        setData({
          terms: (result.terms as Term[]) || [],
          totalPages: result.totalPages || 0,
          totalCount: result.totalCount || 0,
        });
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery, selectedLetter, lang, currentPage]);

  const goPage = useCallback(
    (p: number) => {
      setCurrentPage(p);
      setExpanded(new Set());
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const activeLetter = (letter: string) => {
    const el = alphabetRef.current?.querySelector(`[data-letter="${letter}"]`) as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery("");
    activeLetter(letter);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6" ref={topRef}>

      {/* ── SEARCH + LANGUAGE ── */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-3 flex flex-col sm:flex-row gap-3">
        <div className="flex-shrink-0">
          <Select value={lang} onValueChange={(v) => { setLang(v); setSelectedLetter("A"); }}>
            <SelectTrigger className="h-11 w-full sm:w-44 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 gap-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dbLanguages.map((l) => (
                <SelectItem key={l.id} value={l.code}>
                  <span className="flex items-center gap-2">
                    {l.flag && (
                      <img src={l.flag} alt={l.code} className="w-5 h-4 object-cover rounded-sm" />
                    )}
                    {l.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={dict.common?.search_placeholder || "Qidirish..."}
            className="h-11 pl-10 pr-10 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── ALPHABET ── */}
      {!searchQuery && (
        <div
          ref={alphabetRef}
          className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide select-none px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {(alphabets[lang] || alphabets.en).map((char) => (
            <button
              key={char}
              data-letter={char}
              onClick={() => handleLetterClick(char)}
              className={`flex-shrink-0 w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                selectedLetter === char
                  ? "bg-blue-600 text-white shadow-md scale-110"
                  : "text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800"
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      )}

      {/* ── RESULTS COUNT ── */}
      {!loading && (
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 px-1">
          <span>
            {searchQuery
              ? `"${searchQuery}" — ${data.totalCount} ta natija`
              : `${selectedLetter} — ${data.totalCount} ta termin`}
          </span>
          {data.totalPages > 1 && (
            <span>{currentPage} / {data.totalPages} sahifa</span>
          )}
        </div>
      )}

      {/* ── TERMS LIST ── */}
      <div className="space-y-3">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ))
        ) : data.terms.length > 0 ? (
          data.terms.map((term) => {
            const isLong = term.description.length > 280;
            const isExpanded = expanded.has(term.id);
            const otherTranslations = term.term?.translations || [];

            return (
              <article
                key={term.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-200 overflow-hidden"
              >
                {/* Term name */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 w-1 h-6 rounded-full bg-blue-600 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {term.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="mt-2 pl-4">
                    <p className={`text-slate-600 dark:text-slate-400 text-sm leading-relaxed ${!isExpanded && isLong ? "line-clamp-3" : ""}`}>
                      {term.description}
                    </p>
                    {isLong && (
                      <button
                        onClick={() => toggleExpand(term.id)}
                        className="mt-1 text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline"
                      >
                        {isExpanded ? "Yig'ish ↑" : "Ko'proq ko'rish ↓"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Other language translations */}
                {otherTranslations.length > 0 && (
                  <div className="px-5 pb-4 pl-9 flex flex-wrap gap-2">
                    {otherTranslations.map((tr) => (
                      <div
                        key={tr.id}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${langColors[tr.language.code] || "bg-slate-50 text-slate-600 border-slate-200"}`}
                      >
                        {tr.language.flag && (
                          <img src={tr.language.flag} alt={tr.language.code} className="w-5 h-4 object-cover rounded-sm flex-shrink-0" />
                        )}
                        <span className="truncate max-w-[180px]">{tr.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <div className="py-20 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-slate-400 dark:text-slate-600 text-sm font-medium">
              {dict.pagination?.noResults || "Natija topilmadi"}
            </p>
          </div>
        )}
      </div>

      {/* ── PAGINATION ── */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-10">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => goPage(currentPage - 1)}
            className="h-9 w-9 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === data.totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={currentPage === p ? "default" : "ghost"}
                    size="icon"
                    onClick={() => goPage(p as number)}
                    className={`h-9 w-9 rounded-xl font-bold text-sm ${
                      currentPage === p
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {p}
                  </Button>
                )
              )}
          </div>

          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === data.totalPages}
            onClick={() => goPage(currentPage + 1)}
            className="h-9 w-9 rounded-xl"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
