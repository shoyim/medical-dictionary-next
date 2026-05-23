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
        <AbbreviationList dict={dict} initialLang={lang} />
      </div>
    </>
  );
}
