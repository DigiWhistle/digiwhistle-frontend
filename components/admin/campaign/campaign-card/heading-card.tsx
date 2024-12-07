import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ChevronDownIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { CampaignSchema } from "../schema";
import { z } from "zod";
import CampaignPopup from "../popup/CampaignPopup";
import { TCampaignForm } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewParticipant } from "./utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { DELETE, GET, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

const HeadingCard = () => {
  const form = useFormContext<TCampaignForm>();
  const { remove, append } = useFieldArray({
    control: form.control,
    name: `participants`,
  });

  return (
    <div>
      <div className="w-full flex gap-4 items-center  justify-between text-tc-body-grey font-medium">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <h5 className="text-heading-m-semibold text-tc-primary-default">
              {form.getValues("name")}
            </h5>
            <Popover>
              <PopoverTrigger>
                <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
              </PopoverTrigger>
              <PopoverContent
                className="w-fit text-tc-primary-white bg-black-201 text-sm p-3 space-y-4"
                sideOffset={4}
                alignOffset={-50}
                align="start"
              >
                <p>Brand: {form.getValues("brandName")}</p>
                <p>Campaign Code: {form.getValues("code")}</p>
                <p>
                  Duration: {form.getValues("startDate").toString()} -{" "}
                  {form.getValues("endDate").toString()}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          {form.getValues("commercial") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>Comm. Brand: ₹ {form.getValues("commercial")}</p>
            </>
          )}
          {form.getValues("invoice") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>{form.getValues("invoice")}</p>
            </>
          )}
          {form.getValues("paymentStatus") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>{form.getValues("paymentStatus")}</p>
              <p>{form.getValues("paymentPercent") ? form.getValues("paymentPercent") : ""}</p>
            </>
          )}
          {form.getValues("incentiveWinner") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>
                {form.getValues("incentiveReleased") ? (
                  <p className="text-success">{form.getValues("incentiveWinner")}</p>
                ) : (
                  form.getValues("incentiveWinner")
                )}
                {/* {form.getValues("pocIncentive") && `(+${form.getValues("pocIncentive")}% Incentive)`} */}
              </p>
            </>
          )}
        </div>
        <div className="flex justify-end items-center gap-5">
          <Button type="submit" disabled={!form.formState.isDirty}>
            Save Changes
          </Button>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/brand-report/${form.getValues("id")}`} target="_blank">
                  <DocumentIcon className="w-5 h-5 text-tc-body-grey" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-black-201 text-white-301">
                <p>View Campaign Report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=" flex items-center cursor-pointer ">
              <button type="button">
                <EllipsisVerticalIcon className="h-5 w-5 text-black" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 px-2 mt-4" align="end">
              <CustomDialog
                className="w-[700px]"
                headerTitle="Edit campaign"
                headerDescription={`Please enter below details.`}
                triggerElement={
                  <div className="flex items-center w-full px-2 py-1.5 cursor-pointer text-sm rounded-md outline-none transition-colors hover:text-tc-ic-black-hover ">
                    Edit campaign
                  </div>
                }
              >
                <CampaignPopup mode="Edit campaign" edit_id={form.getValues("id")} />
              </CustomDialog>

              {form.getValues("incentiveReleased") ? (
                <div className="text-success flex items-center w-full px-2 py-1.5 text-sm rounded-md  ">
                  Incentive Released
                </div>
              ) : (
                <CustomDialog
                  className="w-[400px]"
                  headerTitle="Release Employee Incentive"
                  headerDescription="Please note that this action is permanent and irreversible in nature."
                  triggerElement={
                    <div className="flex items-center w-full px-2 py-1.5 cursor-pointer text-sm rounded-md outline-none transition-colors hover:text-tc-ic-black-hover ">
                      Release Employee Incentive
                    </div>
                  }
                >
                  <div className="flex w-full gap-3 pt-6 border-t-2">
                    <CancelButton />
                    <ActionButton
                      onClick={async () => {
                        const response = await POST(
                          `campaign/release/incentive?id=${form.getValues("id")}`,
                          {},
                        );
                        if (response.error) {
                          toast.error(response.error);
                        } else {
                          toast.success("Salary released successfully");
                        }
                      }}
                    >
                      Release Incentive
                    </ActionButton>
                  </div>
                </CustomDialog>
              )}
              <CustomDialog
                className="w-[400px]"
                headerTitle="Delete campaign"
                headerDescription="Please note that this action is permanent and irreversible in nature."
                triggerElement={
                  <div className="flex text-destructive rounded-md hover:text-white hover:bg-destructive items-center w-full px-2 py-1.5 cursor-pointer text-sm outline-none ">
                    Delete campaign
                  </div>
                }
              >
                <div className="flex w-full gap-3 pt-6 border-t-2">
                  <CancelButton />
                  <ActionButton
                    className="bg-destructive text-white hover:bg-destructive/90"
                    onClick={async () => {
                      const response = await DELETE(`campaign/${form.getValues("id")}`);
                      if (response.error) {
                        toast.error(response.error);
                      } else {
                        toast.success("Campaign deleted successfully");
                      }
                    }}
                  >
                    Delete Profile
                  </ActionButton>
                </div>
              </CustomDialog>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex gap-4 items-center">
            {/* <Select
            value=""
            onValueChange={(value: "influencer" | "agency") => {
              append(createNewParticipant(value));
            }}
          >
            <SelectTrigger
              className="flex gap-2 items-center bg-yellow-101 text-black-201 w-fit"
              iconClassName="w-6 h-6"
            >
              <SelectValue placeholder="Add" />
              <div className="h-10 w-px bg-white-301 ml-6"></div>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="influencer">Add influencer</SelectItem>
              <SelectItem value="agency">Add agency</SelectItem>
            </SelectContent>
          </Select> */}

            <AccordionTrigger svgCN="w-6 h-6 text-[#0F172A]"></AccordionTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
