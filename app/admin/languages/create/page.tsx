import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { LanguageForm } from "../language-form";

export default function CreateLanguage() {
  async function createAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const flag = formData.get("flag") as string;

    await prisma.language.create({
      data: { name, code, flag }
    });

    revalidatePath("/admin/languages");
    redirect("/admin/languages");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-black">Yangi til qo'shish</h1>
      <LanguageForm action={createAction} />
    </div>
  );
}