"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./brand-columns";
import { DataTable } from "./data-table";
import {
  BrandRequestsTableData,
  BrandRequestsTableLoading,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { BRAND_TABLE_PAGE_LIMIT } from "@/types/admin/new-requests";

const BrandTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(BrandRequestsTableData);
  const loading = useAppSelector(BrandRequestsTableLoading);

  useEffect(() => {
    const name = searchParams.get("name");
    const rejected =
      searchParams.get("rejected") === "true"
        ? true
        : searchParams.get("rejected") === "false"
          ? false
          : undefined;
    const approved =
      searchParams.get("approved") === "true"
        ? true
        : searchParams.get("approved") === "false"
          ? false
          : undefined;

    dispatch(
      fetchBrandRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: BRAND_TABLE_PAGE_LIMIT,
        name,
        rejected,
        approved,
      }),
    );
  }, [currentPath, dispatch]);

  const updateData = useCallback(
    (id: string, isApproved: boolean | null) => {
      dispatch(updateBrandApproval({ id, isApproved }));
    },
    [dispatch],
  );

  const columns = useMemo(() => createColumns(updateData), [updateData]);
  return (
    <div className="py-6">
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default BrandTable;
