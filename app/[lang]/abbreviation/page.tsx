import { getDictionary } from "@/lib/get-dictionary";
import { AbbreviationList } from "@/components/AbbreviationList";

export default async function AbbrPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; 
  
  const dict = await getDictionary(lang);

  return (
    // transition-colors orqali rejimlar almashganda silliq o'tish ta'minlanadi
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950 transition-colors duration-300">
      <AbbreviationList dict={dict} initialLang={lang} />
    </div>
  );
}