"use client";

import type { ColumnDef } from "@tanstack/react-table";

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

export type Brand = {
  id: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  user: {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    isRejected: boolean;
  };
};

export const columns: ColumnDef<Brand>[] = [
  {
    id: "brandName",
    accessorKey: "user.username",
    header: () => <div className="">Brand Name</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarImage src="" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          {row.getValue("firstName")}
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "Brand Website",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Link href={row.getValue("firstName")} target="_blank">
            <ArrowTopRightOnSquareIcon className="h-4 w-4 text-link" />
          </Link>
          {row.getValue("firstName")}
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "POC Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          {row.getValue("firstName")}
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
    id: "isRejected",
    accessorKey: "user.isRejected",
    header: "Actions",
    cell: ({ row }) => {
      const isRejected = row.getValue("isRejected");
      if (isRejected) {
        return (
          <div className=" flex gap-2  items-center">
            <button type="button">
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
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Approve</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-white focus:bg-destructive">
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
