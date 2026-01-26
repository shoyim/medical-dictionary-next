import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/get-dictionary";

// app/[lang]/layout.tsx
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // Params bu yerda Promise!
}) {
  const { lang } = await params; // Await qilish shart!
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Header dict={dict} lang={lang} />
        {children}
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}