"use client";

import type { ColumnDef, TableMeta } from "@tanstack/react-table";

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
import { deleteAuthorizedRequest, postAuthorizedRequest } from "@/lib/config/axios";
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
import { Button } from "@/components/ui/button";
import { ProfileControl } from "@/types/admin/ProfileControl";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import ViewRemarks from "../new-requests/TableSection/brand-table/ViewRemarks";
export const createColumns = (): ColumnDef<ProfileControl>[] => [
  {
    accessorKey: "firstName",
    header: () => <div className="">Member name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <UserIcon className="h-4 w-4" />
          </div>

          <div>
            {row.getValue("firstName")}
            <p className="text-xs text-tc-body-grey">{` ${row.original.lastName}`}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "email",
    header: "Email ID",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile Number",
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
  {
    accessorKey: "email",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ps-5 flex items-center cursor-pointer ">
            <button type="button">
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <CustomDialog
              className="w-[600px]"
              headerTitle="View Query"
              triggerElement={
                <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                  View query
                </div>
              }
            >
              <div className=" overflow-hidden relative mt-3">
                <p className="text-sm mb-2">User&apos;s Query Message</p>
                <div className="h-36 rounded-lg text-sm text-tc-body-grey border bg-gray-554 px-3 py-2 overflow-auto">
                  <p className="overflow-auto">{"hello"}</p>
                </div>
              </div>
              <hr className="my-3 text-tc-body-grey" />
              <Button
                size={"sm"}
                className="w-min place-self-center px-4 focus:ring-offset-0"
                onClick={async () => {
                  const response = await postAuthorizedRequest("contactUs/view", {
                    id: row.original.id,
                  });
                  if (response.error) {
                    toast.error(response.error);
                  } else {
                    // updateData(row.original.id, true);
                  }
                }}
              >
                Mark as read
              </Button>
            </CustomDialog>
            <CustomDialog
              className="w-[400px]"
              headerTitle="Delete query"
              headerDescription="Please note that this action is permanent and irreversible in nature."
              triggerElement={
                <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                  Delete User
                </div>
              }
            >
              <div className="flex w-full gap-3 pt-6 border-t-2">
                <CancelButton />
                <ActionButton
                  className="bg-red-600 text-white"
                  onClick={async () => {
                    console.log(row.original.id, "  ", row.original.userId);
                    const response = await deleteAuthorizedRequest(
                      `user/?userId=${row.original.id}`,
                    );
                    if (response.error) {
                      toast.error(response.error);
                    } else {
                      // deleteQuery(row.original.id);
                      toast.success("Query deleted successfully");
                    }
                  }}
                >
                  Delete
                </ActionButton>
              </div>
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
                // updateData={updateData}
                updateid={row.original.id}
                name={row.getValue("firstName")}
                url=""
                userId={row.original.userId}
              />
            </CustomDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
