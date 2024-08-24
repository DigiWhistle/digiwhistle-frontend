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
import { DataTablePagination } from "../../../lib/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    data: TData[];
  };
  isMainTable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isMainTable,
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
                <TableRow
                  key={row.id}
                  className={cn(
                    "my-10",
                    !isMainTable && row.getValue("isApproved") !== null ? "bg-gray-552" : "",
                    isMainTable &&
                      row.getAllCells().some(cell => cell.column.id === "exclusive") &&
                      row.getValue("exclusive")
                      ? "bg-gray-552"
                      : "",
                  )}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        cell === row.getVisibleCells().at(-1) ? "after:content-none" : "",
                        cell === row.getVisibleCells().at(0) && row.getValue("isApproved")
                          ? "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:border-2 before:rounded-r-lg before:border-success"
                          : cell === row.getVisibleCells().at(0) &&
                              row.getValue("isApproved") === false
                            ? "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:border-2 before:rounded-r-lg before:border-destructive"
                            : "",
                        isMainTable &&
                          cell === row.getVisibleCells().at(0) &&
                          row.getAllCells().some(cell => cell.column.id === "exclusive") &&
                          row.getValue("exclusive")
                          ? "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-4/5 before:border-2 before:rounded-r-lg before:border-link"
                          : "",
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
      <DataTablePagination data={data} />
    </div>
  );
}
