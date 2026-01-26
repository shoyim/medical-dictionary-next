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
        take: pageSize
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

export async function getAbbreviations(query: string, page: number = 1) {
  const pageSize = 6;
  const skip = (page - 1) * pageSize;

  try {
    // Prisma modelini aniqlash
    const abbrModel = 
      (prisma as any).abbreviation || 
      (prisma as any).abbreviations || 
      (prisma as any).Abbreviation;

    if (!abbrModel) {
      throw new Error("Prisma client ichida 'abbreviation' modeli topilmadi.");
    }

    // mode: 'insensitive' olib tashlandi, chunki bazangiz buni qo'llab-quvvatlamaydi
    const whereCondition = query ? {
      OR: [
        { title: { contains: query } },
        { description: { contains: query } }
      ]
    } : {};

    const [totalCount, items] = await Promise.all([
      abbrModel.count({ where: whereCondition }),
      abbrModel.findMany({
        where: whereCondition,
        orderBy: { title: 'asc' },
        skip: skip,
        take: pageSize
      })
    ]);

    // BigInt xatosini oldini olish uchun JSON replacer
    const safeItems = JSON.parse(
      JSON.stringify(items, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return {
      items: safeItems,
      totalPages: Math.ceil(Number(totalCount) / pageSize),
      totalCount: Number(totalCount)
    };
  } catch (error) {
    console.error("Database error details:", error);
    return { items: [], totalPages: 0, totalCount: 0 };
  }
}

export async function getGlobalStats() {
  try {
    // Prisma client ichidagi mavjud modellarni dinamik tekshirish
    const models = Object.keys(prisma);
    
    // Terminlar soni
    const termsModel = (prisma as any).medical_terms || (prisma as any).medical_term || (prisma as any).MedicalTerm;
    const termsCount = termsModel ? await termsModel.count() : 0;

    // Qisqartmalar soni
    const abbrModel = (prisma as any).abbreviations || (prisma as any).abbreviation || (prisma as any).Abbreviation;
    const abbrCount = abbrModel ? await abbrModel.count() : 0;

    // Tillar soni
    const langModel = (prisma as any).languages || (prisma as any).language || (prisma as any).Language;
    const langCount = langModel ? await langModel.count() : 3; // Bazada bo'lmasa default 3 (uz, ru, en)

    // Agar ma'lumot kelsa-yu lekin BigInt bo'lsa Number'ga o'tkazamiz
    const tCount = Number(termsCount);
    const aCount = Number(abbrCount);
    const lCount = Number(langCount);

    return {
      termsCount: tCount,
      abbrCount: aCount,
      langCount: lCount,
      wordsCount: tCount * 15, // O'rtacha hisobda
    };
  } catch (error) {
    console.error("Statistika olishda xatolik:", error);
    return { termsCount: 0, abbrCount: 0, langCount: 0, wordsCount: 0 };
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