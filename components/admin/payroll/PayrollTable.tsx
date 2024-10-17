"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { createColumns } from "./payroll-columns";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { DataTable } from "../payroll/data-table";
import {
  deletePayrollByID,
  fetchPayrollTableData,
  PayrollTableData,
  PayrollTableLoading,
} from "@/store/admin/payroll/PayrollTableSlice";
import { PAYROLL_TABLE_PAGE_LIMIT } from "@/types/admin/payroll";
import { formatDateWithZeroTime } from "@/lib/utils";

const PayrollTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(PayrollTableData);
  const loading = useAppSelector(PayrollTableLoading);

  const startTime = searchParams.get("startTime ")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime ")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

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
      fetchPayrollTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PAYROLL_TABLE_PAGE_LIMIT,
        name,
        startTime,
        endTime,
      }),
    );
  }, []);

  const updateData = useCallback(
    (id: string, viewed: boolean) => {
      // dispatch(setViewQuery({ id, viewed }));
    },
    [dispatch],
  );

  const deletePayroll = useCallback(
    (id: string) => {
      dispatch(deletePayrollByID(id));
    },
    [dispatch],
  );

  const columns = useMemo(() => createColumns(updateData, deletePayroll), [updateData]);
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

export default PayrollTable;
