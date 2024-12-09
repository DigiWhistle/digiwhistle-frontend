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
import { PaymentStatus, PaymentTerms, PAYROLL_TABLE_PAGE_LIMIT } from "@/types/admin/payroll";
import { formatDateWithZeroTime } from "@/lib/utils";
import { UserDesignation, UserRole } from "@/store/UserSlice";
import { createColumnsEmployee } from "./payroll-columns-employee";

const PayrollTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(PayrollTableData);
  const loading = useAppSelector(PayrollTableLoading);

  const role = useAppSelector(UserRole);
  const designation = useAppSelector(UserDesignation);

  const startTime = searchParams.get("startTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 2)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  const search = searchParams.get("search");
  const type = (searchParams.get("type") as PaymentStatus) || PaymentStatus.PENDING;

  const isEmployee = role === "employee" && designation !== "account";

  useEffect(() => {
    dispatch(
      fetchPayrollTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PAYROLL_TABLE_PAGE_LIMIT,
        search,
        startTime,
        endTime,
        type,
        isEmployee,
      }),
    );
  }, [currentPath, dispatch, endTime, search, startTime, type, role, designation]);

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

  const columns = useMemo(() => {
    let columns;
    if (designation === "account" || role === "admin") {
      columns = createColumns(type, updateData, deletePayroll);
    } else {
      columns = createColumnsEmployee(type, updateData, deletePayroll);
    }
    return columns;
  }, [updateData, type, role, designation]);
  return (
    <div className="py-5">
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <DataTable columns={columns} data={data} type={type} isEmployee={isEmployee} />
      )}
    </div>
  );
};

export default PayrollTable;
