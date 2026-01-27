"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAbbreviation(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    throw new Error("Barcha maydonlarni to'ldirish shart!");
  }

  await prisma.abbreviations.create({
    data: {
      title,
      description,
    },
  });

  // Keshni yangilash va ro'yxat sahifasiga qaytish
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/abbreviations");
  redirect("/admin/abbreviations");
}