import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { BookOpen, Search, Languages, FileText, Send, Sparkles, GraduationCap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("about", lang, "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.about;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.siteName,
    url: BASE_URL,
    description: t.description,
  };

  const features = [
    { icon: <BookOpen className="w-6 h-6" />, title: t.feature_terms, desc: t.feature_terms_desc, color: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" },
    { icon: <FileText className="w-6 h-6" />, title: t.feature_abbr, desc: t.feature_abbr_desc, color: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400" },
    { icon: <Search className="w-6 h-6" />, title: t.feature_search, desc: t.feature_search_desc, color: "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400" },
    { icon: <Languages className="w-6 h-6" />, title: t.feature_multilang, desc: t.feature_multilang_desc, color: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400" },
  ];

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 space-y-16">

          {/* HERO */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-900">
              <Sparkles className="w-3.5 h-3.5" />
              {t.title}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight uppercase">
              {dict.siteName}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* MISSION */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-blue-200 dark:shadow-none">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="relative z-10 space-y-4 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">{t.mission_title}</p>
              <p className="text-xl md:text-2xl font-bold leading-relaxed text-white">
                {t.mission_text}
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-200">
              {t.features_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-3">
                  <div className={`inline-flex p-3 rounded-xl ${f.color}`}>
                    {f.icon}
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-slate-100 text-base uppercase tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AUTHOR */}
          <div className="space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight text-slate-800 dark:text-slate-200">
              {t.contact_title}
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500" />

              <div className="p-8 space-y-6">
                {/* Name & label */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {t.author_label}
                  </p>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {t.author_name}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400 flex-shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.author_degree}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.author_position}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-600 dark:text-blue-400 flex-shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{t.author_institute}</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-600 dark:text-purple-400 flex-shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 italic">{t.author_research}</p>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="https://scholar.google.com/citations?user=jYEspEoAAAAJ&hl=ru"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Google Scholar
                  </Link>
                  <Link
                    href="https://t.me/yusupova_shakhnoza"
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Telegram
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
