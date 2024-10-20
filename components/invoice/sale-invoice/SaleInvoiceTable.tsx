"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/config/store";
import { usePathname, useSearchParams } from "next/navigation";
import { PURCHASE_INVOICE_TABLE_PAGE_LIMIT } from "@/types/admin/invoice";
import { formatDateWithZeroTime } from "@/lib/utils";
import {
  deleteSaleInvoiceByID,
  SaleInvoiceTableData,
  SaleInvoiceTableLoading,
} from "@/store/admin/invoice/SaleInvoiceTableSlice";
import { DataTablePagination } from "@/components/admin/lib/pagination";
import PurchaseInvoiceCard from "./purchase-invoice-card";
import { fetchSaleInvoiceTableData } from "@/store/admin/invoice/SaleInvoiceTableSlice";
import SaleInvoiceCard from "./sale-invoice-card";

const SaleInvoiceTable = () => {
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const data = useAppSelector(SaleInvoiceTableData);
  const loading = useAppSelector(SaleInvoiceTableLoading);

  const startTime = searchParams.get("startTime ")
    ? formatDateWithZeroTime(new Date(searchParams.get("startTime ")!))
    : formatDateWithZeroTime(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));

  const endTime = searchParams.get("endTime")
    ? formatDateWithZeroTime(new Date(searchParams.get("endTime")!))
    : formatDateWithZeroTime(new Date());

  const invoiceNo = searchParams.get("invoiceNo");
  const invoiceType = currentPath.split("/")[currentPath.split("/").length - 2] as
    | "sale"
    | "proforma";

  useEffect(() => {
    dispatch(
      fetchSaleInvoiceTableData({
        page: Number(currentPath.split("/")[currentPath.split("/").length - 1]),
        limit: PURCHASE_INVOICE_TABLE_PAGE_LIMIT,
        invoiceNo,
        startTime,
        endTime,
        invoiceType,
      }),
    );
  }, [currentPath, dispatch, endTime, invoiceNo, startTime, invoiceType]);

  const InvoiceTable =
    data.data.length > 0 ? (
      data.data.map((campaign, index) => (
        <SaleInvoiceCard key={index} data={campaign} index={index} invoiceType={invoiceType} />
      ))
    ) : (
      <div className="w-full h-44 flex justify-center items-center">No invoices found</div>
    );
  return (
    <div className="py-5">
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

export default SaleInvoiceTable;
