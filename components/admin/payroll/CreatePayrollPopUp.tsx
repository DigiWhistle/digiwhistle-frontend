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
export const EmploymentTypeOptions = [
  {
    value: "Fulltime",
    label: <div className="flex items-center gap-2">Fulltime</div>,
  },
  {
    value: "Parttime",
    label: <div className="flex items-center gap-2">Parttime</div>,
  },
];

const PayrollSchema = z.object({
  Email: z.string().optional() || null,
  paymentStatus: z.string(),
  basic: z.number(),
  hra: z.number(),
  others: z.number(),
  ctc: z.number(),
  campaignDuration: z.date(),
});
const CreatePayrollPopUp = ({
  mode,
  edit_id,
}: {
  mode: "Create payroll" | "Edit payroll";
  edit_id?: string;
}) => {
  const [Email, setEmail] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PayrollSchema>>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {},
  });
  useEffect(() => {
    if (mode === "Edit payroll") {
      const updateFunction = async () => {
        setLoading(true);
        const response: any = await GET(`campaign/${edit_id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }

        form.reset({});
        setEmail(response.data.participants);
        setLoading(false);

        // SetEditData(response.data);
      };
      updateFunction();
    }
  }, []);

  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };

  const handleForm = async (data: z.infer<typeof PayrollSchema>, e: any) => {
    const sendInfo = {};
    console.log("sendinfo", data);
    let response: any;
    response = {};
    if (mode === "Create payroll") {
      response = await POST("payroll", sendInfo);
    } else {
      response = await PATCH(`campaign/${edit_id}`, sendInfo);
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
              <SearchSelect
                popoverclassname="w-[500px]"
                type={"email"}
                formName="Email"
                searchPlaceholder="Type email ID here"
                placeholder="Type email ID here"
                label="Email id"
                selectedValueSetter={setEmail}
                setterfunction={setterfunction}
              />
              <FormSelectInput
                formName={"paymentStatus"}
                label="Employment Type"
                placeholder="Select Employment Type"
                selectItems={EmploymentTypeOptions}
                triggerCN="h-10"
                className=""
              />
            </div>
            <hr className="mt-6 mb-5 " />
            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="basic"
                placeholder=""
                label="Basic"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="hra"
                placeholder=""
                label="HRA"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="others"
                placeholder=""
                label="Others"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="ctc"
                placeholder=""
                label="CTC/ month"
              />
              <DatePicker
                label="date"
                placeholder=""
                setterfunction={setterfunction}
                formName="campaignDuration"
              />
            </div>
            <hr className="mt-6 mb-2 " />
          </div>
        </form>
      </Form>

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

export default CreatePayrollPopUp;
