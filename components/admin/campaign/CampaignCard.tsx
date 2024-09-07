"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/ui/form/form-text-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import FormSelectInput from "@/components/ui/form/form-select-input";

const CampaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  campaignCode: z.string().min(1, "Campaign code is required"),
  durationFrom: z.date().refine(date => date instanceof Date, {
    message: "Invalid start date",
  }),
  durationTo: z.date().refine(date => date instanceof Date, {
    message: "Invalid end date",
  }),
  commercial: z.number().min(0, "Commercial must be a positive number"),
  invoiceNo: z.string().min(1, "Invoice number is required"),
  dwPoc: z.string().min(1, "DW POC is required"),
  pocIncentive: z.number().min(0, "POC incentive must be a positive number").optional(),
});
const defaultValues = {
  name: "InCred Money",
  brand: "Paytm",
  campaignCode: "23214NFT",
  durationFrom: new Date(),
  durationTo: new Date(),
  commercial: 500000,
  invoiceNo: "DWT/2023-24/028/29",
  dwPoc: "Aman Maurya",
  pocIncentive: 10,
};
const PaymentStatusOptions = [
  {
    value: "paid",
    label: (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-4 h-4 text-success" /> All paid
      </div>
    ),
  },
  {
    value: "pending",
    label: (
      <div className="flex items-center gap-2">
        <ExclamationCircleIcon className="w-4 h-4 text-warning" /> Pending
      </div>
    ),
  },
];
const CampaignCard = () => {
  const form = useForm<z.infer<typeof CampaignSchema>>({
    resolver: zodResolver(CampaignSchema),
    defaultValues,
  });

  const handleAddCampaign = async (data: z.infer<typeof CampaignSchema>) => {};
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 mt-4 items-center w-full"
        onSubmit={form.handleSubmit(handleAddCampaign)}
      >
        <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="w-full border border-bc-grey rounded-2xl p-3 px-4"
          >
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
                      <p>Brand: {form.getValues("brand")}</p>
                      <p>Campaign Code: {form.getValues("campaignCode")}</p>
                      <p>
                        Duration: {form.getValues("durationFrom").toString()} -{" "}
                        {form.getValues("durationTo").toString()}
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-[1px] h-6 bg-bc-grey"></div>
                <p>Comm. Brand: {form.getValues("commercial")}</p>
                <div className="w-[1px] h-6 bg-bc-grey"></div>
                <p>{form.getValues("invoiceNo")}</p>
                <div className="w-[1px] h-6 bg-bc-grey"></div>
                <p>
                  {form.getValues("dwPoc")}{" "}
                  {form.getValues("pocIncentive") &&
                    `(+${form.getValues("pocIncentive")}% Incentive)`}
                </p>
              </div>
              <AccordionTrigger svgCN="w-6 h-6 text-[#0F172A]"></AccordionTrigger>
            </div>

            <AccordionContent>
              <div>
                <div className="flex gap-2">
                  <FormTextInput
                    formName="name"
                    label="Agency Name"
                    placeholder="Enter name"
                    className="w-fit"
                    inputCN="h-8"
                  />
                  <div className="flex gap-1">
                    <FormTextInput
                      formName="brand"
                      label="Brand"
                      placeholder="Enter brand"
                      required
                      inputCN="h-8"
                    />
                    <FormTextInput
                      formName="campaignCode"
                      label="Campaign Code"
                      placeholder="Enter campaign code"
                      required
                      inputCN="h-8"
                    />
                    <FormTextInput
                      formName="campaignCode"
                      label="Campaign Code"
                      placeholder="Enter campaign code"
                      required
                      inputCN="h-8"
                    />
                    <FormTextInput
                      formName="campaignCode"
                      label="Campaign Code"
                      placeholder="Enter campaign code"
                      required
                      inputCN="h-8"
                    />
                  </div>
                  <div>
                    <FormSelectInput
                      formName="paymentStatus"
                      label="Payment Status"
                      placeholder="Payment Status"
                      selectItems={PaymentStatusOptions}
                      defaultValue="pending"
                      triggerCN="h-9"
                      className="mt-1/2"
                    />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};

export default CampaignCard;
