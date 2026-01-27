"use client";

import { LanguageClientProps } from "@/types"; // ixtiyoriy interfeys
import { getColumns } from "../columns";
import { DataTable } from "@/components/admin/data-table";

export const LanguageClient = ({ data, onDelete }: any) => {
  const columns = getColumns(onDelete);

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="name" // columns ichidagi accessorKey bilan bir xil!
    />
  );
};