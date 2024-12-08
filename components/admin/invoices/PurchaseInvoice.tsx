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
export const DaysOptions = [
  { value: "0 Days", label: "0 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
];

const InvoiceSchema = z.object({
  invoiceNo: z.string(),
  pan: z.string(),
  amount: z.number(),
  igst: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  totalAmount: z.number(),
  tds: z.number(),
  finalAmount: z.number(),
  amountToBeReceived: z.number(),
  paymentStatus: z.string(),
  paymentTerms: z.string(),
});
const PurchaseInvoice = ({
  mode,
  edit_id,
}: {
  mode: "Create purchase invoice" | "Edit purchase invoice";
  edit_id?: any;
}) => {
  const [getbrand, brandSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (mode === "Edit purchase invoice") {
      const updateFunction = async () => {
        setLoading(true);
        const response: any = await GET(`invoice/purchase/${edit_id.id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }
        form.reset({
          invoiceNo: response.data.invoiceNo,
          pan: response.data.pan,
          amount: Number(response.data.amount),
          igst: Number(response.data.igst),
          cgst: Number(response.data.cgst),
          sgst: Number(response.data.sgst),
          totalAmount: Number(response.data.totalAmount),
          tds: Number(response.data.tds),
          finalAmount: Number(response.data.finalAmount),
          amountToBeReceived: Number(response.data.amountToBeReceived),
          paymentStatus: response.data.paymentStatus,
          paymentTerms: response.data.paymentTerms,
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
    const sendInfo = {
      invoiceNo: data.invoiceNo,
      pan: data.pan,
      amount: data.amount,
      igst: data.igst,
      cgst: data.cgst,
      sgst: data.sgst,
      totalAmount: data.totalAmount,
      tds: data.tds,
      finalAmount: data.finalAmount,
      amountToBeReceived: data.amountToBeReceived,
      paymentStatus: data.paymentStatus,
      paymentTerms: data.paymentTerms,
    };

    let response: any;
    if (mode === "Edit purchase invoice") {
      response = await PATCH(`invoice/purchase/${edit_id.id}`, sendInfo);
    }

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }

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
              <FormTextInput formName="invoiceNo" placeholder="" label="Invoice No." />
              <FormTextInput formName="pan" placeholder="" label="PAN" />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="amount"
                placeholder=""
                label="Amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">%</div>}
                formName="tds"
                placeholder=""
                label="TDS amount"
              />
            </div>

            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
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
                formName="totalAmount"
                placeholder=""
                label="Total Amount"
              />
            </div>
            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="finalAmount"
                placeholder=""
                label="Final Amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="amountToBeReceived"
                placeholder=""
                label="Amount Received"
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
                formName={"paymentTerms"}
                label="Payment Terms"
                placeholder="Payment Terms"
                selectItems={DaysOptions}
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
          <ActionButton onClick={form.handleSubmit(handleForm)}>{"Confirm changes"}</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
