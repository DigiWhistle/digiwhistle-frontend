"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./agency-columns";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
  BrandRequestsTableLoading,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { AGENCY_TABLE_PAGE_LIMIT } from "@/types/admin/new-requests-types";
import {
  AgencyRequestsTableData,
  AgencyRequestsTableLoading,
  fetchAgencyRequestsData,
  updateAgencyApproval,
} from "@/store/admin/new-requests/AgencyRequestsTableSlice";
import { DataTable } from "./data-table";

const AgencyTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(AgencyRequestsTableData);
  const loading = useAppSelector(AgencyRequestsTableLoading);

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
      fetchAgencyRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: AGENCY_TABLE_PAGE_LIMIT,
        name,
        rejected,
        approved,
      }),
    );
  }, [currentPath, dispatch]);

  const updateData = useCallback(
    (id: string, isApproved: boolean | null) => {
      dispatch(updateAgencyApproval({ id, isApproved }));
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

export default AgencyTable;
