import Link from 'next/link';
import { Menu, Send, BookOpen, Info, BarChart3, Languages } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { getLanguages } from '@/lib/actions';
import { NavLinks } from '@/components/NavLinks';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from '@/components/Logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = async ({ dict, lang }: { dict: any; lang: string }) => {
  const dbLanguages = await getLanguages() || ['uz', 'ru', 'en'];
  // Mobil menyu havolalari
  const mobileLinks = [
    { href: `/${lang}/about`, label: dict.nav.about, icon: <Info className="h-5 w-5" /> },
    { href: `/${lang}/stats`, label: dict.nav.stats, icon: <BarChart3 className="h-5 w-5" /> },
    { href: `/${lang}/terms`, label: dict.nav.terms, icon: <BookOpen className="h-5 w-5" /> },
    { href: `/${lang}/abbreviation`, label: dict.nav.abbreviation, icon: <Languages className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LOGOTIP */}
        <Logo lang={lang} size="md" name={dict.siteName} />
        
        {/* DESKTOP NAVIGATSIYA */}
        <div className="hidden lg:flex items-center">
          <NavLinks lang={lang} dict={dict} />
        </div>

        {/* O'NG TOMON */}
        <div className="flex items-center gap-2 lg:gap-4">
          
          <Link 
            href="https://t.me/shoyimobloqulov" 
            target="_blank"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
          >
            <Send className="h-5 w-5" />
          </Link>

          <ThemeToggle />

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          <div className="flex items-center">
            <LanguageSwitcher dbLanguages={dbLanguages} />
          </div>

          {/* MOBIL MENU (SHEET) */}
          <div className="lg:hidden flex items-center ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-800 ml-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-left">
                    <Logo lang={lang} size="sm" />
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Sayt navigatsiya menyusi
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {mobileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-4 px-4 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-bold text-slate-700 dark:text-slate-200"
                    >
                      <span className="text-blue-600">{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                  
                  <hr className="my-4 border-slate-100 dark:border-slate-800" />
                  
                  <Link 
                    href="https://t.me/shoyimobloqulov"
                    className="flex items-center gap-4 px-4 dark:bg-blue-900/20 text-blue-600 font-bold"
                  >
                    <Send className="h-5 w-5" />
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
        </div>
      </div>
    </header>
  );
};