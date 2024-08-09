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

export enum PersonType {
  INFLUENCER = "Influencer",
  BRAND = "Brand",
}
export type Query = {
  id: number;
  name: string;
  email: string;
  followersCount?: string | null;
  profileLink?: string | null;
  mobileNo?: string | null;
  message?: string | null;
  personType: PersonType;
  viewed: boolean;
};

export const createColumns = (
  updateData: (id: string, value: boolean | null) => void,
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
              <p className="text-sm text-tc-body-grey">
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
            <DropdownMenuItem
              onClick={async () => {
                const response = await postAuthorizedRequest("user/approve", {
                  userId: row.original.email,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.email, true);
                }
              }}
            >
              View query
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-white focus:bg-destructive"
              onClick={async () => {
                const response = await postAuthorizedRequest("contactUs", {
                  userId: row.original.email,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  updateData(row.original.email, false);
                }
              }}
            >
              Delete query
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
