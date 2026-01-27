"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMedicalTerm(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const languageId = formData.get("languageId") as string;

  const newTerm = await prisma.medicalTerm.create({ data: {} });

  await prisma.medicalTermTranslation.create({
    data: {
      name,
      description,
      language_id: parseInt(languageId),
      medical_term_id: newTerm.id,
    },
  });

  revalidatePath("/admin/terms");
}