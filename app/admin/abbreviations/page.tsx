import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/data-table";
import { revalidatePath } from "next/cache";

export default async function AbbreviationsPage() {
  const data = await prisma.abbreviations.findMany({
    orderBy: { created_at: "desc" },
  });

  // Server Action
  async function handleDelete(id: number) {
    "use server";
    await prisma.abbreviations.delete({ where: { id } });
    revalidatePath("/admin/abbreviations");
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-black">Qisqartmalar</h1>
      
      {/* columns() ni serverda chaqirmaymiz, shunchaki onDelete ni berib yuboramiz */}
      <DataTable 
        data={data} 
        searchKey="title" 
        onDelete={handleDelete} 
      />
    </div>
  );
}