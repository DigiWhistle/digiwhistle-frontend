"use client";

import type { ColumnDef, TableMeta } from "@tanstack/react-table";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
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
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";
import ApproveForm from "./ApproveForm";
import RejectForm from "./RejectForm";
import ViewRemarks from "./ViewRemarks";
import { Brand } from "@/types/admin/new-requests";

export const createColumns = (
  updateData: (id: string, value: boolean | null) => void,
): ColumnDef<Brand>[] => [
  {
    accessorKey: "name",
    header: () => <div className="">Brand Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 h-8">
          {/* <Avatar> */}
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          {/* <AvatarImage src="" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar> */}
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "websiteURL",
    header: "Brand Website",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`//${String(row.getValue("websiteURL")).replace(/(^\w+:|^)\/\//, "")}`}
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-link" />
          </Link>
          {row.getValue("websiteURL")}
        </div>
      );
    },
  },
  {
    id: "pocName",
    accessorFn: row => row.pocFirstName + " " + row.pocLastName,
    header: "POC Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <UserIcon className="h-4 w-4" />
          </div>
          {row.getValue("pocName")}
        </div>
      );
    },
  },
  {
    accessorKey: "mobileNo",
    header: "POC Contact",
  },
  {
    accessorKey: "user.email",
    header: "POC Email",
  },
  {
    accessorKey: "createdAt",
    header: "Request Date and time",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap items-center gap-1 justify-center">
          <p>{new Date(row.getValue("createdAt")).toLocaleDateString("en-US")} </p>
          <p className="text-sm text-tc-body-grey">
            @
            {new Date(row.getValue("createdAt")).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </div>
      );
    },
  },
  {
    id: "isApproved",
    accessorKey: "user.isApproved",
    header: "Actions",
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved");
      if (isApproved) {
        return (
          <div className=" flex gap-2  items-center">
            <button
              type="button"
              onClick={async () => {
                const response = await postAuthorizedRequest("user/revertAction", {
                  userId: row.original.user.id,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.id, null);
                }
              }}
            >
              <ArrowUturnLeftIcon className="h-4 w-4 " />
            </button>
            <p className="text-success">Approved</p>
          </div>
        );
      }
      if (isApproved === false) {
        return (
          <div className=" flex gap-2  items-center">
            <button
              type="button"
              onClick={async () => {
                const response = await postAuthorizedRequest("user/revertAction", {
                  userId: row.original.user.id,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.id, null);
                }
              }}
            >
              <ArrowUturnLeftIcon className="h-4 w-4 " />
            </button>
            <p className="text-destructive">Rejected</p>
          </div>
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ps-5 flex items-center cursor-pointer ">
            <button type="button">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1" align="end">
            <CustomDialog
              className="w-[400px]"
              headerTitle="Approve profile"
              headerDescription="Please note that this action will add the user to the DW platform."
              triggerElement={
                <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                  Approve
                </div>
              }
            >
              <ApproveForm
                updateData={updateData}
                updateid={row.original.id}
                name={row.getValue("name")}
                url=""
                userId={row.original.user.id}
              />
            </CustomDialog>

            <CustomDialog
              className="w-[400px]"
              headerTitle="Reject profile ?"
              headerDescription="Please note that this action is temporary and reversible in nature."
              triggerElement={
                <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                  Reject
                </div>
              }
            >
              <RejectForm
                updateData={updateData}
                updateid={row.original.id}
                name={row.getValue("name")}
                url=""
                userId={row.original.user.id}
              />
            </CustomDialog>
            <CustomDialog
              className="w-[580px]"
              headerTitle="View remarks"
              headerDescription="Please note that this action is permanent and irreversible in nature."
              triggerElement={
                <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                  View remarks
                </div>
              }
            >
              <ViewRemarks
                updateData={updateData}
                updateid={row.original.id}
                name={row.getValue("name")}
                url=""
                userId={row.original.user.id}
              />
            </CustomDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
