"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";

export type Abbreviation = {
  id: number;
  title: string;
  description: string;
};

// Amallar uchun alohida komponent (handleDelete ni prop orqali oladi)
const ActionCell = ({ row, onDelete }: { row: any, onDelete: any }) => {
  const item = row.original;
  return (
    <div className="flex justify-end gap-2">
      <Link 
        href={`/admin/abbreviations/${item.id}/edit`} 
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        <Pencil size={18} />
      </Link>
      <DeleteButton id={item.id} onDelete={onDelete} />
    </div>
  );
};

export const getColumns = (onDelete: any): ColumnDef<Abbreviation>[] => [
  {
    accessorKey: "title",
    header: "Nomi",
    cell: ({ row }) => <span className="font-bold">{row.original.title}</span>
  },
  {
    accessorKey: "description",
    header: "Tavsifi",
    cell: ({ row }) => (
      // max-w-[300px] va truncate orqali uzun matnni qisqartiramiz
      <div className="max-w-50 md:max-w-100 truncate text-slate-500">
        {row.original.description}
      </div>
    )
  },
  {
    id: "actions",
    header: () => <div className="text-right">Amallar</div>,
    cell: ({ row }) => <ActionCell row={row} onDelete={onDelete} />,
  },
];