import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { AbbreviationList } from "@/components/AbbreviationList";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("abbreviation", lang, "/abbreviation");
}

export default async function AbbrPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: dict.abbreviation?.title || "Tibbiy Qisqartmalar",
    description: dict.abbreviation?.desc,
    url: `${BASE_URL}/${lang}/abbreviation`,
    inLanguage: lang,
  };

  return (
    <>
      <JsonLd data={schema} />
      <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-2 text-center">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            {dict.abbreviation?.title || "Tibbiy Qisqartmalar Lug'ati"}
          </h1>
          {dict.abbreviation?.desc && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg mx-auto">
              {dict.abbreviation.desc}
            </p>
          )}
        </div>
        <AbbreviationList dict={dict} initialLang={lang} />
      </div>
    </>
  );
}
