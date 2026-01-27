import { createAbbreviation } from "../actions";
import Link from "next/link";

export default function CreateAbbreviationPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-slate-400 font-medium">
        Специальных Терминов &nbsp;›&nbsp; <span className="text-slate-600">Создать</span>
      </nav>

      <h1 className="text-3xl font-black text-slate-900">Создать Abbreviation</h1>

      <form action={createAbbreviation} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Название <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-slate-50/50"
            />
          </div>

          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Описание <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-slate-50/50 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-100"
          >
            Создать
          </button>
          
          <button
            type="submit"
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
          >
            Создать и Создать еще
          </button>

          <Link
            href="/admin/abbreviations"
            className="px-6 py-3 text-slate-500 hover:text-slate-800 font-bold transition-all flex items-center"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}