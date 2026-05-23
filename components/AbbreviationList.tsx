"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAbbreviations } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, X, Hash } from "lucide-react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function parseTitle(title: string) {
  const paren = title.indexOf("(");
  if (paren > 0) {
    return {
      abbr: title.slice(0, paren).trim(),
      expansion: title.slice(paren).trim(),
    };
  }
  return { abbr: title, expansion: "" };
}

interface AbbrItem {
  id: number;
  title: string;
  description: string;
  updated_at?: string;
}

export function AbbreviationList({ dict, initialLang }: { dict: any; initialLang: string }) {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ items: AbbrItem[]; totalPages: number; totalCount: number }>({
    items: [],
    totalPages: 0,
    totalCount: 0,
  });
  const topRef = useRef<HTMLDivElement>(null);
  const alphabetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(1);
  }, [query, selectedLetter]);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await getAbbreviations(query, page, query ? "" : selectedLetter);
        setData(res as any);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query, selectedLetter, page]);

  const goPage = useCallback((p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    setQuery("");
    const el = alphabetRef.current?.querySelector(`[data-letter="${letter}"]`) as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6" ref={topRef}>

      {/* ── SEARCH ── */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={dict?.common?.search_placeholder || "Qisqartma yoki kalit so'z kiriting..."}
            className="h-11 pl-10 pr-10 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── ALPHABET ── */}
      {!query && (
        <div
          ref={alphabetRef}
          className="flex gap-1 overflow-x-auto pb-1 select-none px-1"
          style={{ scrollbarWidth: "none" }}
        >
          {ALPHABET.map((char) => (
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
            {query
              ? `"${query}" — ${data.totalCount} ta natija`
              : `${selectedLetter} — ${data.totalCount} ta qisqartma`}
          </span>
          {data.totalPages > 1 && (
            <span>{page} / {data.totalPages} sahifa</span>
          )}
        </div>
      )}

      {/* ── GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-28 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ))
        ) : data.items.length > 0 ? (
          data.items.map((item) => {
            const { abbr, expansion } = parseTitle(item.title);
            return (
              <article
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                    <Hash className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-blue-600 dark:text-blue-400 text-base leading-tight">
                      {abbr}
                    </p>
                    {expansion && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {expansion}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5 font-medium leading-snug">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <Hash className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-slate-400 dark:text-slate-600 text-sm font-medium">
              {dict?.pagination?.noResults || "Natija topilmadi"}
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
            disabled={page === 1}
            onClick={() => goPage(page - 1)}
            className="h-9 w-9 rounded-xl"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: data.totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === data.totalPages || Math.abs(p - page) <= 1)
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
                    variant={page === p ? "default" : "ghost"}
                    size="icon"
                    onClick={() => goPage(p as number)}
                    className={`h-9 w-9 rounded-xl font-bold text-sm ${
                      page === p
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
            disabled={page === data.totalPages}
            onClick={() => goPage(page + 1)}
            className="h-9 w-9 rounded-xl"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
