import type { Metadata } from "next";
import { getLanguages } from "@/lib/actions";
import { MedicalDictionary } from "@/components/MedicalDictionary";
import { getDictionary } from "@/lib/get-dictionary";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("terms", lang, "/terms");
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const dbLanguages = await getLanguages();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: dict.terms?.about || "Tibbiy Terminlar Lug'ati",
    description: dict.siteDescription,
    url: `${BASE_URL}/${lang}/terms`,
    inLanguage: [lang, "uz", "ru", "en"],
    creator: {
      "@type": "Organization",
      name: "SamDCHTI",
      url: BASE_URL,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <MedicalDictionary initialLang={lang} dbLanguages={dbLanguages} dict={dict} />
    </>
  );
}
