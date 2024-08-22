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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  patchInfluencerDataById,
  updateInfluencerApproval,
} from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import { Influencer, InfluencerPlatforms } from "@/types/admin/influencer";

export const INFLUENCER_TABLE_PAGE_LIMIT = 5;

const InfluencerTable = ({ isMainTable }: { isMainTable?: boolean }) => {
  const router = useRouter();
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
  let approved =
    searchParams.get("approved") === "true"
      ? true
      : searchParams.get("approved") === "false"
        ? false
        : undefined;
  const sortEr = searchParams.get("sortEr") === "true";

  approved = isMainTable;

  useEffect(() => {
    dispatch(
      fetchInfluencerRequestsData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: INFLUENCER_TABLE_PAGE_LIMIT,
        platform,
        name,
        rejected,
        approved,
        sortEr,
      }),
    );
  }, [dispatch, currentPath, platform, name, rejected, approved, sortEr]);

  const updateData = useCallback((id: string, isApproved: boolean | null) => {
    dispatch(updateInfluencerApproval({ id, isApproved }));
  }, []);

  const patchDataById = useCallback((id: string, data: Partial<Influencer>) => {
    dispatch(patchInfluencerDataById({ id, data }));
  }, []);

  const handleSortEr = (setSortEr: boolean) => {
    const newPath = currentPath.replace(/\/\d+$/, "/1");
    const url = new URL(window.location.href);
    url.pathname = newPath;
    url.searchParams.set("sortEr", setSortEr ? "true" : "false");
    router.push(url.toString());
  };

  const columns = useMemo(
    () => createColumns(updateData, handleSortEr, platform, isMainTable, patchDataById),
    [updateData, platform],
  );
  return (
    <div className="py-6">
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <DataTable columns={columns} data={data} isMainTable />
      )}
    </div>
  );
};

export default InfluencerTable;
