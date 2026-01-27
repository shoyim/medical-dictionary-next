import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function CreateTermPage() {
  // Mavjud tillarni olamiz
  const languages = await prisma.language.findMany();

  // Server Action: Ma'lumotni saqlash
  async function createTerm(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const languageId = formData.get("languageId") as string;

    // 1. Avval asosiy MedicalTerm-ni yaratamiz
    const newTerm = await prisma.medicalTerm.create({
      data: {} // Bo'sh obyekt, chunki asosiysi ID yaratish
    });

    // 2. Keyin uning tarjimasini yaratamiz
    await prisma.medicalTermTranslation.create({
      data: {
        name,
        description,
        language_id: parseInt(languageId),
        medical_term_id: newTerm.id,
      },
    });

    revalidatePath("/admin/terms");
    redirect("/admin/terms");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/terms">
            <Button variant="outline" size="icon" className="rounded-xl">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Yangi termin qo'shish</h1>
        </div>
      </div>

      <form action={createTerm} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Termin nomi */}
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold text-slate-700">Termin nomi</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Masalan: Gipotoniya" 
              required 
              className="rounded-xl border-slate-200 h-12 focus:ring-blue-500"
            />
          </div>

          {/* Tilni tanlash */}
          <div className="space-y-2">
            <Label htmlFor="languageId" className="font-bold text-slate-700">Til</Label>
            <select
              id="languageId"
              name="languageId"
              required
              className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="">Tilni tanlang...</option>
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tasnif (HTML yozish uchun) */}
        <div className="space-y-2">
          <Label htmlFor="description" className="font-bold text-slate-700">Tasnif (HTML formatida yozishingiz mumkin)</Label>
          <textarea
            id="description"
            name="description"
            rows={8}
            placeholder="Termin haqida batafsil ma'lumot... <p>Teglardan foydalansa bo'ladi</p>"
            required
            className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          ></textarea>
          <p className="text-xs text-slate-400 italic font-medium">
            Maslahat: HTML teglardan foydalaning, masalan: &lt;b&gt;bold&lt;/b&gt;, &lt;br/&gt; (yangi qator).
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/terms">
            <Button type="button" variant="ghost" className="rounded-xl font-bold">Bekor qilish</Button>
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-blue-100 flex gap-2">
            <Save size={18} /> Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
}