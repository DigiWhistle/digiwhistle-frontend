"use client";

import type { ColumnDef, Row, TableMeta } from "@tanstack/react-table";
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
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";
import { Influencer, InfluencerPlatforms, InstagramProfileStats } from "@/types/admin/influencer";
import ApproveForm from "../brand-table/ApproveForm";
import RejectForm from "../brand-table/RejectForm";
import ViewRemarks from "../brand-table/ViewRemarks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const createColumns = (
  updateData: (id: string, value: boolean | null) => void,
  platform: InfluencerPlatforms,
): ColumnDef<Influencer>[] => {
  const columns = [
    {
      accessorKey: "name",
      header: () => <div className="">Influencer Name</div>,
      cell: ({ row }: { row: Row<Influencer> }) => {
        return (
          <div className="flex items-center justify-between gap-3 h-8">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={row.original.profileUrl} />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div>
                <p>{row.getValue("name")}</p>
                <p className="text-sm text-tc-body-grey">
                  @{row.original.profileUrl.split("/").pop()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Popover>
                <PopoverTrigger>
                  <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
                </PopoverTrigger>
                <PopoverContent
                  className="w-fit text-tc-primary-white bg-black-201 text-sm p-3"
                  sideOffset={4}
                  alignOffset={-50}
                  align="start"
                >
                  {row.original.email} | {row.original.mobileNo}
                </PopoverContent>
              </Popover>
              <div>
                <Link
                  href={`//${String(row.original.profileUrl).replace(/(^\w+:|^)\/\//, "")}`}
                  target="_blank"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 -mt-0.5 text-link" />
                </Link>
              </div>
            </div>
          </div>
        );
      },
    },

    {
      accessorKey: "requestDate",
      header: "Request Date and time",
      cell: ({ row }: { row: Row<Influencer> }) => {
        return (
          <div className="flex flex-wrap items-center gap-1 justify-center">
            <p>{new Date(row.getValue("requestDate")).toLocaleDateString("en-US")} </p>
            <p className="text-sm text-tc-body-grey">
              @
              {new Date(row.getValue("requestDate")).toLocaleTimeString("en-US", {
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
      cell: ({ row }: { row: Row<Influencer> }) => {
        const isApproved = row.getValue("isApproved");
        if (isApproved) {
          return (
            <div className=" flex gap-2  items-center">
              <button
                type="button"
                onClick={async () => {
                  const response = await postAuthorizedRequest("user/revertAction", {
                    userId: row.original?.userId,
                  });
                  if (response.error) {
                    toast.error(response.error);
                  } else {
                    updateData(row.original?.id, null);
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
                    userId: row.original?.userId,
                  });
                  if (response.error) {
                    toast.error(response.error);
                  } else {
                    updateData(row.original?.id, null);
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
                  userId={row.original.userId}
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
                  userId={row.original.userId}
                />
              </CustomDialog>
              <CustomDialog
                className="w-[538px]"
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
                  userId={row.original.userId}
                />
              </CustomDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (platform === InfluencerPlatforms.INSTAGRAM) {
    const addColumns = [
      {
        accessorKey: "followers",
        header: "Follower Count",
      },
      {
        accessorKey: "engagementRate",
        header: "Engagement Rate (%)",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const label = row.original.engagementRate?.label;
          return (
            <div className="flex items-center justify-center gap-3">
              {row.original.engagementRate?.value}%
              <div
                className={cn(
                  label === "High"
                    ? "bg-[#D2FFD1]"
                    : label === "Medium"
                      ? "bg-yellow-561"
                      : "bg-error",
                  "text-body-xs-light px-2 py-1 rounded-full ",
                )}
              >
                {label}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "likes",
        header: "Average Likes",
      },
      {
        accessorKey: "views",
        header: "Average Views",
      },
      {
        accessorKey: "comments",
        header: "Average Comments",
      },
      {
        accessorKey: "percentageFakeFollowers",
        header: "Fake Followers (%)",
      },
    ];

    // @ts-ignore
    columns.splice(1, 0, ...addColumns);
  } else if (platform === InfluencerPlatforms.YOUTUBE) {
    const addColumns = [
      {
        accessorKey: "views",
        header: "Average Views",
      },
      {
        accessorKey: "videos",
        header: "Videos",
      },
      {
        accessorKey: "subscribers",
        header: "Subscribers",
      },
    ];

    // @ts-ignore
    columns.splice(1, 0, ...addColumns);
  } else if (platform === InfluencerPlatforms.X) {
    const addColumns = [
      {
        accessorKey: "followers",
        header: "Followers",
      },
      {
        accessorKey: "tweets",
        header: "Tweets",
      },
      {
        accessorKey: "replyCount",
        header: "Replies",
      },
      {
        accessorKey: "retweets",
        header: "Retweets",
      },
    ];
    // @ts-ignore
    columns.splice(1, 0, ...addColumns);
  }
  return columns;
};
