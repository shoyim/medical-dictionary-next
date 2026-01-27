import { getDictionary } from '@/lib/get-dictionary';
import { MedicalTranslator } from "@/components/Translator";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Matn qismi: Nomi va Tavsifi */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              {dict.siteAbbr} <span className="text-blue-600">{dict.siteName}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {dict.siteDescription}
            </p>
          </div>

          {/* O'ng tarafdagi rasm yoki Katta Icon */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px] aspect-square">
              {/* Orqa fondagi yengil effekt */}
              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              
              </div>
          </div>
        </div>
      </div>

      {/* Translator qismi - Hech qanday manfiy marjinsiz, toza joylashuv */}
      <div className="container mx-auto pb-24">
        <MedicalTranslator dict={dict} />
      </div>
    </main>
  );
}