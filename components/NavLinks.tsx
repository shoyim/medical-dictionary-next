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
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-semibold transition-colors ${
              isActive ? 'text-blue-600' : 'text-muted-foreground hover:text-blue-600'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}