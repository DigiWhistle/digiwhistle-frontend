"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { Query, createColumns } from "./queries-columns";
import {
  BrandRequestsTable,
  BrandRequestsTableData,
  fetchBrandRequestsData,
  updateBrandApproval,
} from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname } from "next/navigation";
import { DataTable } from "./data-table";
import { fetchQueriesTableData, QueriesTableData } from "@/store/admin/queries/QueriesTableSlice";

export const PAGE_LIMIT = 5;
const QueriesTable = () => {
  const currentPath = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(QueriesTableData);

  useEffect(() => {
    dispatch(
      fetchQueriesTableData({
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

export default QueriesTable;
