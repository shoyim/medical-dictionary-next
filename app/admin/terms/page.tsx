import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/terms-data-table";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Plus, LayoutGrid } from "lucide-react"; // Ikonkalar uchun
import { Button } from "@/components/ui/button";

export default async function TermsPage() {
  const data = await prisma.medicalTermTranslation.findMany({
    include: {
      language: true,
      term: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  async function handleDelete(id: number) {
    "use server";
    try {
      await prisma.medicalTermTranslation.delete({ where: { id } });
      revalidatePath("/admin/terms");
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Terminlar</h1>
            <p className="text-sm text-slate-500 font-medium">Lug'atdagi barcha tarjimalarni boshqarish</p>
          </div>
        </div>

        {/* QO'SHISH TUGMASI */}
        <Link href="/admin/terms/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 font-bold shadow-sm transition-all flex items-center gap-2">
            <Plus size={18} />
            Yangi termin qo'shish
          </Button>
        </Link>
      </div>

      <hr className="border-slate-200" />

      {/* JADVAL SEKSIYASI */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
        <DataTable 
          data={data} 
          searchKey="name" 
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}