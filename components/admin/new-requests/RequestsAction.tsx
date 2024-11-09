import React, { useEffect, useState } from "react";
import ViewRemarks from "./TableSection/brand-table/ViewRemarks";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RejectForm from "./TableSection/brand-table/RejectForm";
import ApproveForm from "./TableSection/brand-table/ApproveForm";
import {
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { GET, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const RequestsAction = ({
  updateData,
  name,
  userId,
  profileId,
  isApproved,
}: {
  updateData: (id: string, value: boolean | null) => void;
  name: string;
  userId: string;
  profileId: string;
  isApproved: boolean | null;
}) => {
  const [allRemarks, setRemarks] = useState<any>([]);
  useEffect(() => {
    const fetchRemarks = async () => {
      const Remarks = await GET(`remarks?userId=${userId}`);
      setRemarks(Remarks.data);
    };
    fetchRemarks();
  }, [isApproved, userId]);

  const LatestRemark = () => {
    return (
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
          {allRemarks?.[0]?.message}
        </PopoverContent>
      </Popover>
    );
  };
  if (isApproved) {
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
              updateData(profileId, null);
            }
          }}
        >
          <ArrowUturnLeftIcon className="h-4 w-4 " />
        </button>
        <p className="text-success">Approved</p>
        <CustomDialog
          className="w-[538px]"
          headerTitle="View remarks"
          headerDescription=""
          triggerElement={<InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />}
        >
          <ViewRemarks userId={userId} />
        </CustomDialog>
      </div>
    );
  }
  if (isApproved === false) {
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
              updateData(profileId, null);
            }
          }}
        >
          <ArrowUturnLeftIcon className="h-4 w-4 " />
        </button>
        <p className="text-destructive">Rejected</p>
        <CustomDialog
          className="w-[538px]"
          headerTitle="View remarks"
          headerDescription=""
          triggerElement={<InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />}
        >
          <ViewRemarks userId={userId} />
        </CustomDialog>
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
            updateid={profileId}
            name={name}
            url=""
            userId={userId}
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
            updateid={profileId}
            name={name}
            url=""
            userId={userId}
          />
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
};

export default RequestsAction;
