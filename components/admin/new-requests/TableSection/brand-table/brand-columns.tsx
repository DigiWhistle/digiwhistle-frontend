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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";

export type Brand = {
  id: string;
  name: string;
  pocFirstName: string;
  pocLastName: string;
  mobileNo: string;
  websiteURL: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
    isApproved: boolean | null;
    isPaused: boolean;
  };
};

export const createColumns = (
  updateData: (id: string, value: boolean | null) => void,
): ColumnDef<Brand>[] => [
  {
    accessorKey: "name",
    header: () => <div className="">Brand Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarImage src="" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                const response = await postAuthorizedRequest("user/approve", {
                  userId: row.original.user.id,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.id, true);
                }
              }}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-white focus:bg-destructive"
              onClick={async () => {
                const response = await postAuthorizedRequest("user/reject", {
                  userId: row.original.user.id,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.id, false);
                }
              }}
            >
              Reject
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const response = await postAuthorizedRequest("user/approve", {
                  userId: row.original.user.id,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.id, true);
                }
              }}
            >
              View Remarks
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
