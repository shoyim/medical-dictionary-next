import Link from "next/link";
import { Send, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

export const Footer = ({ dict, lang }: { dict: any, lang: string }) => {
  const t = dict.footer;

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* 1. LOGOTIP VA TAVSIF */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Logo lang={lang} size="md" name={dict.siteName} />
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
            <Link
              href="https://t.me/yusupova_shakhnoza"
              target="_blank"
              className="inline-flex items-center gap-3 group"
            >
              <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  Шахноза Абдухафизовна
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  @yusupova_shakhnoza
                </p>
              </div>
            </Link>
            <div className="flex justify-center md:justify-start">
              <Link
                href="mailto:info@medterm.uz"
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@medterm.uz
              </Link>
            </div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              SamDCHTI • 2024 – {new Date().getFullYear()}
            </p>
          </div>
        </div>

        {/* PASTI: MUALLIFLIK HUQUQI */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-900 flex items-center justify-center">
          <p className="text-xs text-slate-400 dark:text-slate-600 font-medium">
            © {new Date().getFullYear()} {dict.siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};