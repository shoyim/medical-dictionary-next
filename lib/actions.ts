"use server";
import { prisma } from "@/lib/prisma";

export async function getLanguages() {
  try {
    const langs = await prisma.language.findMany();
    return langs;
  } catch (error) {
    return [];
  }
}

export async function getTermsByLetter(letter: string, langCode: string) {
  const language = await prisma.language.findUnique({
    where: { code: langCode }
  });

  if (!language) return [];
  return await prisma.medicalTermTranslation.findMany({
    where: {
      name: { startsWith: letter },
      language_id: language.id 
    },
    orderBy: {
      name: 'asc'
    }
  });
}

export async function getTerms(query: string, letter: string, langCode: string, page: number = 1) {
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  try {
    const language = await prisma.language.findUnique({
      where: { code: langCode }
    });

    if (!language) return { terms: [], totalPages: 0, totalCount: 0 };

    const whereCondition = {
      language_id: language.id,
      AND: [
        letter ? { name: { startsWith: letter } } : {},
        query ? {
          OR: [
            { name: { contains: query } },
            { description: { contains: query } }
          ]
        } : {}
      ]
    };

    const [totalCount, terms] = await Promise.all([
      prisma.medicalTermTranslation.count({ where: whereCondition }),
      prisma.medicalTermTranslation.findMany({
        where: whereCondition,
        orderBy: { name: 'asc' },
        skip: skip,
        take: pageSize,
        include: {
          term: {
            include: {
              translations: {
                where: { language_id: { not: language.id } },
                include: { language: { select: { code: true, flag: true } } }
              }
            }
          }
        }
      })
    ]);

    return {
      terms: JSON.parse(JSON.stringify(terms)),
      totalPages: Math.ceil(totalCount / pageSize),
      totalCount
    };
  } catch (error) {
    console.error("Database error:", error);
    return { terms: [], totalPages: 0, totalCount: 0 };
  }
}

export async function getAbbreviations(query: string, page: number = 1, letter: string = "") {
  const pageSize = 12;
  const skip = (page - 1) * pageSize;

  try {
    const whereCondition = query
      ? { OR: [{ title: { contains: query } }, { description: { contains: query } }] }
      : letter
      ? { title: { startsWith: letter } }
      : {};

    const [totalCount, items] = await Promise.all([
      prisma.abbreviations.count({ where: whereCondition }),
      prisma.abbreviations.findMany({
        where: whereCondition,
        orderBy: { title: "asc" },
        skip,
        take: pageSize,
      }),
    ]);

    return {
      items: JSON.parse(JSON.stringify(items)),
      totalPages: Math.ceil(Number(totalCount) / pageSize),
      totalCount: Number(totalCount),
    };
  } catch (error) {
    console.error("Database error details:", error);
    return { items: [], totalPages: 0, totalCount: 0 };
  }
}

export async function getGlobalStats() {
  try {
    const [termsCount, abbrCount, langCount, langBreakdown] = await Promise.all([
      prisma.medicalTerm.count(),
      prisma.abbreviations.count(),
      prisma.language.count(),
      prisma.language.findMany({
        include: { _count: { select: { translations: true } } }
      }),
    ]);

    return {
      termsCount: Number(termsCount),
      abbrCount: Number(abbrCount),
      langCount: Number(langCount),
      langBreakdown: langBreakdown.map(l => ({
        code: l.code,
        name: l.name,
        flag: l.flag,
        count: l._count.translations,
      })),
    };
  } catch (error) {
    console.error("Statistika olishda xatolik:", error);
    return { termsCount: 0, abbrCount: 0, langCount: 0, langBreakdown: [] };
  }
}

export async function getTranslation(query: string, targetLangCode: string) {
  if (!query) return null;

  try {
    const language = await prisma.language.findFirst({
      where: { code: targetLangCode }
    });

    if (!language) return "Til topilmadi";

    const translation = await prisma.medicalTermTranslation.findFirst({
      where: {
        language_id: language.id,
        name: {
          contains: query.trim(),
          // SQLite'da mode: "insensitive" ishlamaydi, shuning uchun o'chirildi
        }
      },
      select: {
        description: true,
      }
    });

    return translation?.description || "Перевод не найден";

  } catch (error) {
    console.error("Database error:", error);
    return "Xatolik yuz berdi";
  }
}