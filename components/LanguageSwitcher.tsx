"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react"; // useEffect qo'shdik
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ dbLanguages = [] }: { dbLanguages: any[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLocale = pathname.split("/")[1] || "uz";

  if (!mounted || !dbLanguages || dbLanguages.length === 0) {
    return (
      <Button variant="outline" size="sm" className="h-10 w-24 animate-pulse bg-slate-50 border-slate-200">
        <span className="w-4 h-4 rounded-full bg-slate-200 mr-2" />
        <span className="h-3 w-8 bg-slate-200 rounded" />
      </Button>
    );
  }

  const selectedLang = dbLanguages.find((l) => l.code === currentLocale) || dbLanguages[0];

  const changeLang = (code: string) => {
    if (code === currentLocale) return;

    const segments = pathname.split("/");
    segments[1] = code;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-10 px-3 border-slate-200 hover:bg-slate-50 transition-all">
          {selectedLang?.flag && (
            <img 
              src={selectedLang.flag} 
              alt={selectedLang.code} 
              className="w-5 h-auto object-cover" 
            />
          )}
          <span className="uppercase text-xs font-bold text-slate-700">
            {selectedLang?.code}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-48 p-1">
        {dbLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => changeLang(lang.code)}
            className={`flex items-center justify-between cursor-pointer px-3 py-2 rounded-sm ${
              currentLocale === lang.code ? "bg-slate-100" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <img src={lang.flag} alt={lang.name} className="w-6 h-auto" />
              <span className="text-sm font-medium text-slate-900">{lang.name}</span>
            </div>
            {currentLocale === lang.code && (
              <Check className="h-4 w-4 text-blue-600 font-bold" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}