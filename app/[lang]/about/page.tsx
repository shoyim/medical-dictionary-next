import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { User, GraduationCap, Building2, BookOpen, Send, Award, FileDown, FileText } from "lucide-react";
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
    "@type": "Organization",
    name: "MedTerm.uz",
    url: BASE_URL,
    sameAs: ["https://t.me/yusupova_shakhnoza"],
    founder: {
      "@type": "Person",
      name: "Shakhnoza Abdukhafizona",
    },
    parentOrganization: {
      "@type": "EducationalOrganization",
      name: t.institute,
    },
  };

  return (
    <>
    <JsonLd data={orgSchema} />
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-16 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        
        {/* YUQORI QISM - VAZIRLIK */}
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
            <Building2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.ministry}
            </h4>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase leading-tight tracking-tighter">
              {t.institute}
            </h1>
          </div>
        </div>

        {/* ASOSIY BLOK - KITOB */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-indigo-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-200 dark:shadow-none">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                {t.label_manual}
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black leading-none uppercase tracking-tighter">
                  {t.main_title}
                </h2>
                <p className="text-blue-100 text-lg md:text-xl font-medium opacity-90 italic">
                  {t.subtitle}
                </p>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                  <BookOpen className="w-4 h-4" /> 292 {t.pages}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                  <GraduationCap className="w-4 h-4" /> {t.city_year}
                </div>
              </div>
            </div>
            {/* Kitob Vizualizatsiyasi */}
            <div className="relative hidden md:block">
               <div className="w-48 h-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 rotate-6 translate-x-4" />
               <div className="absolute inset-0 w-48 h-64 bg-white/20 backdrop-blur-md rounded-2xl border border-white/40 -rotate-3 flex items-center justify-center">
                  <Award className="w-12 h-12 text-white/50" />
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* MUALLIFLAR VA ISHLAB CHIQISH */}
          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 px-2 text-slate-800 dark:text-slate-200">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" /> {t.authors_title}
            </h3>
            <div className="space-y-4">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-2 tracking-widest">{t.author_label}</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase leading-tight">{t.author_name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t.author_desc}</p>
              </div>
              
              <Link href="https://t.me/shoyimobloqulov" target="_blank" className="block">
                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity dark:text-white">
                    <Send className="w-24 h-24" />
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-2 tracking-widest">{t.dev_label}</p>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.dev_name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                    {t.dev_desc} <Send className="w-4 h-4 text-blue-500" />
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* TAQRIZCHILAR */}
          <section className="space-y-6">
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 px-2 text-slate-800 dark:text-slate-200">
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" /> {t.reviewers_title}
            </h3>
            <div className="space-y-3">
              {[
                { name: "Ризаев Ж.А.", desc: lang === 'ru' ? "Доктор медицинских наук, профессор..." : "Tibbiyot fanlari doktori, professor..." },
                { name: "Юсупов А.А.", desc: lang === 'ru' ? "Доктор медицинских наук, профессор..." : "Tibbiyot fanlari doktori, professor..." },
                { name: "Тухтасинов И.М.", desc: lang === 'ru' ? "Доктор педагогических наук, профессор..." : "Pedagogika fanlari doktori, professor..." }
              ].map((rec, i) => (
                <div key={i} className="p-5 bg-white/50 dark:bg-slate-900/50 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm transition-all">
                  <h4 className="font-black text-slate-800 dark:text-slate-200 uppercase text-sm tracking-tight">{rec.name}</h4>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 mt-1">{rec.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* TAHRIRIYAT MA'LUMOTI */}
        <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base italic leading-relaxed max-w-3xl mx-auto" 
             dangerouslySetInnerHTML={{ __html: t.editorial_info }} />
          <div className="h-px w-24 bg-blue-100 dark:bg-slate-800 mx-auto my-4" />
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">{t.city_year}</p>
        </div>

        {/* YUKLAB OLISH QISMI */}
        <section className="space-y-6 pt-8 pb-10">
          <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 px-2 text-slate-800 dark:text-slate-200">
            <FileDown className="w-5 h-5 text-blue-600 dark:text-blue-400" /> {t.resources_title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
              { title: t.book1_title, href: "/uploads/book1.docx" },
              { title: t.book2_title, href: "/uploads/book2.docx" }
            ].map((book, i) => (
              <a key={i} href={book.href} download className="group flex items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-2xl group-hover:bg-red-500 group-hover:text-white transition-colors duration-300 text-red-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase text-sm leading-tight">{book.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">Word • 0.3 MB</p>
                  </div>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FileDown className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}