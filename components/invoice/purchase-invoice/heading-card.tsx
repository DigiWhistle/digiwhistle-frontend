import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  ArrowDownTrayIcon,
  DocumentIcon,
  EllipsisVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/config/store";
import { UserRole } from "@/store/UserSlice";
import CurrencyValueDisplay from "@/components/ui/currency-value-display";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const HeadingCard = ({ data }: { data: any }) => {
  const role = useAppSelector(UserRole);
  return (
    <div>
      <div className="w-full flex gap-4 items-center  justify-between text-tc-body-grey font-medium">
        <div className="flex items-center gap-4">
          <div className="flex gap-1 items-center">
            <h5 className="text-heading-m-semibold text-tc-primary-default">{data.invoiceNo}</h5>
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
                <p>Invoice date: {data.invoiceDate}</p>
              </PopoverContent>
            </Popover>
          </div>
          {data.totalAmount && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>

              <CurrencyValueDisplay value={data.amount} />
            </>
          )}
          {data.invoiceDate && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p>{data.invoiceDate} (Invoice Date)</p>
            </>
          )}

          {data.brand && (
            <div className="flex gap-1 items-center">
              <div className="flex w-0.5  h-6 bg-bc-grey mr-2"></div>
              <div className="">{data.brand} (Brand)</div>
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
                  <p>Campaign Code: {data.campaignCode}</p>
                  <p>Duration: {data.campaignDuration}</p>
                </PopoverContent>
              </Popover>
            </div>
          )}
          {(role === "admin" || role === "employee") && data.participantName && (
            <div className="flex gap-1 items-center">
              <div className="flex w-0.5  h-6 bg-bc-grey mr-2"></div>
              <div className="">{data.participantName}</div>
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
                  <p>Pan card: {data.panNo}</p>
                </PopoverContent>
              </Popover>
            </div>
          )}
          {data.code && (
            <>
              <div className="flex w-0.5  h-6 bg-bc-grey"></div>
              <p> {data.code} (Campaign Code)</p>
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
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  {role === "admin" || role === "employee" ? (
                    <ArrowDownTrayIcon className="w-5 h-5 text-tc-body-grey" />
                  ) : (
                    <DocumentIcon className="w-5 h-5 text-tc-body-grey" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-black-201 text-white-301">
                <p>{role === "admin" || role === "employee" ? "Download" : "View"} Invoice</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* TODO: TADVI WORK HERE --> Implement for purchase invoice for influencer, agency, admin & account */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=" flex items-center cursor-pointer ">
              <button type="button">
                <EllipsisVerticalIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1" align="end">
              {/* TODO: TADVI WORK HERE*/}
            </DropdownMenuContent>
          </DropdownMenu>
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
