"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import {} from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { UserIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { DateRangePicker } from "@/components/ui/form/Date-Range-Picker";
import { POST } from "@/lib/config/axios";
import { toast } from "sonner";
import FormSelectInput from "@/components/ui/form/form-select-input";
import { SearchSelect } from "@/components/ui/form/SearchSelect";
import { SearchSelectCopy } from "@/components/ui/form/SearchSelectcopy";
import { useState } from "react";
import FormTextareaInput from "@/components/ui/form/form-textarea-input";
import { GET } from "@/lib/config/axios";
import { useEffect } from "react";
const Options = ["English", "Chinese", "Hindi", "Punjabi", "Thai", "Gujarati", "Marathi"];
export const PaymentStatusOptions = [
  {
    value: "All Paid",
    label: (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-4 h-4 text-success" /> All paid
      </div>
    ),
  },
  {
    value: "Pending",
    label: (
      <div className="flex items-center gap-2">
        <ExclamationCircleIcon className="w-4 h-4 text-warning" /> Pending
      </div>
    ),
  },
];

const CampaignSchema = z.object({
  campaignName: z.string(),
  campaignCode: z.string(),
  brand: z.string(),
  campaignDuration: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(data => data.from && data.to, {
      message: "Both start and end dates are required",
    }),
  commBrand: z.number(),
  invoiceNo: z.string().optional(),
  campaignManager: z.string(),
  incentiveWinner: z.string(),
  paymentStatus: z.string(),
  additionalDetails: z.string(),
  campaignEmail: z.string().optional() || null,
});
const CampaignPopup = ({ mode }: { mode: "Create campaign" | "Edit campaign" }) => {
  const [allEmails, setEmails] = useState<any>([]);
  const form = useForm<z.infer<typeof CampaignSchema>>({
    resolver: zodResolver(CampaignSchema),
  });
  useEffect(() => {
    if (mode === "Edit campaign") {
      const updateFunction = async () => {
        const response: any = await GET(``);
        setEmails(response.email);
      };
    }
  }, []);
  const setterfunction = (formname: any, Option: any) => {
    if (formname === "campaignEmail") {
      const emailExists = allEmails.some((email: any) => email.email === Option.email);

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setEmails([...allEmails, Option]);
        form.setValue(formname, "");
      }
    } else {
      form.setValue(formname, Option.name);
    }
    console.log("setter", form.getValues("brand"));
    console.log("setter", form.getValues("campaignEmail"));
  };

  const handleForm = async (data: z.infer<typeof CampaignSchema>, e: any) => {
    console.log("data", data);
    const sendInfo = {
      name: data.campaignName,
      code: data.campaignCode,
      brand: data.brand,
      brandName: data.brand,
      startDate: data.campaignDuration.from,
      endDate: data.campaignDuration.to,
      commercial: data.commBrand,
      invoiceNo: data.invoiceNo,
      status: data.paymentStatus,
      details: data.additionalDetails,
      manager: data.campaignManager,
      incentiveWinner: data.incentiveWinner,
      participants: allEmails,
    };

    const response = await POST("campaign", sendInfo);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setEmails([]);
    form.reset();
  };
  const handleDeleteEmail = (email: string) => {
    setEmails((prevEmails: any) => prevEmails.filter((item: any) => item.email !== email));
  };
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-5">
              <FormTextInput formName="campaignName" placeholder="" label="Campaign name" />
              <FormTextInput formName="campaignCode" placeholder="" label="Campaign code" />
              <SearchSelect
                endpoint={"search-brands"}
                formName="brand"
                searchPlaceholder="Search Brand"
                placeholder="Select Brand"
                label="Brand"
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
            </div>
            <div className="flex gap-5">
              <DateRangePicker
                formName="campaignDuration"
                placeholder=""
                label="Campaign duration"
                setterfunction={setterfunction}
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="commBrand"
                placeholder=""
                label="Comm-Brand"
              />
              <FormTextInput
                formName="invoiceNo"
                placeholder="DWT/2023-24/028/29"
                label="Invoice No."
              />
            </div>
            <div className="flex gap-5">
              <SearchSelect
                endpoint={"search-employees"}
                formName="campaignManager"
                searchPlaceholder="Search Manager"
                placeholder="Select Manager"
                label="Campaign manager"
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <SearchSelect
                endpoint={"search-employees"}
                formName="incentiveWinner"
                searchPlaceholder="Search Manager"
                placeholder="Select Manager"
                label="Incentive winner"
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <FormSelectInput
                formName={"paymentStatus"}
                label="Payment Status"
                placeholder="Payment Status"
                selectItems={PaymentStatusOptions}
                triggerCN="h-10"
                className=""
              />
            </div>
            <FormTextareaInput
              inputCN="h-20 min-h-[30px]"
              formName="additionalDetails"
              label="Additional details"
              placeholder="Deliverables, T&C etc."
            />

            <SearchSelect
              popoverclassname="w-[500px]"
              type={"EmailSelector"}
              // Options={Options}
              formName="campaignEmail"
              searchPlaceholder="Type email ID here"
              placeholder="Type email ID here"
              label="Add influencer/ agency"
              setterfunction={setterfunction}
              leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
            />
          </div>
        </form>
      </Form>
      <div className="flex flex-wrap gap-3 mt-3 max-h-[40px] w-full overflow-y-auto">
        {allEmails.map((item: any) => (
          <div
            key={item.email}
            className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full border object-cover w-6 h-6">
                {item.profilePic ? (
                  <Image className="" src={item.profilePic} alt="" />
                ) : (
                  <UserIcon className="text-tc-body-grey w-3 h-3" />
                )}
              </div>
              {item.email}
            </div>
            <XMarkIcon
              onClick={() => handleDeleteEmail(item.email)}
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
