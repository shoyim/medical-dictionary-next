import { getLanguages } from '@/lib/actions';
import { MedicalDictionary } from '@/components/MedicalDictionary';
import { getDictionary } from '@/lib/get-dictionary';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const dbLanguages = await getLanguages();

  console.log('TermsPage - lang:', dict);
  return <MedicalDictionary initialLang={lang} dbLanguages={dbLanguages} dict={dict}/>;
}