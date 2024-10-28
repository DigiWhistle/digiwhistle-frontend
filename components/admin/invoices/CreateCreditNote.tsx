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
const PayrollSchema = z.object({
  campaignName: z.string(),
  campaignCode: z.string(),
  brand: z.string(),
  gstin: z.string(),
  creditNoteNumber: z.string(),
  creditNoteDate: z.date(),
  month: z.string(),
  taxableAmount: z.number(),
  igst: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  total: z.number(),
  tdsAmount: z.number(),
  advance: z.number(),
  remarks: z.string().optional(),
});
const CreateCreditNote = ({ edit_id }: { edit_id?: any }) => {
  const [getbrand, brandSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PayrollSchema>>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {},
  });

  useEffect(() => {
    const updateFunction = async () => {
      setLoading(true);
      const campaignData: any = await GET(`campaign/search?code=${edit_id.code}`);
      const response: any = await GET(`invoice/creditnote/${edit_id.id}`);
      if (response.error) {
        toast.error(response.error);
        setLoading(false);
        return;
      }

      form.reset({
        campaignName: campaignData.data.name,
        campaignCode: edit_id.code,
        brand: campaignData.data.brand,
      });
      setLoading(false);

      // SetEditData(response.data);
    };
    updateFunction();
  }, []);

  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };

  const handleForm = async (data: z.infer<typeof PayrollSchema>, e: any) => {
    const sendInfo = {
      invoice: edit_id.id,
      gstTin: data.gstin,
      creditNoteNo: data.creditNoteNumber,
      creditNoteDate: data.creditNoteDate,
      amount: data.taxableAmount,
      sgst: data.sgst,
      cgst: data.cgst,
      igst: data.igst,
      total: data.total,
      tds: data.tdsAmount,
      advance: data.advance,
      remarks: data.remarks,
      month: data.month,
    };

    let response: any;
    response = await POST(`invoice/creditnote`, sendInfo);

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
        <div>Fetching Credit Details</div>
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
                placeholder=""
                label="Campaign name"
                disabled
              />
              <FormTextInput
                formName="campaignCode"
                placeholder=""
                label="Campaign code"
                disabled
              />
              <SearchSelect
                endpoint={"brand/search"}
                formName="brand"
                searchPlaceholder="Search Brand"
                placeholder="Select Brand"
                label="Brand name"
                selectedValueSetter={brandSetter}
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
                disabled
              />
            </div>
            <div className="flex gap-5">
              <FormTextInput formName="gstin" placeholder="" label="GSTIN" />
              <FormTextInput
                formName="creditNoteNumber"
                placeholder=""
                label="Credit note number"
              />
              <DatePicker
                label="Credit note date"
                placeholder=""
                setterfunction={setterfunction}
                formName="creditNoteDate"
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
              <div className="flex gap-5  w-2/3">
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
                  formName="advance"
                  placeholder=""
                  label="Advance"
                />

                <FormSelectInput
                  formName={"month"}
                  label="Month"
                  placeholder="Select Month"
                  className={"mt-1 "}
                  selectItems={MonthOptions}
                  triggerCN="h-[42px]"
                />
              </div>
              <div className="flex gap-5 w-1/3">
                <FormTextInput type="text" formName="remarks" placeholder="" label="Remarks" />
              </div>
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
          <ActionButton onClick={form.handleSubmit(handleForm)}>Create credit note</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateCreditNote;
