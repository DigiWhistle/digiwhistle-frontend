"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./influencer-columns";
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
import {
  AgencyRequestsTableData,
  AgencyRequestsTableLoading,
  fetchAgencyRequestsData,
  updateAgencyApproval,
} from "@/store/admin/new-requests/AgencyRequestsTableSlice";
import { DataTable } from "./data-table";
import {
  fetchInfluencerRequestsData,
  InfluencerRequestsTableData,
  InfluencerRequestsTableLoading,
  updateInfluencerApproval,
} from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import { InfluencerPlatforms } from "@/types/admin/influencer";

export const INFLUENCER_TABLE_PAGE_LIMIT = 5;

const InfluencerTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useAppDispatch();
  const data = useAppSelector(InfluencerRequestsTableData);
  const loading = useAppSelector(InfluencerRequestsTableLoading);

  const platform =
    (searchParams.get("platform") as InfluencerPlatforms) ?? InfluencerPlatforms.INSTAGRAM;

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
  useEffect(() => {
    dispatch(
      fetchInfluencerRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: INFLUENCER_TABLE_PAGE_LIMIT,
        platform,
        name,
        rejected,
        approved,
      }),
    );
  }, [currentPath, platform, name, rejected, approved]);

  const updateData = useCallback((id: string, isApproved: boolean | null) => {
    dispatch(updateInfluencerApproval({ id, isApproved }));
  }, []);

  const columns = useMemo(() => createColumns(updateData, platform), [updateData, platform]);
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

export default InfluencerTable;
