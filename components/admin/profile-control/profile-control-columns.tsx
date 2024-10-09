"use client";

import type { ColumnDef, TableMeta } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { DELETE, GET, PATCH, POST } from "@/lib/config/axios";
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
import { useRouter } from "next/navigation";
import { deleteProfileByID } from "@/store/admin/profile-control/ProfileControlSlice";
import { useAppDispatch } from "@/lib/config/store";
import PauseForm from "../new-requests/TableSection/influencer-table/PauseForm";
import { useEffect, useState } from "react";
import EditAddMemberForm from "./EditAddMemberForm";
export const createColumns = (
  deleteProfileByID: (id: string) => void,
  setIsPaused: (userId: string, data: { isPaused: boolean }) => void,
  role?: string,
): ColumnDef<ProfileControl>[] => [
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
            {row.getValue("firstName")} {` ${row.original.lastName}`}
            <p className="text-xs text-tc-body-grey">{` ${row.original.role}`}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => {
      const designation = row.getValue("designation") as string;

      const selectItems = [
        { value: "Talent Manager", label: "Talent Manager" },
        { value: "Account Manager", label: "Account Manager" },
        { value: "PR Manager", label: "PR Manager" },
        { value: "Brand Manager", label: "Brand Manager" },
      ];

      if (row.getValue("designation") === "admin") {
        return "admin";
      }
      return (
        <Select
          disabled={role === "employee"}
          value={designation}
          onValueChange={async value => {
            const response = await PATCH(`employee/profile/${row.original.profileId}`, {
              designation: value,
            });
            if (response.error) {
              toast.error(response.error);
              return;
            } else {
              toast.success("Changed Designation Successfully");
              window.location.reload();
            }
            // patchDataById(row.original?.profileId, { hideFrom: value as HideFrom });
          }}
        >
          <SelectTrigger className="flex gap-1 w-52 px-4 bg-sb-gray-554">
            <SelectValue placeholder="Choose Platform" />
          </SelectTrigger>
          <SelectContent>
            {selectItems.map(item => (
              <SelectItem key={item.value} value={item.value as string}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
    accessorKey: "isPaused",
    header: "Actions",
    cell: ({ row }) => {
      const isPaused = row.getValue("isPaused") as boolean;
      const userId = row.original?.userId;
      const name = row.original.firstName as string;
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
          <div className=" flex w-full gap-2 pl-4 items-center">
            <button
              type="button"
              onClick={async () => {
                const response = await POST("user/revert", {
                  userId: userId,
                });
                if (response.error) {
                  toast.error(response.error);
                } else {
                  toast.success("Reverted Successfully");
                  setIsPaused(userId, { isPaused: false });
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
        <>
          {row.original.role != "admin" ? (
            <div className="flex w-full items-center pl-3 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ps-5 flex items-center cursor-pointer ">
                  <button type="button">
                    <EllipsisVerticalIcon className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <CustomDialog
                    className="w-[700px]"
                    headerTitle="Edit profile"
                    triggerElement={
                      <div className="flex rounded-sm items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none transition-colors hover:text-tc-ic-black-hover ">
                        Edit Profile
                      </div>
                    }
                  >
                    <EditAddMemberForm EditData={row.original} />
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
                      patchDataById={setIsPaused}
                      updateid={userId}
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
                        Delete User
                      </div>
                    }
                  >
                    <div className="flex w-full gap-3 pt-6 border-t-2">
                      <CancelButton />
                      <ActionButton
                        className="bg-red-600 text-white"
                        onClick={async () => {
                          const response = await DELETE(`user/?userId=${row.original.userId}`);
                          if (response.error) {
                            toast.error(response.error);
                          } else {
                            toast.success("User deleted successfully");

                            deleteProfileByID(row.original.userId);
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
                    <ViewRemarks userId={row.original.userId} />
                  </CustomDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex w-full items-center pl-5">--/--</div>
          )}
        </>
      );
    },
  },
];
