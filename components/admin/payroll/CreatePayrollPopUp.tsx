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
    value: "Full Time",
    label: <div className="flex items-center gap-2">Full Time</div>,
  },
  {
    value: "Internship",
    label: <div className="flex items-center gap-2">Internship</div>,
  },
];

const PayrollSchema = z.object({
  Email: z.string().optional() || null,
  employmentType: z.string(),
  salaryMonth: z.string().optional(),
  workingDays: z.number().optional(),
  basic: z.number(),
  hra: z.number(),
  others: z.number(),
  ctc: z.number(),
  grossPay: z.number().optional(),
  tdsAmount: z.number().optional(),
  incentive: z.number().optional(),
  finalPay: z.number().optional(),
});

const CreatePayrollPopUp = ({
  mode,
  edit_id,
}: {
  mode: "Create payroll" | "Edit payroll";
  edit_id?: any;
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
        const response: any = await GET(`payroll/${edit_id.id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }
        form.reset({
          Email: response.data.employeeProfile.user.email,
          employmentType: response.data.employmentType,
          salaryMonth: edit_id.salaryMonth,
          workingDays: Number(edit_id.workingDays),
          basic: response.data.basic,
          hra: response.data.hra,
          others: response.data.others,
          ctc: response.data.ctc,
          grossPay: edit_id.grossPay,
          tdsAmount: edit_id.tds,
          finalPay: edit_id.finalPay,
        });
        setEmail(response.data.employeeProfile);
        setLoading(false);

        // SetEditData(response.data);
      };
      updateFunction();
    }
  }, [edit_id]);

  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };

  const handleForm = async (data: z.infer<typeof PayrollSchema>, e: any) => {
    let sendInfo: any;
    sendInfo = {
      employeeProfile: Email.id,
      basic: data.basic,
      hra: data.hra,
      others: data.others,
      ctc: data.ctc,
      employmentType: data.employmentType,
    };
    let response: any;
    response = {};
    if (mode === "Create payroll") {
      sendInfo = {
        employeeProfile: Email.id,
        basic: data.basic,
        hra: data.hra,
        others: data.others,
        ctc: data.ctc,
        employmentType: data.employmentType,
      };
      response = await POST("payroll", sendInfo);
    } else {
      sendInfo = {
        basic: data.basic,
        hra: data.hra,
        others: data.others,
        ctc: data.ctc,
        employmentType: data.employmentType,
      };
      response = await PATCH(`payroll/${edit_id.id}`, {
        ...sendInfo,
        workingDays: data.workingDays,
        tds: data.tdsAmount,
        incentive: data.incentive,
      });
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
        <div>Fetching Payroll Details</div>
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
                disabled={mode === "Edit payroll"}
              />
              <FormSelectInput
                formName={"employmentType"}
                label="Employment Type"
                placeholder="Select Employment Type"
                selectItems={EmploymentTypeOptions}
                triggerCN="h-[42px] "
                className="gap-1 "
              />
              {mode === "Edit payroll" ? (
                <>
                  {" "}
                  <FormTextInput
                    type="text"
                    leftIcon={<div className="text-tc-body-grey">₹</div>}
                    formName="workingDays"
                    placeholder=""
                    label="Working days"
                  />
                </>
              ) : (
                <></>
              )}
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
            </div>
            {mode === "Edit payroll" ? (
              <>
                <hr className="mt-6 mb-2 " />
                <div className="flex gap-5">
                  {" "}
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
                    formName="incentive"
                    placeholder=""
                    label="Incentive"
                  />{" "}
                </div>
              </>
            ) : (
              <></>
            )}
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
