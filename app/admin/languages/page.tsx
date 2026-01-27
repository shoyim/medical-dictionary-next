import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/language-data-table";
import { revalidatePath } from "next/cache";

export default async function LanguagesPage() {
  const data = await prisma.language.findMany({
    orderBy: { created_at: "desc" },
  });

  // Server Action
  async function handleDelete(id: number) {
    "use server";
    await prisma.language.delete({ where: { id } });
    revalidatePath("/admin/languages");
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-black">Tillar</h1>
      
      <DataTable 
        data={data} 
        searchKey="name" 
        onDelete={handleDelete}
        type="languages" // Faqat qaysi turdagi jadval ekanini aytyapmiz
      />
    </div>
  );
}