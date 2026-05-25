import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

export const LOCALES = ["uz", "ru", "en"] as const;
export type SiteLocale = (typeof LOCALES)[number];

// Har bir sahifa uchun ko'p tilli meta ma'lumotlari
const pageMeta = {
  home: {
    uz: {
      title: "Medical Science Dictionary – Tibbiy Terminlar Lug'ati",
      description:
        "O'zbek, rus va ingliz tillaridagi tibbiy terminlar, qisqartmalar va tushunchalarning ko'p tilli professional lug'ati. SamDCHTI.",
    },
    ru: {
      title: "Medical Science Dictionary – Медицинский словарь терминов",
      description:
        "Многоязычный профессиональный словарь медицинских терминов, аббревиатур и понятий на узбекском, русском и английском языках. СамГИИЯ.",
    },
    en: {
      title: "Medical Science Dictionary – Medical Terminology Dictionary",
      description:
        "A multilingual professional medical dictionary of terms, abbreviations and definitions in Uzbek, Russian and English. SamSIFL.",
    },
  },
  terms: {
    uz: {
      title: "Tibbiy Terminlar | Lug'at",
      description:
        "3 tilda tibbiy terminlarni qidiring, tarjima qiling va o'rganing. Patologik anatomiya, klinik tibbiyot va boshqa sohalar.",
    },
    ru: {
      title: "Медицинские Термины | Словарь",
      description:
        "Ищите, переводите и изучайте медицинские термины на 3 языках: узбекском, русском и английском.",
    },
    en: {
      title: "Medical Terms | Dictionary",
      description:
        "Search, translate and learn medical terms in 3 languages: Uzbek, Russian and English.",
    },
  },
  abbreviation: {
    uz: {
      title: "Tibbiy Qisqartmalar | Lug'at",
      description:
        "Tibbiy qisqartmalar va ularning to'liq shakllarini O'zbek, Rus va Ingliz tillarida qidiring.",
    },
    ru: {
      title: "Медицинские Аббревиатуры | Словарь",
      description:
        "Ищите медицинские аббревиатуры и их расшифровки на узбекском, русском и английском языках.",
    },
    en: {
      title: "Medical Abbreviations | Dictionary",
      description:
        "Search medical abbreviations and their full forms in Uzbek, Russian and English.",
    },
  },
  stats: {
    uz: {
      title: "Statistika | Medical Science Dictionary",
      description:
        "Medical Science Dictionary platformasidagi terminlar soni, tillar va so'nggi qo'shimchalar haqida umumiy statistika.",
    },
    ru: {
      title: "Статистика | Medical Science Dictionary",
      description:
        "Общая статистика платформы Medical Science Dictionary: количество терминов, языков и последние добавления.",
    },
    en: {
      title: "Statistics | Medical Science Dictionary",
      description:
        "Medical Science Dictionary platform statistics: number of terms, languages and recent additions.",
    },
  },
  about: {
    uz: {
      title: "Biz Haqimizda | Medical Science Dictionary",
      description:
        "Medical Science Dictionary loyihasi haqida: muallif Шахноза Абдухафизовна, SamDCHTI, va ko'p tilli tibbiy lug'at tarixiga oid ma'lumotlar.",
    },
    ru: {
      title: "О нас | Medical Science Dictionary",
      description:
        "О проекте Medical Science Dictionary: автор Шахноза Абдухафизовна, СамГИИЯ и история создания многоязычного медицинского словаря.",
    },
    en: {
      title: "About | Medical Science Dictionary",
      description:
        "About the Medical Science Dictionary project: author Shakhnoza Abdukhafizona, SamSIFL and the history of the multilingual medical dictionary.",
    },
  },
} as const;

export type PageKey = keyof typeof pageMeta;

/** Sahifaga mos hreflang alternativlar */
export function getAlternates(path: string = "") {
  const languages: Record<string, string> = {};
  for (const lang of LOCALES) {
    languages[lang] = `${BASE_URL}/${lang}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/uz${path}`;
  return { languages };
}

/** Bir sahifaning to'liq Metadata ob'ekti */
export function buildMetadata(
  pageKey: PageKey,
  lang: string,
  path: string = ""
): Metadata {
  const locale = LOCALES.includes(lang as SiteLocale) ? (lang as SiteLocale) : "uz";
  const meta = pageMeta[pageKey][locale];
  const canonical = `${BASE_URL}/${lang}${path}`;

  const ogLocaleMap: Record<SiteLocale, string> = {
    uz: "uz_UZ",
    ru: "ru_RU",
    en: "en_US",
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      ...getAlternates(path),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      locale: ogLocaleMap[locale],
      type: "website",
      siteName: "Medical Science Dictionary",
      images: [
        {
          url: `${BASE_URL}/og`,
          width: 1200,
          height: 630,
          alt: "Medical Science Dictionary",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og`],
    },
  };
}
