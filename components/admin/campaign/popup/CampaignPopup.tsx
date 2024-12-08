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
import { PATCH, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import FormSelectInput from "@/components/ui/form/form-select-input";
import { SearchSelect } from "@/components/ui/form/SearchSelect";
import { useState } from "react";
import FormTextareaInput from "@/components/ui/form/form-textarea-input";
import { GET } from "@/lib/config/axios";
import { useEffect } from "react";

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
  campaignName: z.string().min(1, "Campaign name is required"),
  campaignCode: z.string().min(1, "Campaign code is required"),
  brand: z.string().min(1, "Campaign brand is required"),
  campaignDuration: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine(data => data.from && data.to, {
      message: "Both start and end dates are required",
    }),
  commBrand: z.number().positive("Commercial is required"),
  invoiceNo: z.string().optional(),
  campaignManager: z.string().min(1, "Select campaign manager"),
  incentiveWinner: z.string().min(1, "Select incentive winner"),
  paymentStatus: z.string().optional(),
  paymentTerms: z.string().min(1, "Select payment terms"),
  additionalDetails: z.string(),
  campaignEmail: z.string().optional() || null,
});

export const DaysOptions = [
  { value: "0 Days", label: "0 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
];

const CampaignPopup = ({
  mode,
  edit_id,
}: {
  mode: "Create campaign" | "Edit campaign";
  edit_id?: string;
}) => {
  const [allEmails, setEmails] = useState<any>([]);
  const [getbrand, brandSetter] = useState<any>({});
  const [getmanager, managerSetter] = useState<any>({});
  const [getWinner, winnerSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  // const [EditData, SetEditData] = useState<any>(null);
  const form = useForm<z.infer<typeof CampaignSchema>>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: {
      campaignName: "",
      campaignCode: "",
      brand: "",
      campaignDuration: { from: new Date(), to: new Date() },
      commBrand: 0,
      invoiceNo: "",
      campaignManager: "",
      incentiveWinner: "",
      paymentStatus: "",
      additionalDetails: "",
      campaignEmail: undefined,
    },
  });
  useEffect(() => {
    if (mode === "Edit campaign") {
      const updateFunction = async () => {
        setLoading(true);
        const response: any = await GET(`campaign/${edit_id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }
        brandSetter(response.data.brand);
        managerSetter(response.data.manager);
        winnerSetter(response.data.incentiveWinner);
        form.reset({
          campaignName: response.data.name,
          campaignCode: response.data.code,
          brand: response.data.brandName,
          campaignDuration: {
            from: new Date(response.data.startDate),
            to: new Date(response.data.endDate),
          },
          commBrand: response.data.commercial,
          invoiceNo: response.data.invoiceNo,
          campaignManager: response.data.manager.name || "",
          incentiveWinner: response.data.incentiveWinner.name || "",
          paymentStatus: response.data.paymentStatus,
          paymentTerms: response.data.paymentTerms,
          additionalDetails: response.data.details,
          campaignEmail: "",
        });
        setEmails(response.data.participants);
        setLoading(false);

        // SetEditData(response.data);
      };
      updateFunction();
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
  };

  const handleForm = async (data: z.infer<typeof CampaignSchema>, e: any) => {
    const sendInfo = {
      name: data.campaignName,
      code: data.campaignCode,
      brand: getbrand.id || "donnt",
      brandName: data.brand,
      startDate: data.campaignDuration.from,
      endDate: data.campaignDuration.to,
      commercial: data.commBrand,
      invoiceNo: data.invoiceNo,
      details: data.additionalDetails,
      manager: getmanager.id,
      incentiveWinner: getWinner.id,
      participants: allEmails,
    };
    let response: any;
    response = {};
    if (mode === "Create campaign") {
      response = await POST("campaign", sendInfo);
    } else {
      response = await PATCH(`campaign/${edit_id}`, {
        ...sendInfo,
        paymentStatus: data.paymentStatus,
      });
    }
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setEmails([]);
    // form.reset({});
    // window.location.reload();
  };
  const handleDeleteEmail = (email: string) => {
    setEmails((prevEmails: any) => prevEmails.filter((item: any) => item.email !== email));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] overflow-y-auto">
        <span className="loading loading-spinner loading-xl "></span>
        <div>Fetching Campaign Details</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-5">
              <FormTextInput
                formName="campaignName"
                placeholder="Enter name"
                label="Campaign name"
                required
              />
              <FormTextInput
                formName="campaignCode"
                required
                placeholder="Enter code"
                label="Campaign code"
              />
              <SearchSelect
                endpoint={"brand/search"}
                formName="brand"
                required
                searchPlaceholder="Search Brand"
                placeholder="Select Brand"
                label="Brand"
                selectedValueSetter={brandSetter}
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
            </div>
            <div className="flex gap-5">
              <DateRangePicker
                formName="campaignDuration"
                placeholder="Select Date"
                required
                label="Campaign duration"
                setterfunction={setterfunction}
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="commBrand"
                placeholder="Enter amount"
                label="Comm-Brand"
                required
              />
              {/* <FormTextInput
                formName="invoiceNo"
                placeholder="DWT/2023-24/028/29"
                label="Invoice No."
              /> */}
            </div>
            <div className="flex gap-5">
              <SearchSelect
                endpoint={"employee/search"}
                formName="campaignManager"
                searchPlaceholder="Search Manager"
                selectedValueSetter={managerSetter}
                placeholder="Select Manager"
                label="Campaign manager"
                setterfunction={setterfunction}
                required
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <SearchSelect
                required
                endpoint={"employee/search"}
                formName="incentiveWinner"
                searchPlaceholder="Search Manager"
                selectedValueSetter={winnerSetter}
                placeholder="Select Manager"
                label="Incentive winner"
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <FormSelectInput
                formName={"paymentTerms"}
                label="Payment Terms"
                placeholder="Select terms"
                selectItems={DaysOptions}
                triggerCN="h-10"
                className=""
                required
              />
              {mode != "Create campaign" ? (
                <FormSelectInput
                  formName={"paymentStatus"}
                  label="Payment Status"
                  placeholder="Select Status"
                  selectItems={PaymentStatusOptions}
                  triggerCN="h-10"
                  className=""
                  required
                />
              ) : (
                <></>
              )}
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
              required
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
