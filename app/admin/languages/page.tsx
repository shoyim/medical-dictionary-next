import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/language-data-table";
import { revalidatePath } from "next/cache";
import Link from "next/link"; // Yo'naltirish uchun
import { Plus, Languages } from "lucide-react"; // Ikonkalar
import { Button } from "@/components/ui/button";

export default async function LanguagesPage() {
  const data = await prisma.language.findMany({
    orderBy: { created_at: "desc" },
  });

  // Server Action
  async function handleDelete(id: number) {
    "use server";
    try {
      await prisma.language.delete({ where: { id } });
      revalidatePath("/admin/languages");
    } catch (error) {
      console.error("O'chirishda xato:", error);
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER QISMI */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <Languages size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tillar</h1>
            <p className="text-slate-500 font-medium">Tizimdagi mavjud tillar va ularning sozlamalari</p>
          </div>
        </div>

        {/* QO'SHISH TUGMASI */}
        <Link href="/admin/languages/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 rounded-2xl font-bold transition-all gap-2 shadow-md">
            <Plus size={20} />
            Yangi til qo'shish
          </Button>
        </Link>
      </div>

      {/* STATISTIKA (Ixtiyoriy) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jami tillar</p>
          <p className="text-2xl font-black text-slate-900">{data.length}</p>
        </div>
      </div>

      {/* JADVAL */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 overflow-hidden">
        <DataTable 
          data={data} 
          searchKey="name" 
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}