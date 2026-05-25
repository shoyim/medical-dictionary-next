import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";
import { MedicalTranslator } from "@/components/Translator";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("home", lang, "");
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MedTerm.uz",
    url: BASE_URL,
    description: dict.siteDescription,
    inLanguage: [lang],
    publisher: {
      "@type": "Organization",
      name: "SamDCHTI",
      url: BASE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/${lang}/terms?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MedTerm.uz",
        item: `${BASE_URL}/${lang}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Matn qismi */}
            <div className="flex-1 space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight uppercase">
                {dict.siteName}
              </h1>
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                {dict.siteDescription}
              </p>
            </div>

            {/* Illustration */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-[480px]" style={{ aspectRatio: "1 / 1" }}>
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse scale-110 group-hover:scale-125 transition-transform duration-700" />
                <Image
                  src="/undraw_doctors_djoj.svg"
                  alt="Tibbiy mutaxassislar – Medical Science Dictionary"
                  width={480}
                  height={480}
                  priority
                  className="relative w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Qidiruv qismi */}
        <div className="container mx-auto pb-24 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <MedicalTranslator dict={dict} />
        </div>
      </div>
    </>
  );
}
