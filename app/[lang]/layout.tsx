// app/[lang]/layout.tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/lib/get-dictionary";
import { LOCALES, getAlternates } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      ...getAlternates(),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <HtmlLang lang={lang} />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Header dict={dict} lang={lang} />
        <main>{children}</main>
        <Footer dict={dict} lang={lang} />
      </ThemeProvider>
    </>
  );
}
