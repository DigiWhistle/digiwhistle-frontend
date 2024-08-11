"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./brand-columns";
import { DataTable } from "./data-table";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
  BrandRequestsTableLoading,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname } from "next/navigation";

export interface Brand {
  id: string;
  name: string;
  pocFirstName: string;
  pocLastName: string;
  mobileNo: string;
  websiteURL: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
    isApproved: boolean | null;
    isPaused: boolean;
  };
}
export const PAGE_LIMIT = 5;
const BrandTable = () => {
  const currentPath = usePathname();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(BrandRequestsTableData);
  const loading = useAppSelector(BrandRequestsTableLoading);

  useEffect(() => {
    dispatch(
      fetchBrandRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PAGE_LIMIT,
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
    <div className="py-10">
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
