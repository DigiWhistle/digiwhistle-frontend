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
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DELETE, GET, PATCH, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import {
  HideFrom,
  Influencer,
  InfluencerPlatforms,
  InstagramProfileStats,
} from "@/types/admin/influencer";
import ApproveForm from "../brand-table/ApproveForm";
import RejectForm from "../brand-table/RejectForm";
import ViewRemarks from "../brand-table/ViewRemarks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import RequestsAction from "../../RequestsAction";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import PauseForm from "./PauseForm";
import EditInfluencer from "@/components/admin/layout/EditInfluencer";
import { Button } from "@/components/ui/button";
import SendAgreement from "../../SendAgreement";

export const createColumns = (
  updateData: (id: string, value: boolean | null) => void,
  handleSortEr: (setSortEr: boolean) => void,
  platform: InfluencerPlatforms,
  isMainTable: boolean = false,
  patchDataById: (id: string, data: Partial<Influencer>) => void,
  deleteInfluencer: (id: string) => void,
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
                <AvatarFallback>
                  <UserIcon className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{row.getValue("name")}</p>
                <p className="text-sm text-tc-body-grey">
                  {!row.original.profileUrl.includes("youtube") && "@"}
                  {row.original.profileUrl.split("/").pop()}
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
  ];

  if (platform === InfluencerPlatforms.INSTAGRAM) {
    const addColumns = [
      {
        accessorKey: "followers",
        header: "Followers",
      },
      {
        accessorKey: "ages",
        header: "Age Groups",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const ages = row.original.ages;
          return (
            <div className="flex flex-col gap-1.5">
              {ages.map((age, index) => (
                <div key={index} className="flex gap-1 items-center  w-max">
                  <span className="text-tc-body-grey font-semibold">{age.label}:</span>
                  <span className="text-tc-body-grey w-max">{age.value?.toFixed(2)} %</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "reach",
        header: "Average Reach",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const reach = row.original.reach;
          return (
            <div className="flex flex-col gap-1.5">
              {reach.map((age, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <span className="text-tc-body-grey font-semibold w-max">{age.label}:</span>
                  <span className="text-tc-body-grey w-max">{age.value?.toFixed(2)} %</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "cities",
        header: "Cities",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const cities = row.original.cities;
          return (
            <div className="flex flex-col gap-1.5">
              {cities.map((age, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <span className="text-tc-body-grey font-semibold">{age.label}:</span>
                  <span className="text-tc-body-grey w-max">{age.value?.toFixed(2)} %</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "countries",
        header: "Countries",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const countries = row.original.countries;
          return (
            <div className="flex flex-col gap-1.5">
              {countries.map((age, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <span className="text-tc-body-grey font-semibold w-max">{age.label}:</span>
                  <span className="text-tc-body-grey w-max">{age.value?.toFixed(2)} %</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "genders",
        header: "Genders",
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const genders = row.original.genders;
          return (
            <div className="flex flex-col gap-1.5">
              {genders.map((age, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <span className="text-tc-body-grey font-semibold">{age.label}:</span>
                  <span className="text-tc-body-grey w-max">{age.value?.toFixed(2)} %</span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "engagementRate",
        header: () => (
          <div className="flex gap-1 ">
            ER (%){" "}
            <button onClick={() => handleSortEr(true)}>
              <ChevronUpDownIcon className="w-6 h-6" />
            </button>
          </div>
        ),
        cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
          const label = row.original.engagementRate?.label;
          return (
            <div className="flex gap-3">
              {!Number.isInteger(row.original.engagementRate?.value)
                ? row.original.engagementRate?.value.toFixed(2)
                : row.original.engagementRate?.value}
              %
              <div
                className={cn(
                  label === "High"
                    ? "bg-[#D2FFD1]"
                    : label === "Moderate"
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
        header: "Avg Likes",
      },
      {
        accessorKey: "views",
        header: "Avg Views",
      },
      {
        accessorKey: "comments",
        header: "Avg Comments",
      },
      // {
      //   accessorKey: "percentageFakeFollowers",
      //   header: "Fake Followers (%)",
      //   cell: ({ row }: { row: Row<Influencer & InstagramProfileStats> }) => {
      //     return `${
      //       !Number.isInteger(row.original.percentageFakeFollowers)
      //         ? row.original?.percentageFakeFollowers?.toFixed(2)
      //         : row.original?.percentageFakeFollowers
      //     } %`;
      //   },
      // },
    ];

    // @ts-ignore
    columns.splice(1, 0, ...addColumns);
  } else if (platform === InfluencerPlatforms.YOUTUBE) {
    const addColumns = [
      {
        accessorKey: "views",
        header: "Avg Views",
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
  } else if (platform === InfluencerPlatforms.LINKEDIN) {
    const addColumns = [
      {
        accessorKey: "followers",
        header: "Followers",
      },
      {
        accessorKey: "likes",
        header: "Likes",
      },
      {
        accessorKey: "shares",
        header: "Shares",
      },
      {
        accessorKey: "comments",
        header: "Comments",
      },
      {
        accessorKey: "reactions",
        header: "Reactions",
      },
    ];
    // @ts-ignore
    columns.splice(1, 0, ...addColumns);
  }

  if (isMainTable) {
    const addColumns = [
      {
        accessorKey: "commercial",
        header: "Commercial",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "rating",
        header: "Rating",
      },
      {
        accessorKey: "exclusive",
        header: "Exclusive",
        cell: ({ row }: { row: Row<Influencer> }) => {
          const exclusive = row.getValue("exclusive") as boolean;
          return (
            <div>
              <Switch
                id="exclusive"
                checked={exclusive}
                onCheckedChange={async value => {
                  const response = await PATCH(`influencer/profile/${row.original.profileId}`, {
                    exclusive: value,
                  });
                  if (response.error) {
                    toast.error(response.error);
                    return;
                  }
                  patchDataById(row.original?.profileId, { exclusive: value });
                }}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "hideFrom",
        header: "Hide Profile From",
        cell: ({ row }: { row: Row<Influencer> }) => {
          const hideFrom = row.getValue("hideFrom") as string;

          const hidePlatforms = [
            { value: "brand", label: "Brand" },
            { value: "agency", label: "Agency" },
            { value: null, label: "None" },
          ];
          return (
            <Select
              value={hideFrom}
              onValueChange={async value => {
                const response = await PATCH(`influencer/profile/${row.original.profileId}`, {
                  hideFrom: value,
                });
                if (response.error) {
                  toast.error(response.error);
                  return;
                }
                patchDataById(row.original?.profileId, { hideFrom: value as HideFrom });
              }}
            >
              <SelectTrigger className="flex gap-1 min-w-32 px-4">
                <SelectValue placeholder="Choose Platform" />
              </SelectTrigger>
              <SelectContent>
                {hidePlatforms.map(platform => (
                  <SelectItem key={platform.value} value={platform.value as string}>
                    {platform.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: "isPaused",
        header: "Actions",
        cell: ({ row }: { row: Row<Influencer> }) => {
          const isPaused = row.getValue("isPaused") as boolean;
          const profileId = row.original?.profileId;
          const userId = row.original?.userId;
          const name = row.getValue("name") as string;

          const LatestRemark = () => {
            const [allRemarks, setRemarks] = useState<any>([]);
            useEffect(() => {
              const fetchRemarks = async () => {
                const Remarks = await GET(`remarks?userId=${userId}`);
                setRemarks(Remarks.data);
              };
              fetchRemarks();
            }, []);
            return (
              <Popover>
                <PopoverTrigger>
                  <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
                </PopoverTrigger>
                <PopoverContent
                  className="max-w-64 w-fit text-tc-primary-white bg-black-201 text-sm p-3"
                  sideOffset={4}
                  alignOffset={-50}
                  align="start"
                >
                  {allRemarks?.[0]?.message}
                </PopoverContent>
              </Popover>
            );
          };
          if (isPaused) {
            return (
              <div className=" flex gap-2  items-center">
                <button
                  type="button"
                  onClick={async () => {
                    const response = await POST("user/revert", {
                      userId: userId,
                    });
                    if (response.error) {
                      toast.error(response.error);
                    } else {
                      patchDataById(profileId, { isPaused: false });
                    }
                  }}
                >
                  <ArrowUturnLeftIcon className="h-4 w-4 " />
                </button>
                <p className="text-warning">Paused</p>
                <LatestRemark />
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
                  className="w-[700px]"
                  headerTitle="Edit profile"
                  headerDescription={`of influencer: ${name} (${String(row.original.profileUrl).replace(/(^\w+:|^)\/\//, "")}) `}
                  triggerElement={
                    <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                      Edit Profile
                    </div>
                  }
                >
                  <EditInfluencer influencer={row.original} />
                </CustomDialog>
                <CustomDialog
                  className="w-[400px]"
                  headerTitle="Pause profile"
                  headerDescription="Please note that this action is temporary and reversible in nature."
                  triggerElement={
                    <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                      Pause Profile
                    </div>
                  }
                >
                  <PauseForm
                    patchDataById={patchDataById}
                    updateid={profileId}
                    name={name}
                    url=""
                    userId={userId}
                  />
                </CustomDialog>
                <CustomDialog
                  className="w-[400px]"
                  headerTitle="Delete query"
                  headerDescription="Please note that this action is permanent and irreversible in nature."
                  triggerElement={
                    <div className="flex text-destructive rounded-sm hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                      Delete Profile
                    </div>
                  }
                >
                  <div className="flex w-full gap-3 pt-6 border-t-2">
                    <CancelButton />
                    <ActionButton
                      className="bg-destructive text-white hover:bg-destructive/90"
                      onClick={async () => {
                        const response = await DELETE(`user?userId=${profileId}`);
                        if (response.error) {
                          toast.error(response.error);
                        } else {
                          deleteInfluencer(profileId);
                          toast.success("User deleted successfully");
                        }
                      }}
                    >
                      Delete Profile
                    </ActionButton>
                  </div>
                </CustomDialog>
                <CustomDialog
                  className="w-[538px]"
                  headerTitle="View remarks"
                  headerDescription=""
                  triggerElement={
                    <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                      View remarks
                    </div>
                  }
                >
                  <ViewRemarks userId={userId} />
                </CustomDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];

    // @ts-ignore
    columns.push(...addColumns);
  } else {
    const addColumns = [
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
        id: "isAgreementSent",
        accessorKey: "isAgreementSent",
        header: "Agreement",
        cell: ({ row }: { row: Row<Influencer> }) => {
          const isAgreementSent = row.getValue("isAgreementSent") as boolean;
          const userId = row.original?.userId;

          return <SendAgreement isAgreementSent={isAgreementSent} userId={userId} />;
        },
      },
      {
        id: "isApproved",
        accessorKey: "isApproved",
        header: "Status",
        cell: ({ row }: { row: Row<Influencer> }) => {
          const isApproved = row.getValue("isApproved") as boolean | null;
          const name = row.getValue("name") as string;
          const userId = row.original?.userId;
          const profileId = row.original?.profileId;

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

    // @ts-ignore
    columns.push(...addColumns);
  }
  return columns;
};
