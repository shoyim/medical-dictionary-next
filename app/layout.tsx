import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { env } from "process";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO VA META MA'LUMOTLAR
export const metadata: Metadata = {
  title: {
    default: "Medical Dictionary | Tibbiy Lug'at",
    template: "%s | Medical Dictionary"
  },
  description: "O'zbek, rus va ingliz tillaridagi mukammal tibbiy lug'at. Tibbiy terminlar ta'rifi va tushuntirishlari.",
  keywords: ["medical dictionary", "tibbiy lug'at", "terminlar", "tibbiyot", "kasalliklar", "o'zbekcha tibbiy lug'at"],
  
  openGraph: {
    title: "Medical Dictionary | Tibbiy Lug'at",
    description: "Tibbiy terminlarning ko'p tillik bazasi",
    type: "website",
    locale: "uz_UZ",
    url: env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", 
    siteName: "Medical Dictionary",
  },

  twitter: {
    card: "summary_large_image",
    title: "Medical Dictionary | Tibbiy Lug'at",
    description: "Tibbiy terminlar bo'yicha mukammal qo'llanma",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}