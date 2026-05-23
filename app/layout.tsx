import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export const metadata: Metadata = {
  title: {
    default: "MedTerm.uz | Tibbiy Terminlar Lug'ati",
    template: "%s | MedTerm.uz",
  },
  description:
    "O'zbek, rus va ingliz tillaridagi mukammal tibbiy terminlar lug'ati. Tibbiy terminlar, qisqartmalar va ularning ta'riflari.",
  keywords: [
    "medterm",
    "medterm.uz",
    "tibbiy lug'at",
    "tibbiy terminlar",
    "medical dictionary",
    "tibbiyot",
    "qisqartmalar",
    "o'zbekcha tibbiy lug'at",
    "SamDCHTI",
  ],
  metadataBase: new URL(BASE_URL),

  openGraph: {
    title: "MedTerm.uz | Tibbiy Terminlar Lug'ati",
    description:
      "O'zbek, rus va ingliz tillaridagi professional tibbiy terminlar bazasi",
    type: "website",
    locale: "uz_UZ",
    url: BASE_URL,
    siteName: "MedTerm.uz",
    images: [{ url: "/og", width: 1200, height: 630, alt: "MedTerm.uz" }],
  },

  twitter: {
    card: "summary_large_image",
    title: "MedTerm.uz | Tibbiy Terminlar Lug'ati",
    description: "Tibbiy terminlar va qisqartmalar bo'yicha professional lug'at",
    images: ["/og"],
  },

  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/logo-icon.svg",
  },

  authors: [
    {
      name: "Шахноза Абдухафизовна",
      url: "https://t.me/yusupova_shakhnoza",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
