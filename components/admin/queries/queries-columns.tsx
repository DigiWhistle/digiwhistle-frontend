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
import { DELETE, POST } from "@/lib/config/axios";
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
import { Query } from "@/types/admin/queries";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
export const createColumns = (
  updateData: (id: string, value: boolean) => void,
  deleteQuery: (id: string) => void,
): ColumnDef<Query>[] => [
  {
    accessorKey: "name",
    header: () => <div className="">User Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div>
            <UserIcon className="h-4 w-4" />
          </div>
          {row.original.personType === "Influencer" ? (
            <div>
              {row.getValue("name")}
              <p className="text-xs text-tc-body-grey">
                {` ${row.original.followersCount} followers`}
              </p>
            </div>
          ) : (
            <div>{row.getValue("name")}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "personType",
    header: "User Type",
  },
  {
    accessorKey: "profileLink",
    header: "Link",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link
            href={`//${String(row.getValue("profileLink")).replace(/(^\w+:|^)\/\//, "")}`}
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-link" />
          </Link>
          {row.getValue("profileLink")}
        </div>
      );
    },
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
                  <p className="overflow-auto">{row.original.message}</p>
                </div>
              </div>
              <hr className="my-3 text-tc-body-grey" />
              <Button
                size={"sm"}
                className="w-min place-self-center px-4 focus:ring-offset-0"
                disabled={row.original.viewed}
                onClick={async () => {
                  const response = await POST("contactUs/view", {
                    id: row.original.id,
                  });
                  if (response.error) {
                    toast.error(response.error);
                  } else {
                    updateData(row.original.id, true);
                  }
                }}
              >
                {row.original.viewed ? "Read already" : " Mark as read"}
              </Button>
            </CustomDialog>
            <CustomDialog
              className="w-[400px]"
              headerTitle="Delete query"
              headerDescription="Please note that this action is permanent and irreversible in nature."
              triggerElement={
                <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                  Delete query
                </div>
              }
            >
              <div className="flex w-full gap-3 pt-6 border-t-2">
                <CancelButton />
                <ActionButton
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={async () => {
                    const response = await DELETE(`contactUs/${row.original.id}`);
                    if (response.error) {
                      toast.error(response.error);
                    } else {
                      deleteQuery(row.original.id);
                      toast.success("Query deleted successfully");
                    }
                  }}
                >
                  Delete
                </ActionButton>
              </div>
            </CustomDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
