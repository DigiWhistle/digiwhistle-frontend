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
import { getCookie } from "cookies-next";
import { DatePicker } from "@/components/ui/form/Date-Picker";
const Options = ["English", "Chinese", "Hindi", "Punjabi", "Thai", "Gujarati", "Marathi"];

export const PaymentStatusOptions = [
  {
    value: "All Received",
    label: (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-4 h-4 text-success" /> All Received
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
export const MonthOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
const InvoiceSchema = z.object({
  campaignName: z.string(),
  campaignCode: z.string(),
  brand: z.string(),
  gstin: z.string(),
  invoiceNo: z.string().optional(),
  invoiceDate: z.date(),
  taxableAmount: z.number(),
  igst: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  total: z.number(),
  tdsAmount: z.number(),
  recieved: z.number(),
  balanceAmount: z.number(),
  paymentStatus: z.string(),
  month: z.string(),
});
const SaleInvoice = ({
  mode,
  edit_id,
}: {
  mode: "Create sale invoice" | "Edit sale invoice";
  edit_id?: any;
}) => {
  const [getbrand, brandSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (mode === "Edit sale invoice") {
      const updateFunction = async () => {
        setLoading(true);
        const response: any = await GET(`invoice/sale/${edit_id.id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }
        form.reset({
          campaignName: response.data.campaign.name,
          campaignCode: response.data.campaign.code,
          brand: response.data.campaign.brandName,
          gstin: response.data.gstTin,
          invoiceNo: response.data.invoiceNo,
          invoiceDate: new Date(response.data.invoiceDate),
          taxableAmount: Number(response.data.amount),
          igst: Number(response.data.igst),
          cgst: Number(response.data.cgst),
          sgst: Number(response.data.sgst),
          total: Number(response.data.total),
          tdsAmount: Number(response.data.tds),
          recieved: Number(response.data.received),
          balanceAmount: Number(response.data.balanceAmount),
          paymentStatus: response.data.paymentStatus,
          month: response.data.month,
        });
        setLoading(false);

        // SetEditData(response.data);
      };
      updateFunction();
    }
  }, []);

  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };

  const handleForm = async (data: z.infer<typeof InvoiceSchema>, e: any) => {
    const campaignData: any = await GET(`campaign/search?code=${data.campaignCode}`);
    if (campaignData.error) {
      toast.error("Please enter a valid Campaign Code");
      form.reset({});
      window.location.reload();
      return;
    }
    const sendInfo = {
      gstTin: data.gstin,
      invoiceNo: data.invoiceNo,
      invoiceDate: data.invoiceDate,
      amount: data.taxableAmount,
      sgst: data.sgst,
      cgst: data.cgst,
      igst: data.igst,
      total: data.total,
      tds: data.tdsAmount,
      received: data.recieved,
      balanceAmount: data.balanceAmount,
      month: data.month,
      paymentStatus: data.paymentStatus,
    };

    let response: any;
    if (mode === "Edit sale invoice") {
      response = await PATCH(`invoice/sale/${edit_id.id}`, sendInfo);
    } else {
      response = await POST(`invoice/sale`, { ...sendInfo, campaign: campaignData.data.id });
    }

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }

    // if (mode === "Edit sale invoice") {
    //   return;
    // }
    form.reset({});
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] overflow-y-auto">
        <span className="loading loading-spinner loading-xl "></span>
        <div>Fetching Invoice Details</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <div className="flex gap-5">
              <FormTextInput formName="campaignName" placeholder="" label="Campaign name" />
              <FormTextInput formName="campaignCode" placeholder="" label="Campaign code" />
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
            <div className="flex gap-5">
              <FormTextInput formName="gstin" placeholder="" label="GSTIN" />
              <FormTextInput
                formName="invoiceNo"
                placeholder="DWT/2023-24/028/29"
                label="Invoice number"
              />
              <DatePicker
                label="Invoice date"
                placeholder=""
                setterfunction={setterfunction}
                formName="invoiceDate"
              />
            </div>
            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="taxableAmount"
                placeholder=""
                label="Taxable amount"
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
                formName="total"
                placeholder=""
                label="Total"
              />
            </div>
            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">%</div>}
                formName="tdsAmount"
                placeholder=""
                label="TDS amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="recieved"
                placeholder=""
                label="Received"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="balanceAmount"
                placeholder=""
                label="Balance amount"
              />
              <FormSelectInput
                formName={"paymentStatus"}
                label="Payment Status"
                placeholder="Payment Status"
                selectItems={PaymentStatusOptions}
                triggerCN="h-10"
                className=""
              />
              <FormSelectInput
                formName={"month"}
                label="Month"
                placeholder="Select Month"
                selectItems={MonthOptions}
                triggerCN="h-10"
                className=""
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

export default SaleInvoice;
