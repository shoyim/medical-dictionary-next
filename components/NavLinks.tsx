"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks({ lang, dict }: { lang: string; dict: any }) {
  const pathname = usePathname();

  const links = [
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/stats`, label: dict.nav.stats },
    { href: `/${lang}/terms`, label: dict.nav.terms },
    { href: `/${lang}/abbreviation`, label: dict.nav.abbreviation },
  ];

  return (
    <nav className="hidden md:flex items-center gap-1"> 
      {links.map((link) => {
        // Pathname link.href bilan boshlanishini tekshirish (ichki sahifalar uchun ham active qolishi uchun)
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 ${
              isActive 
                ? 'text-blue-600' 
                : 'text-muted-foreground hover:text-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-xl'
            }`}
          >
            {link.label}
            
            {/* Active holatda pastdagi border (Indicator) */}
            {isActive && (
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}