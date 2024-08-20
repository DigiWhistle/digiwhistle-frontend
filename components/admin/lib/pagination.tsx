"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppDispatch, useAppSelector } from "@/lib/config/store";

// import { botRawDataOptions } from "@/store/bot";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ChevronDoubleLeftIcon,
//   ChevronDoubleRightIcon,
// } from "@heroicons/react/24/outline";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname } from "next/navigation";

interface DataTablePaginationProps<TData> {
  data: any;
}

export function DataTablePagination<TData>({ data }: DataTablePaginationProps<TData>) {
  const currentPath = usePathname();

  const redirectUrl = (page: number) => {
    if (typeof window === "undefined") return "";
    const searchParams = new URLSearchParams(window.location.search);
    const newPath = `${currentPath.replace(/\/\d+$/, `/${page}`)}?${searchParams.toString()}`;
    return newPath;
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8 ml-auto">
        {/* <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${rawDataOptions?.limit}`}
            onValueChange={value => {
              table.setPageSize(Number(value));
              setRawDataOptions({
                ...rawDataOptions,
                limit: Number(value),
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rawDataOptions?.limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50, 60, 80, 100].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        {/* <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {data?.currentPage} of {data.totalPages}
        </div> */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                // href={`/${sanitizedPath}/${data.currentPage - 1}`}
                href={redirectUrl(data.currentPage - 1)}
                // onClick={() =>
                // dispatch(
                // fetchBrandRequestsData({ page: data.currentPage - 1, limit: BRAND_TABLE_PAGE_LIMIT }),
                // )
                // }
                className={
                  data.currentPage === 1 ? "pointer-events-none text-tc-black-disabled" : ""
                }
              />
            </PaginationItem>
            {data.currentPage === data.totalPages && data.currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  isActive={false}
                  // href={`/${sanitizedPath}/${data.currentPage - 2}`}
                  href={redirectUrl(data.currentPage - 2)}

                  // href={"#"}
                  // onClick={() => {
                  // dispatch(
                  // fetchBrandRequestsData({ page: data.currentPage - 2, limit: BRAND_TABLE_PAGE_LIMIT }),
                  // );
                  // }}
                >
                  {data.currentPage - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {data.currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={false}
                  // href={"#"}
                  // href={`/${sanitizedPath}/${data.currentPage - 1}`}
                  href={redirectUrl(data.currentPage - 1)}

                  // onClick={() =>
                  // dispatch(
                  // fetchBrandRequestsData({ page: data.currentPage - 1, limit: BRAND_TABLE_PAGE_LIMIT }),
                  // )
                  // }
                >
                  {data.currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={true}
                // href={`#${data.currentPage}`}

                href={"#"}
                // onClick={() =>
                // dispatch(fetchBrandRequestsData({ page: data.currentPage, limit: BRAND_TABLE_PAGE_LIMIT }))
                // }
              >
                {data.currentPage}
              </PaginationLink>
            </PaginationItem>
            {data.currentPage < data.totalPages && (
              <PaginationItem>
                <PaginationLink
                  isActive={false}
                  // href={`/${sanitizedPath}/${data.currentPage + 1}`}
                  // href={currentPath.replace(/\/\d+$/, (data.currentPage + 1).toString())}
                  href={redirectUrl(data.currentPage + 1)}

                  // href={"#"}
                  // onClick={() => {
                  // dispatch(
                  // fetchBrandRequestsData({ page: data.currentPage + 1, limit: BRAND_TABLE_PAGE_LIMIT }),
                  // );
                  // }}
                >
                  {data.currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {data.currentPage === 1 && data.totalPages >= 3 && (
              <PaginationItem>
                <PaginationLink
                  isActive={false}
                  // {`/${}`}
                  // href={currentPath.replace(/\/\d+$/, (data.currentPage + 2).toString())}
                  href={redirectUrl(data.currentPage + 2)}
                >
                  {data.currentPage + 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {/* {Array.from({ length: data.totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink isActive={data.currentPage === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))} */}
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                // href={`/${sanitizedPath}/${data.currentPage + 1}`}

                href={redirectUrl(data.currentPage + 1)}
                // onClick={() =>
                // dispatch(
                // fetchBrandRequestsData({ page: data.currentPage + 1, limit: BRAND_TABLE_PAGE_LIMIT }),
                // )
                // }
                className={
                  data.currentPage === data.totalPages ||
                  data.totalPages === 0 ||
                  data.totalPages === 1
                    ? "pointer-events-none text-tc-black-disabled"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
