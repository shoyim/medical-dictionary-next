"use client";

import { useState, useCallback, useRef } from "react";
import { Search, ArrowRightLeft, Copy, Check, Loader2, X, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTranslation } from "@/lib/actions";

const LANGUAGES = [
  { code: "uz", label: "O'zbek tili", short: "O'zbek" },
  { code: "ru", label: "Русский язык", short: "Русский" },
  { code: "en", label: "English", short: "English" },
] as const;

type LangCode = "uz" | "ru" | "en";

const MAX_CHARS = 500;

export function MedicalTranslator({ dict }: { dict: any }) {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sourceLang, setSourceLang] = useState<LangCode>("uz");
  const [targetLang, setTargetLang] = useState<LangCode>("en");
  const [swapping, setSwapping] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSwap = useCallback(() => {
    setSwapping(true);
    setTimeout(() => setSwapping(false), 400);

    const prevSource = sourceLang;
    const prevTarget = targetLang;
    const prevSourceText = sourceText;
    const prevTargetText = targetText.replace(/<[^>]*>/g, "");

    setSourceLang(prevTarget);
    setTargetLang(prevSource);
    setSourceText(prevTargetText);
    setTargetText(prevSourceText);
    setHasResult(false);
  }, [sourceLang, targetLang, sourceText, targetText]);

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setHasResult(false);
    try {
      const result = await getTranslation(sourceText, targetLang);
      setTargetText(result || "");
      setHasResult(!!result);
    } catch {
      setTargetText("");
    } finally {
      setLoading(false);
    }
  }, [sourceText, targetLang]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate();
    }
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(targetText.replace(/<[^>]*>/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [targetText]);

  const handleClear = () => {
    setSourceText("");
    setTargetText("");
    setHasResult(false);
    textareaRef.current?.focus();
  };

  const sourceLangObj = LANGUAGES.find((l) => l.code === sourceLang)!;
  const targetLangObj = LANGUAGES.find((l) => l.code === targetLang)!;
  const charCount = sourceText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <section className="w-full max-w-6xl mx-auto px-4">
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-10 gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
          <Languages className="w-3.5 h-3.5" />
          {dict.transition || "Tarjima"}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Tibbiy Tarjimon
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md text-sm leading-relaxed">
          Terminni kiriting — lug'atdan aniq ta'rifini va tarjimasini toping
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">

        {/* ── Language bar ── */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900">

          {/* Source lang select */}
          <div className="flex-1 px-3 py-3">
            <Select
              value={sourceLang}
              onValueChange={(val) => {
                if (val === targetLang) return;
                setSourceLang(val as LangCode);
                setHasResult(false);
              }}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-sm focus-visible:ring-blue-500 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    disabled={lang.code === targetLang}
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap button */}
          <div className="px-2 shrink-0">
            <button
              onClick={handleSwap}
              aria-label="Tillarni almashtirish"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm transition-all active:scale-90"
            >
              <ArrowRightLeft
                className={`w-4 h-4 transition-transform duration-300 ${swapping ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Target lang select */}
          <div className="flex-1 px-3 py-3">
            <Select
              value={targetLang}
              onValueChange={(val) => {
                if (val === sourceLang) return;
                setTargetLang(val as LangCode);
                setHasResult(false);
              }}
            >
              <SelectTrigger className="w-full h-10 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-sm focus-visible:ring-blue-500 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem
                    key={lang.code}
                    value={lang.code}
                    disabled={lang.code === sourceLang}
                  >
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-slate-200 dark:divide-slate-800">

          {/* Source panel */}
          <div className="flex flex-col">
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={dict.common?.search_placeholder || "Tibbiy atama yoki so'zni kiriting..."}
                maxLength={MAX_CHARS + 50}
                rows={7}
                className="w-full resize-none bg-transparent px-5 pt-5 pb-3 text-base leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-300 dark:placeholder:text-slate-600 outline-none"
              />
            </div>

            {/* Source footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
              <span
                className={`text-xs font-medium tabular-nums ${
                  isOverLimit
                    ? "text-red-500"
                    : charCount > MAX_CHARS * 0.8
                    ? "text-amber-500"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {charCount > 0 ? `${charCount} / ${MAX_CHARS}` : ""}
              </span>

              <div className="flex items-center gap-2">
                {sourceText && (
                  <button
                    onClick={handleClear}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors py-1 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-3 h-3" />
                    Tozalash
                  </button>
                )}
                <span className="hidden sm:block text-[11px] text-slate-300 dark:text-slate-700 select-none">
                  Ctrl+Enter
                </span>
              </div>
            </div>
          </div>

          {/* Target panel */}
          <div className="flex flex-col border-t md:border-t-0 border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="flex-1 px-5 pt-5 pb-3 min-h-[196px] overflow-y-auto">
              {loading ? (
                <div className="h-full min-h-[140px] flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
                  <span className="text-sm text-slate-400 dark:text-slate-500 animate-pulse">
                    {dict.searching || "Qidirilmoqda..."}
                  </span>
                </div>
              ) : hasResult && targetText ? (
                <div
                  className="text-base leading-relaxed text-slate-800 dark:text-slate-100 prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: targetText }}
                />
              ) : (
                <p className="text-slate-300 dark:text-slate-600 text-base italic select-none">
                  {hasResult && !targetText
                    ? (dict.common?.no_results || "Natija topilmadi")
                    : "Natija bu yerda chiqadi..."}
                </p>
              )}
            </div>

            {/* Target footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {hasResult && targetLangObj.short}
              </span>
              {hasResult && targetText && !loading && (
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-medium py-1 px-2.5 rounded-lg transition-all
                    text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-500">Nusxalandi</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Nusxalash
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Translate button bar ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            SamDCHTI tibbiy terminlar bazasi
          </p>
          <button
            onClick={handleTranslate}
            disabled={loading || !sourceText.trim() || isOverLimit}
            className="ml-auto inline-flex items-center gap-2 h-11 px-7 rounded-xl font-bold text-sm
              bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white
              shadow-md shadow-blue-200 dark:shadow-none
              transition-all active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading
              ? (dict.searching || "Qidirilmoqda...")
              : (dict.transition || "Tarjima qilish")}
          </button>
        </div>
      </div>
    </section>
  );
}
