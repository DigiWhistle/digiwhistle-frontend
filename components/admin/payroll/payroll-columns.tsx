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
import { uniqueId } from "lodash";
import { v4 as uuidv4 } from "uuid";
export const createColumns = (
  type: "Pending" | "All Paid",
  updateData: (id: string, value: boolean) => void,
  deletePayroll: (id: string) => void,
): ColumnDef<Payroll>[] => [
  {
    id: "Actions",
    cell: ({ row }: { row: Row<Payroll> }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className=" flex items-center cursor-pointer ">
          <button type="button">
            <EllipsisVerticalIcon className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1" align="end">
          {/* TODO: TADVI WORK HERE*/}
          {type === "Pending" ? (
            <CustomDialog
              className="w-[840px]"
              headerTitle="Edit profile"
              headerDescription="Please enter below details."
              triggerElement={
                <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                  Edit payroll
                </div>
              }
            >
              <CreatePayrollPopUp mode="Edit payroll" edit_id={row.original} />
            </CustomDialog>
          ) : (
            <></>
          )}

          {type === "All Paid" ? (
            <>
              <CustomDialog
                className="w-[700px]"
                headerTitle="Share salary slip"
                headerDescription="Please note that this action is temporary and reversible in nature."
                triggerElement={
                  <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                    Share salary slip
                  </div>
                }
              >
                <ShareInvoice shareUrl="payroll/share" edit_id={row.original.id} />
              </CustomDialog>
              <button
                className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover "
                onClick={async () => {
                  const response = await GET<{ url: string }>(
                    `payroll/download?id=${row.original.id}`,
                  );
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
                Download Salary slip
              </button>
            </>
          ) : (
            <></>
          )}
          {type === "Pending" ? (
            <CustomDialog
              className="w-[400px]"
              headerTitle="Release payroll"
              headerDescription="Please note that this action is permanent and irreversible in nature."
              triggerElement={
                <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                  Release payroll
                </div>
              }
            >
              <div className="flex w-full gap-3 pt-6 border-t-2">
                <CancelButton />
                <ActionButton
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={async () => {
                    const response = await POST(
                      `payroll/release?id=${row.original.id}`,
                      undefined,
                      undefined,
                      { "x-idempotency-key": uuidv4() },
                    );
                    if (response.error) {
                      toast.error(response.error);
                      // window.location.reload();
                    } else {
                      toast.success("User deleted successfully");
                    }
                  }}
                >
                  Release payroll
                </ActionButton>
              </div>
            </CustomDialog>
          ) : (
            <></>
          )}
          <CustomDialog
            className="w-[400px]"
            headerTitle="Delete query"
            headerDescription="Please note that this action is permanent and irreversible in nature."
            triggerElement={
              <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                Delete payroll
              </div>
            }
          >
            <div className="flex w-full gap-3 pt-6 border-t-2">
              <CancelButton />
              <ActionButton
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={async () => {
                  const response = await DELETE(`payroll/${row.original.id}`);
                  if (response.error) {
                    toast.error(response.error);
                  } else {
                    deletePayroll(row.original.id);
                    toast.success("User deleted successfully");
                  }
                }}
              >
                Delete
              </ActionButton>
            </div>
          </CustomDialog>

          {/* Add DropdownMenuItems here */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }: { row: Row<Payroll> }) => {
      return (
        <div className="flex items-center justify-between gap-3 h-8">
          <div>
            <p>{row.getValue("name")}</p>
            <p className="text-sm text-tc-body-grey">{row.original.email}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Popover>
              <PopoverTrigger>
                <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
              </PopoverTrigger>
              <PopoverContent
                className="w-fit text-tc-primary-white bg-black-201 text-sm p-3 space-y-2"
                sideOffset={4}
                alignOffset={-50}
                align="start"
              >
                <p>Bank name: {row.original.bankName}</p>
                <p>Account No: {row.original.bankAccountNumber}</p>
                <p>IFSC Code: {row.original.bankIfscCode}</p>
                <p>PAN: {row.original.panNo}</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "employmentType",
    header: "Employment",
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
    accessorKey: "salaryMonth",
    header: "Salary Month",
  },
  {
    accessorKey: "workingDays",
    header: "Working days",
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
