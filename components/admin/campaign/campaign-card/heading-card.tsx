import { AccordionTrigger } from "@/components/ui/accordion";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CampaignSchema } from "../schema";
import { z } from "zod";
import { TCampaignForm } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewParticipant } from "./utils";

const HeadingCard = () => {
  const form = useFormContext<TCampaignForm>();

  const { remove, append } = useFieldArray({
    control: form.control,
    name: `participants`,
  });

  return (
    <div>
      <div className="w-full flex gap-4 items-center justify-between text-tc-body-grey font-medium">
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
              <p>Comm. Brand: {form.getValues("commercial")}</p>
            </>
          )}
          {form.getValues("invoice") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>{form.getValues("invoice")}</p>
            </>
          )}
          {form.getValues("incentiveWinner") && (
            <>
              <div className="w-[1px] h-6 bg-bc-grey"></div>
              <p>
                {form.getValues("incentiveWinner")}
                {/* {form.getValues("pocIncentive") && `(+${form.getValues("pocIncentive")}% Incentive)`} */}
              </p>
            </>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <Select
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
          </Select>
          <AccordionTrigger svgCN="w-6 h-6 text-[#0F172A]"></AccordionTrigger>
        </div>
      </div>
    </div>
  );
};

export default HeadingCard;
