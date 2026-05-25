"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface TranslationInput {
  languageId: number;
  name: string;
  description: string;
}

export async function createTermWithTranslations(translations: TranslationInput[]) {
  const valid = translations.filter((t) => t.name.trim() && t.languageId);
  if (!valid.length) throw new Error("Kamida 1 ta tarjima kiritilishi shart");

  const term = await prisma.medicalTerm.create({ data: {} });

  await prisma.medicalTermTranslation.createMany({
    data: valid.map((t) => ({
      medical_term_id: term.id,
      language_id: t.languageId,
      name: t.name.trim(),
      description: t.description.trim(),
    })),
  });

  revalidatePath("/admin/terms");
  redirect("/admin/terms");
}

export async function deleteMedicalTerm(id: number) {
  await prisma.medicalTermTranslation.deleteMany({ where: { id } });
  revalidatePath("/admin/terms");
}
