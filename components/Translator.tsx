"use client";

import { useState } from "react";
import { Search, ArrowRightLeft, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslation } from "@/lib/actions";

export function MedicalTranslator({ dict }: { dict: any }) {
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [sourceLang, setSourceLang] = useState("uz");
  const [targetLang, setTargetLang] = useState("en");

  const handleSwap = () => {
    const sLang = sourceLang;
    const tLang = targetLang;
    setSourceLang(tLang);
    setTargetLang(sLang);
    
    const sText = sourceText;
    const tText = targetText;
    setSourceText(tText && tText !== "Перевод не найден" ? tText : "");
    setTargetText(sText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setLoading(true);

    try {
      const result = await getTranslation(sourceText, targetLang);

      setTargetText(result || "Перевод не найден");
    } catch (error) {
      setTargetText("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
        
        {/* TILLARNI TANLASH */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <select 
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full md:flex-1 h-14 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold outline-none cursor-pointer appearance-none shadow-sm"
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSwap}
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0 transition-all active:rotate-180 duration-500 border border-slate-100 dark:border-slate-800 w-12 h-12"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </Button>

          <select 
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full md:flex-1 h-14 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white font-bold outline-none cursor-pointer appearance-none shadow-sm"
          >
            <option value="en">English</option>
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        {/* MATN MAYDONLARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <textarea
              placeholder="Terminni kiriting..."
              className="w-full h-64 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-xl shadow-inner leading-relaxed"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="w-full h-64 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 dark:text-slate-100 overflow-y-auto shadow-inner text-xl leading-relaxed">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                  <span className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-tighter">Qidirilmoqda...</span>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: targetText || `<span class="text-slate-400 italic text-base">Natija bu yerda chiqadi...</span>` }} />
              )}
            </div>
            
            {targetText && !loading && (
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-6 right-6 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
                onClick={() => {
                  navigator.clipboard.writeText(targetText.replace(/<[^>]*>/g, ''));
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
              >
                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </Button>
            )}
          </div>
        </div>

        {/* IZLASH TUGMASI */}
        <div className="flex justify-center pt-2">
          <Button 
            disabled={loading || !sourceText}
            onClick={handleTranslate}
            className="h-16 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 gap-3 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
            {loading ? dict.searching : dict.transition}
          </Button>
        </div>
      </div>
    </div>
  );
}