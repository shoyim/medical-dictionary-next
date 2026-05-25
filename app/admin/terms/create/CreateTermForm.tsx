"use client";

import { useState, useTransition } from "react";
import { createTermWithTranslations, TranslationInput } from "../actions";
import { Plus, Trash2, Save, Globe } from "lucide-react";
import Link from "next/link";

interface Language {
  id: number;
  code: string;
  name: string;
  flag: string;
}

interface Props {
  languages: Language[];
}

const emptyTranslation = (languageId = 0): TranslationInput => ({
  languageId,
  name: "",
  description: "",
});

export function CreateTermForm({ languages }: Props) {
  const [translations, setTranslations] = useState<TranslationInput[]>(
    languages.length > 0
      ? languages.map((l) => emptyTranslation(l.id))
      : [emptyTranslation()]
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const update = (index: number, field: keyof TranslationInput, value: string | number) => {
    setTranslations((prev) => prev.map((t, i) => (i === index ? { ...t, [field]: value } : t)));
  };

  const addRow = () => {
    const usedIds = new Set(translations.map((t) => t.languageId));
    const next = languages.find((l) => !usedIds.has(l.id));
    setTranslations((prev) => [...prev, emptyTranslation(next?.id ?? 0)]);
  };

  const removeRow = (index: number) => {
    if (translations.length === 1) return;
    setTranslations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = translations.filter((t) => t.name.trim() && t.languageId);
    if (!valid.length) {
      setError("Kamida 1 ta tarjima to'ldirilishi shart");
      return;
    }
    setError("");
    startTransition(() => createTermWithTranslations(translations));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {translations.map((t, i) => {
        const lang = languages.find((l) => l.id === t.languageId);
        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {lang?.flag ? (
                  <img src={lang.flag} alt={lang.code} className="w-5 h-4 object-cover rounded-sm" />
                ) : (
                  <Globe className="w-4 h-4 text-slate-400" />
                )}
                <select
                  value={t.languageId}
                  onChange={(e) => update(i, "languageId", Number(e.target.value))}
                  className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer"
                >
                  <option value={0}>Til tanlang...</option>
                  {languages.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeRow(i)}
                disabled={translations.length === 1}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 disabled:opacity-30 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Card body */}
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Termin nomi <span className="text-red-400">*</span>
                </label>
                <input
                  value={t.name}
                  onChange={(e) => update(i, "name", e.target.value)}
                  placeholder="Masalan: Gipotoniya"
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Tavsif
                </label>
                <textarea
                  value={t.description}
                  onChange={(e) => update(i, "description", e.target.value)}
                  placeholder="Termin haqida batafsil ma'lumot..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm leading-relaxed resize-none transition-all"
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Add language button */}
      {translations.length < languages.length && (
        <button
          type="button"
          onClick={addRow}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-400 hover:text-blue-600 font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={16} /> Til qo'shish
        </button>
      )}

      {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Link
          href="/admin/terms"
          className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm"
        >
          Bekor qilish
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-100 transition-all"
        >
          <Save size={16} />
          {isPending ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </div>
    </form>
  );
}
