import Link from "next/link";
import { BookText, Send, Mail } from "lucide-react";

export const Footer = ({ dict, lang }: { dict: any, lang: string }) => {
  const t = dict.footer;

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. LOGOTIP VA TAVSIF */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookText className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-slate-900 dark:text-white">
                {dict.siteName}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              {dict.about.subtitle || "Ruscha-Inglizcha tibbiy terminologik lug'at platformasi."}
            </p>
          </div>

          {/* 2. MENULAR (NAVIGATSIYA) */}
          <div className="grid grid-cols-2 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-slate-200">
                {t.navigation}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.home}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/terms`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.terms}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/abbreviations`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.abbreviations}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 pt-9">
              <ul className="space-y-2">
                <li>
                  <Link href={`/${lang}/statistics`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.statistics}
                  </Link>
                </li>
                <li>
                  <Link href={`/${lang}/about`} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t.about}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 3. ALOQA VA IJTIMOIY TARMOQLAR */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-900 dark:text-slate-200">
              {t.contact}
            </h4>
            <div className="flex justify-center md:justify-start gap-4">
              <Link 
                href="https://t.me/yusupova_shakhnoza" 
                target="_blank" 
                className="p-2 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <Send className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:info@medical-dictionary.uz" 
                className="p-2 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              SamDCHTI • 2024 - {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* PASTI: MUALLIFLIK HUQUQI */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">
            © {new Date().getFullYear()} Medical Dictionary. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-600 italic flex items-center gap-1">
            {t.made_in}
          </p>
        </div>
      </div>
    </footer>
  );
};