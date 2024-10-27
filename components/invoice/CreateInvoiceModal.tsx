"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
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
import { getCookie } from "cookies-next";
import { DatePicker } from "@/components/ui/form/Date-Picker";
import FormUploadInput from "../ui/form/form-upload-input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/config/firebase";
import { useAppSelector } from "@/lib/config/store";
const Options = ["English", "Chinese", "Hindi", "Punjabi", "Thai", "Gujarati", "Marathi"];
import { User } from "@/store/UserSlice";
export const PaymentStatusOptions = [
  {
    value: "All Recieved",
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
export const DaysOptions = [
  { value: "0 Days", label: "0 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
];
const InvoiceModalSchema = z.object({
  doc: z.any(),
  campaignName: z.string(),
  campaignCode: z.string(),
  invoiceNo: z.string().optional(),
  PAN: z.string(),
  brand: z.string().optional(),
  total: z.number(),
  igst: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  totalInvoiceAmount: z.number(),
  tdsAmount: z.number(),
  finalAmount: z.number(),
  amountToBeRecieved: z.number(),
  paymentTerms: z.string(),
  paymentStatus: z.string(),
});
const CreateInvoiceModal = ({
  mode,
  edit_id,
}: {
  mode: "Create sale invoice" | "Edit sale invoice";
  edit_id?: string;
}) => {
  const [getbrand, brandSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const form = useForm<z.infer<typeof InvoiceModalSchema>>({
    resolver: zodResolver(InvoiceModalSchema),
    defaultValues: {},
  });

  const usestore = useAppSelector(User);
  console.log(usestore);
  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };

  const handleForm = async (data: z.infer<typeof InvoiceModalSchema>, e: any) => {
    console.log("dataa", data, file);

    const campaignData: any = await GET(`campaign/search?code=${data.campaignCode}`);
    console.log(campaignData);
    if (campaignData.error) {
      toast.error("Please enter a valid Campaign Code");
      return;
    }
    if (!file) return; // Return if no file is selected
    const storageRef = ref(storage, `invoice/${file.name}`); // Create a reference to the file in Firebase Storage

    await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const url = await getDownloadURL(storageRef);
    if (!url) {
      toast.error("error uploading invoice");
      return;
    }
    console.log("url", url);
    const sendInfo = {
      campaign: campaignData.data.id,
      invoiceNo: data.invoiceNo,
      pan: data.PAN,
      amount: data.total,
      igst: data.igst,
      cgst: data.cgst,
      sgst: data.sgst,
      totalAmount: data.totalInvoiceAmount,
      tds: data.tdsAmount,
      finalAmount: data.finalAmount,
      amountToBeReceived: data.amountToBeRecieved,
      paymentTerms: data.paymentTerms,
      paymentStatus: data.paymentStatus,
      file: url,
      invoiceDate: new Date().toISOString(),
    };

    let response: any;
    if (usestore) {
      if (usestore.role === "agency") {
        response = await POST(`invoice/purchase`, {
          ...sendInfo,
          agencyProfile: usestore.profile?.id,
        });
      }
      if (usestore.role === "influencer") {
        response = await POST(`invoice/purchase`, {
          ...sendInfo,
          influencerProfile: usestore.profile?.id,
        });
      }
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
      }
    }

    // form.reset({});
    // window.location.reload();
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
            <div className="flex">
              <FormUploadInput
                className="w-full  "
                inputCN="border-2 rounded-xl border-dashed h-15 "
                setFile={setFile}
                inputProps={{
                  onKeyDown: e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  },
                }}
                formName="doc"
                label=""
                placeholder=""
                leftIcon={<ArrowUpOnSquareIcon className="text-[#0F172A] w-5 h-5" />}
              />
            </div>
            <hr className="mt-4 mb-0 " />
            <div className="flex gap-5">
              <FormTextInput formName="campaignName" placeholder="" label="Campaign name" />
              <FormTextInput formName="campaignCode" placeholder="" label="Campaign code" />
              <FormTextInput
                formName="invoiceNo"
                placeholder="DWT/2023-24/028/29"
                label="Invoice number"
              />
              <FormTextInput formName="PAN" placeholder="" label="PAN" />
              <SearchSelect
                endpoint={"brand/search"}
                formName="brand"
                searchPlaceholder="Search Brand"
                placeholder="Select Brand"
                label="Brand name"
                selectedValueSetter={brandSetter}
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
            </div>

            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="total"
                placeholder=""
                label="Total amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="igst"
                placeholder=""
                label="IGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="cgst"
                placeholder=""
                label="CGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="sgst"
                placeholder=""
                label="SGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="totalInvoiceAmount"
                placeholder=""
                label="Total invoice amount"
              />
            </div>
            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="tdsAmount"
                placeholder=""
                label="TDS amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="finalAmount"
                placeholder=""
                label="Final amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="amountToBeRecieved"
                placeholder=""
                label="Amount to be received"
              />
              <FormSelectInput
                formName={"paymentTerms"}
                label="Payment terms"
                placeholder=""
                selectItems={DaysOptions}
                triggerCN="h-10"
                className="mt-1"
              />
              <FormSelectInput
                formName={"paymentStatus"}
                label="Payment Status"
                placeholder="Payment Status"
                selectItems={PaymentStatusOptions}
                triggerCN="h-10"
                className="mt-1"
              />
            </div>

            <hr className="mt-4 mb-0 " />
          </div>
        </form>
      </Form>

      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>
            {mode === "Create sale invoice" ? "Create sale invoice" : "Confirm changes"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;
