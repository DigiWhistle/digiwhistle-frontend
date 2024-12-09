"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { PURCHASE_INVOICE_TABLE_PAGE_LIMIT } from "@/types/admin/invoice";
import { formatDateWithZeroTime } from "@/lib/utils";
import {
  deletePurchaseInvoiceByID,
  fetchPurchaseInvoiceTableData,
  PurchaseInvoiceTableData,
  PurchaseInvoiceTableLoading,
} from "@/store/admin/invoice/PurchaseInvoiceTableSlice";
import { DataTablePagination } from "@/components/admin/lib/pagination";
import PurchaseInvoiceCard from "./purchase-invoice-card";

const PurchaseInvoiceTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(PurchaseInvoiceTableData);
  const loading = useAppSelector(PurchaseInvoiceTableLoading);

  const startTime = searchParams.get("startTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  const invoiceNo = searchParams.get("search");

  useEffect(() => {
    dispatch(
      fetchPurchaseInvoiceTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PURCHASE_INVOICE_TABLE_PAGE_LIMIT,
        invoiceNo,
        startTime,
        endTime,
      }),
    );
  }, [currentPath, dispatch, endTime, invoiceNo, startTime]);

  const updateData = useCallback(
    (id: string, viewed: boolean) => {
      // dispatch(setViewQuery({ id, viewed }));
    },
    [dispatch],
  );

  const deletePurchaseInvoice = useCallback(
    (id: string) => {
      dispatch(deletePurchaseInvoiceByID(id));
    },
    [dispatch],
  );

  const InvoiceTable =
    data.data.length > 0 ? (
      data.data.map((campaign, index) => (
        <PurchaseInvoiceCard key={index} data={campaign} index={index} />
      ))
    ) : (
      <div className="w-full h-44 flex justify-center items-center">No invoices found</div>
    );
  return (
    <div className="pb-5">
      {loading ? (
        <div className="flex w-full items-center h-48 justify-center">
          <span className="loading loading-spinner loading-sm "></span>
        </div>
      ) : (
        <div className="space-y-5 mt-5">
          {InvoiceTable}
          <DataTablePagination data={data} />
        </div>
      )}
    </div>
  );
};

export default PurchaseInvoiceTable;
