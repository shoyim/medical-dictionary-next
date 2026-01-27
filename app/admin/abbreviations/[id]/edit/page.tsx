import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditAbbreviation({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const item = await prisma.abbreviations.findUnique({
    where: { id: parseInt(id) },
  });

  if (!item) redirect("/admin/abbreviations");

  async function updateAction(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.abbreviations.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });

    revalidatePath("/admin/abbreviations");
    redirect("/admin/abbreviations");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link href="/admin/abbreviations" className="hover:text-purple-600 transition-colors">Qisqartmalar</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Tahrirlash</span>
      </div>

      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tahrirlash: <span className="text-purple-600">{item.title}</span></h1>

      <form action={updateAction} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Nomi</label>
            <input
              name="title"
              defaultValue={item.title}
              required
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Tavsifi</label>
            <textarea
              name="description"
              defaultValue={item.description}
              required
              rows={5}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700 px-8 py-6 rounded-xl font-bold">Saqlash</Button>
          <Link href="/admin/abbreviations">
            <Button variant="ghost" className="px-6 py-6 rounded-xl font-bold text-slate-500">Bekor qilish</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}