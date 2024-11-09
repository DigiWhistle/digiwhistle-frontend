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
import { POST } from "@/lib/config/axios";
import { toast } from "sonner";
import ApproveForm from "./ApproveForm";
import RejectForm from "./RejectForm";
import ViewRemarks from "./ViewRemarks";
import { Brand } from "@/types/admin/new-requests";
import RequestsAction from "../../RequestsAction";

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
    header: "Status",
    cell: ({ row }) => {
      const isApproved = row.getValue("isApproved") as boolean | null;
      const name = row.getValue("name") as string;
      const userId = row.original?.user?.id;
      const profileId = row.original?.id;

      return (
        <RequestsAction
          updateData={updateData}
          isApproved={isApproved}
          name={name}
          userId={userId}
          profileId={profileId}
        />
      );
    },
  },
];
