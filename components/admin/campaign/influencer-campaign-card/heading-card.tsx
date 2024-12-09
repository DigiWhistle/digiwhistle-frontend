import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowDownTrayIcon,
  DocumentIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { BrandCampaign, Campaign, CampaignSchema } from "../schema";
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";
import CreateInvoiceModal from "@/components/invoice/CreateInvoiceModal";
import { toast } from "sonner";

const HeadingCard = ({ data }: { data: BrandCampaign }) => {
  const role = useAppSelector(UserRole);
  const doWeDiasble = data.invoiceStatus === "Generated";
  const handleClick = async () => {
    if (data.file) {
      window.open(data.file, "_blank");
    } else {
      toast.error("Invoice is yet to be created");
    }
  };
  return (
    <div>
      <div className="w-full flex gap-4 items-center  justify-between text-tc-body-grey font-medium">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <h5 className="text-heading-m-semibold text-tc-primary-default">{data.name}</h5>
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
                <p>
                  Duration: {data.startDate.toString()} - {data.endDate.toString()}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          {data.brandName && (
            <>
              <p>Brand: {data.brandName}</p>
            </>
          )}
          {data.code && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p> {data.code} (Campaign Code)</p>
            </>
          )}
          {data.commercial && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p> {data.commercial} (Commercial)</p>
            </>
          )}
          {/* {data.poc && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <UserIcon className="h-5 -mr-2" />
              <p>
                {data.poc}
                {form.getValues("pocIncentive") && `(+${form.getValues("pocIncentive")}% Incentive)`}
              </p>
            </>
          )} */}
        </div>
        <div className="flex gap-4 items-center">
          {!data.isRaiseInvoice ? (
            <></>
          ) : (
            <CustomDialog
              className="w-[970px]"
              headerTitle={!!data.isRaiseInvoice ? "Create invoice" : ""}
              headerDescription={
                !!data.isRaiseInvoice
                  ? "Please enter below details."
                  : "When the campaign is completed you can raise invoice"
              }
              triggerElement={
                <button className="text-sm border border-bc-grey px-2 py-1 rounded-full">
                  Raise Invoice
                </button>
              }
            >
              {!data.isRaiseInvoice ? (
                ""
              ) : (
                <CreateInvoiceModal mode="Create sale invoice" campaignCode={data.code} />
              )}
            </CustomDialog>
          )}

          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                {doWeDiasble ? (
                  <button onClick={handleClick}>
                    <ArrowDownTrayIcon className="w-5 h-5 text-tc-body-grey" />
                  </button>
                ) : (
                  <Link href={`/brand-report/${data.campaignId}`} target="_blank">
                    <DocumentIcon className="w-5 h-5 text-tc-body-grey" />
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent className="bg-black-201 text-white-301">
                <p>View Campaign Report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
  );
};

export default HeadingCard;
