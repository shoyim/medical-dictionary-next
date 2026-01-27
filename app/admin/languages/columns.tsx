"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "@/components/admin/DeleteButton";
import Image from "next/image";

export const getColumns = (onDelete: any): ColumnDef<any>[] => [  {
    accessorKey: "flag",
    header: "Bayroq",
    cell: ({ row }) => (
      <img 
        src={row.original.flag} 
        alt={row.original.name} 
        className="w-8 h-8 object-contain rounded-sm shadow-sm"
      />
    )
  },
  { accessorKey: "name", header: "Til nomi" },
  { accessorKey: "code", header: "Kod (ISO)" },
  {
    id: "actions",
    header: () => <div className="text-right">Amallar</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <Link href={`/admin/languages/${row.original.id}/edit`}>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <Pencil size={18} />
          </button>
        </Link>
        <DeleteButton id={row.original.id} onDelete={onDelete} />
      </div>
    ),
  },
];