"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "../lib/pagination";
import { PaymentStatus, PaymentTerms } from "@/types/admin/payroll";
import { useAppSelector } from "@/lib/config/store";
import { UserDesignation, UserRole } from "@/store/UserSlice";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    data: TData[];
  };
  type: PaymentStatus;
  isEmployee: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
  isEmployee,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 pb-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-552 text-gray-555">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.index === table.getAllColumns().length - 1
                          ? "after:content-none"
                          : ""
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className={cn("my-10")}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell === row.getVisibleCells().at(-1) ? "after:content-none" : "",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {(type === PaymentStatus.ALL_PAID || isEmployee) && <DataTablePagination data={data} />}
    </div>
  );
}
