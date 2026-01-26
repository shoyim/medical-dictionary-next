import Link from 'next/link';
import { Menu, Search, Stethoscope, Send } from 'lucide-react'; 
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getLanguages } from '@/lib/actions';
import { NavLinks } from '@/components/NavLinks';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle'; // Bu client component

export const Header = async ({ dict, lang }: { dict: any; lang: string }) => {
  const dbLanguages = await getLanguages() || ['uz', 'ru', 'en'];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGOTIP */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group shrink-0">
          <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-none">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-xl tracking-tighter text-blue-600 dark:text-blue-400">
              {dict.siteAbbr}
            </span>
            <span className="hidden lg:block text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground">
              {dict.siteName}
            </span>
          </div>
        </Link>
        
        {/* NAVIGATSIYA */}
        <div className="hidden lg:flex items-center">
          <NavLinks lang={lang} dict={dict} />
        </div>

        {/* O'NG TOMON: ICONLAR, TEMA VA TIL */}
        <div className="flex items-center gap-2 lg:gap-4">
          
          {/* Ijtimoiy tarmoq iconi (Masalan, Telegram) */}
          <Link 
            href="https://t.me/shoyimobloqulov" 
            target="_blank"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          >
            <Send className="h-5 w-5" />
          </Link>

          {/* REJIM ALMASHTIRGICH (DARK/LIGHT) */}
          <ThemeToggle />

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          {/* TIL TANLAGICH */}
          <div className="flex items-center">
            <LanguageSwitcher dbLanguages={dbLanguages} />
          </div>

          {/* MOBIL QIDIRUV VA MENU */}
          <div className="flex items-center lg:hidden gap-1">
            <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
        </div>
      </div>
    </header>
  );
};