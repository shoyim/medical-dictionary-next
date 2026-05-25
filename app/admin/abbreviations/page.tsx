import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AbbreviationsPage() {
  const data = await prisma.abbreviations.findMany({
    orderBy: { created_at: "desc" },
  });

  async function handleDelete(id: number) {
    "use server";
    await prisma.abbreviations.delete({ where: { id } });
    revalidatePath("/admin/abbreviations");
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Qisqartmalar</h1>
            <p className="text-sm text-slate-500 font-medium">Tibbiy atamalar qisqartmalarini boshqarish</p>
          </div>
        </div>

        <Link href="/admin/abbreviations/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-4 py-2 font-bold shadow-sm transition-all flex items-center gap-2">
            <Plus size={18} />
            Yangi qisqartma qo'shish
          </Button>
        </Link>
      </div>

      <hr className="border-slate-200" />

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
        <DataTable
          data={data}
          searchKey="title"
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}