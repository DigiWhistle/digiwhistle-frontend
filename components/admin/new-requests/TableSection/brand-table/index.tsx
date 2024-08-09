"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { Brand, createColumns } from "./brand-columns";
import { DataTable } from "./data-table";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname } from "next/navigation";

export const PAGE_LIMIT = 5;
const BrandTable = () => {
  const currentPath = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(BrandRequestsTableData);

  useEffect(() => {
    dispatch(
      fetchBrandRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PAGE_LIMIT,
      }),
    );
  }, []);

  const updateData = useCallback(
    (id: string, isApproved: boolean | null) => {
      dispatch(updateBrandApproval({ id, isApproved }));
    },
    [dispatch],
  );

  const columns = useMemo(() => createColumns(updateData), [updateData]);
  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default BrandTable;
