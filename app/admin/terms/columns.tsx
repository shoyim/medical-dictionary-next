"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const getColumns = (onDelete: any): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Termin nomi",
    cell: ({ row }) => <span className="font-bold text-slate-900">{row.original.name}</span>
  },
  {
    accessorKey: "description",
    header: "Tasnif",
    cell: ({ row }) => {
      const description = row.original.description;

      return (
        <div 
          // HTML teglarni talqin qilish (dangerouslySetInnerHTML)
          dangerouslySetInnerHTML={{ __html: description }} 
          // 'prose' klassi HTML elementlarga chiroyli stil beradi (agar tailwind/typography bo'lsa)
          // 'line-clamp-none' barcha matnni to'liq ko'rsatish uchun
          className="max-w-[500px] whitespace-normal break-words prose prose-sm prose-slate"
        />
      );
    }
  },
  {
    accessorKey: "language.name",
    header: "Til",
    cell: ({ row }) => (
      <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-bold uppercase">
        {row.original.language?.code || "???"} / {row.original.language?.name || "Noma'lum"}
      </span>
    )
  },
  {
    id: "actions",
    header: () => <div className="text-right">Amallar</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Link href={`/admin/terms/${row.original.id}/edit`}>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <Pencil size={18} />
          </button>
        </Link>
        <DeleteButton id={row.original.id} onDelete={onDelete} />
      </div>
    ),
  },
];