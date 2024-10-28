"use client";

import type { ColumnDef, Row, TableMeta } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { DELETE, GET, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Payroll } from "@/types/admin/payroll";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CurrencyValueDisplay from "@/components/ui/currency-value-display";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import CreatePayrollPopUp from "./CreatePayrollPopUp";
import ShareInvoice from "../invoices/ShareInvoice";
export const createColumnsEmployee = (
  type: "Pending" | "All Paid",
  updateData: (id: string, value: boolean) => void,
  deletePayroll: (id: string) => void,
): ColumnDef<Payroll>[] => [
  {
    accessorKey: "salaryMonth",
    header: "Salary Month",
  },
  {
    accessorKey: "basic",
    header: "Basic",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("basic"))} />;
    },
  },
  {
    accessorKey: "hra",
    header: "HRA",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("hra"))} />;
    },
  },
  {
    accessorKey: "others",
    header: "Others",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("others"))} />;
    },
  },
  {
    accessorKey: "ctc",
    header: "CTC / month",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("ctc"))} />;
    },
  },

  {
    accessorKey: "grossPay",
    header: "Gross Pay",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("grossPay"))} />;
    },
  },
  {
    accessorKey: "tds",
    header: "TDS Amount",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("tds"))} />;
    },
  },
  {
    accessorKey: "incentive",
    header: "Incentive",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("incentive"))} />;
    },
  },
  {
    accessorKey: "finalPay",
    header: "Final Pay",
    cell: ({ row }) => {
      return <CurrencyValueDisplay value={Number(row.getValue("finalPay"))} />;
    },
  },
  {
    id: "new",
    header: "Pay Slip",
    cell: ({ row }) => {
      return (
        <button
          className="flex gap-2 items-center"
          onClick={async () => {
            const response = await GET<{ url: string }>(`payroll/download?id=${row.original.id}`);
            if (response.error) {
              toast.error(response.error);
              return;
            }

            const url = response.data?.url;
            if (typeof url === "string") {
              window.open(url, "_blank");
            } else {
              toast.error("Invalid URL");
            }
          }}
        >
          <div>
            <ArrowDownTrayIcon className="h-5 w-5" />
          </div>
          <p className="text-center text-sm font-medium">Download Salary Slip</p>
        </button>
      );
    },
  },

  // {
  //   accessorKey: "createdAt",
  //   header: "Request Date and time",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex flex-wrap items-center gap-1 justify-center">
  //         <p>{new Date(row.getValue("createdAt")).toLocaleDateString("en-US")} </p>
  //         <p className="text-sm text-tc-body-grey">
  //           @
  //           {new Date(row.getValue("createdAt")).toLocaleTimeString("en-US", {
  //             hour: "numeric",
  //             minute: "numeric",
  //             hour12: true,
  //           })}
  //         </p>
  //       </div>
  //     );
  //   },
  // },
];
