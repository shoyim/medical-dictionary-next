import { createAbbreviation } from "../actions";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateAbbreviationPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/abbreviations"
          className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Yangi qisqartma qo'shish</h1>
          <p className="text-sm text-slate-500 mt-0.5">Tibbiy atama qisqartmasini kiriting</p>
        </div>
      </div>

      <form action={createAbbreviation} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ma'lumotlar</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Qisqartma <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="Masalan: BP, HR, ICU..."
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Tavsif <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Qisqartmaning to'liq ma'nosi va izohi..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm leading-relaxed resize-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-50 bg-slate-50/30">
          <Link
            href="/admin/abbreviations"
            className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm"
          >
            Bekor qilish
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm shadow-md shadow-purple-100 transition-all"
          >
            <Save size={16} />
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
