"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import {} from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import { UserIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { DateRangePicker } from "@/components/ui/form/Date-Range-Picker";
import { POST } from "@/lib/config/axios";
import { toast } from "sonner";

import { SearchSelect } from "@/components/ui/form/SearchSelect";
import { SearchSelectCopy } from "@/components/ui/form/SearchSelectcopy";
import { useState } from "react";
const Options = [
  "English",
  "Punjabi",
  "Chinese",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
  "English",
];

const CampaignSchema = z.object({
  campaignName: z.string().optional(),
  campaignCode: z.string().optional(),
  brand: z.string().optional(),
  campaignDuration: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine(data => data.from && data.to, {
      message: "Both start and end dates are required",
    }),
  campaignEmail: z.string(),
});
const CampaignPopup = () => {
  const [allEmails, setEmails] = useState<any>([]);
  const form = useForm<z.infer<typeof CampaignSchema>>({
    resolver: zodResolver(CampaignSchema),
  });
  const setterfunction = (formname: any, value: string) => {
    if (formname === "campaignEmail") {
      const emailExists = allEmails.some((email: any) => email === value);

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setEmails([...allEmails, value]);
      }
    } else {
      form.setValue(formname, value);
    }
  };
  const handleForm = async (data: z.infer<typeof CampaignSchema>, e: any) => {
    console.log("data", data);
  };
  const handleDeleteEmail = (item: string) => {
    setEmails((prevEmails: any) => prevEmails.filter((email: string) => email !== item));
  };
  return (
    <div>
      <Form {...form}>
        <form action={""}>
          <div className="flex gap-5">
            <FormTextInput formName="campaignName" placeholder="" label="Campaign name" />
            <FormTextInput formName="campaignCode" placeholder="" label="Campaign code" />
            <SearchSelect
              Options={Options}
              formName="brand"
              searchPlaceholder="Search Brand"
              placeholder="Select Brand"
              label="Brand"
              setterfunction={setterfunction}
              leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
            />
          </div>
          <DateRangePicker
            formName="campaignDuration"
            placeholder=""
            label="Campaign duration"
            setterfunction={setterfunction}
          />
          <SearchSelect
            popoverclassname="w-[500px]"
            Options={Options}
            formName="campaignEmail"
            searchPlaceholder="Search Email"
            placeholder="Select Email"
            label="Add influencer/ agency"
            setterfunction={setterfunction}
            leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
          />
        </form>
      </Form>
      <div className="flex flex-wrap gap-3 max-h-[80px] w-full overflow-y-auto">
        {allEmails.map((item: string) => (
          <div
            key={item}
            className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
          >
            {item}
            <XMarkIcon
              onClick={() => handleDeleteEmail(item)}
              cursor={"pointer"}
              className="text-[#0F172A] w-3.5 h-3.5"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>Confirm</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CampaignPopup;
