import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { LanguageForm } from "../../language-form";

export default async function EditLanguage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const language = await prisma.language.findUnique({
    where: { id: parseInt(id) }
  });

  if (!language) redirect("/admin/languages");

  async function updateAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const flag = formData.get("flag") as string;

    await prisma.language.update({
      where: { id: parseInt(id) },
      data: { name, code, flag }
    });

    revalidatePath("/admin/languages");
    redirect("/admin/languages");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-black text-slate-900">Tahrirlash: {language.name}</h1>
      <LanguageForm initialData={language} action={updateAction} />
    </div>
  );
}