"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./queries-columns";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { DataTable } from "./data-table";
import {
  deleteQueryByID,
  fetchQueriesTableData,
  QueriesTableData,
  QueriesTableLoading,
  setViewQuery,
} from "@/store/admin/queries/QueriesTableSlice";
import { QUERY_TABLE_PAGE_LIMIT } from "@/types/admin/queries";

const QueriesTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(QueriesTableData);
  const loading = useAppSelector(QueriesTableLoading);

  useEffect(() => {
    const name = searchParams.get("name");
    const brands =
      searchParams.get("brands") === "true"
        ? true
        : searchParams.get("brands") === "false"
          ? false
          : undefined;
    const influencer =
      searchParams.get("influencer") === "true"
        ? true
        : searchParams.get("influencer") === "false"
          ? false
          : undefined;

    dispatch(
      fetchQueriesTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: QUERY_TABLE_PAGE_LIMIT,
        name,
        brands,
        influencer,
      }),
    );
  }, []);

  const updateData = useCallback(
    (id: string, viewed: boolean) => {
      dispatch(setViewQuery({ id, viewed }));
    },
    [dispatch],
  );

  const deleteQuery = useCallback(
    (id: string) => {
      dispatch(deleteQueryByID(id));
    },
    [dispatch],
  );

  const columns = useMemo(() => createColumns(updateData, deleteQuery), [updateData]);
  return (
    <div className="py-5">
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

export default QueriesTable;
