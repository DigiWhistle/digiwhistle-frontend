import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DocumentIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { BrandCampaign, Campaign, CampaignSchema } from "../schema";
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import CreateInvoiceModal from "@/components/invoice/CreateInvoiceModal";
import CustomDialog from "@/components/ui/customAlertDialog/CustomDialog";

const HeadingCard = ({ data }: { data: BrandCampaign }) => {
  const doWeDiasble = data.invoiceStatus === "Generated";

  const role = useAppSelector(UserRole);
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
                <p>Brand: {data.brandName}</p>
                <p>Campaign Code: {data.code}</p>
                <p>
                  Duration: {data.startDate.toString()} - {data.endDate.toString()}
                </p>
              </PopoverContent>
            </Popover>
          </div>
          {role === "brand" ? (
            data.capital && (
              <>
                <div className="w-[1px] h-6 bg-bc-grey"></div>
                <p>Capital: ₹ {data.capital}</p>
              </>
            )
          ) : (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              {/* @ts-ignore */}
              <p>Revenue: ₹ {data.commercial}</p>
            </>
          )}
          {data.status && (
            <>
              <div className="w-px h-6 bg-bc-grey"></div>
              <p className="flex gap-1 items-center">
                Payment:{" "}
                {data.status === "Pending" ? (
                  <ExclamationCircleIcon className="w-[18px] h-[18px] text-warning" />
                ) : (
                  <CheckCircleIcon className="w-[18px] h-[18px] text-success" />
                )}{" "}
                {data.status}
              </p>
            </>
          )}
          {data.poc && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <UserIcon className="h-5 -mr-2" />
              <p>
                {data.poc}
                {/* {form.getValues("pocIncentive") && `(+${form.getValues("pocIncentive")}% Incentive)`} */}
              </p>
            </>
          )}
        </div>
        <div className="flex gap-4 items-center">
          {role === "agency" && !!data.isRaiseInvoice && (
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
                <Link href={`/brand-report/${data.id}`} target="_blank">
                  <DocumentIcon className="w-5 h-5 text-tc-body-grey" />
                </Link>
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
