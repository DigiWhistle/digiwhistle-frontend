"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
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

const AddEmailSchema = z.object({ email: z.string().email("Invalid email address") });

const PayrollSchema = z.object({
  subject: z.string().min(1, "Enter Subject"),
  message: z.string().min(1, "Enter Message"),
  shareEmail: z.string().optional() || null,
});
const ShareInvoice = ({ edit_id, shareUrl }: { edit_id?: any; shareUrl?: string }) => {
  const [allEmails, setEmails] = useState<any>([]);
  const [sendEmails, setSendEmails] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PayrollSchema>>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {},
  });

  const emailForm = useForm<z.infer<typeof AddEmailSchema>>({
    resolver: zodResolver(AddEmailSchema),
  });
  useEffect(() => {}, []);

  const setterfunction = (formname: any, Option: any) => {
    if (formname === "shareEmail") {
      const emailExists = allEmails.some((email: any) => email.email === Option.email);

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setEmails([...allEmails, Option]);
        setSendEmails([...sendEmails, Option.email]);
        form.setValue(formname, "");
      }
    } else {
      form.setValue(formname, Option.name);
    }
  };

  const handleForm = async (data: z.infer<typeof PayrollSchema>, e: any) => {
    if (allEmails.length <= 0) {
      toast.error("Please enter atleast 1 email");
      return;
    }
    const sendInfo = {
      invoiceId: edit_id,
      emails: allEmails,
      subject: data.subject,
      message: data.message,
    };
    const response = await POST(`${shareUrl}`, sendInfo);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setSendEmails([]);
    setEmails([]);
    form.reset({});
    // window.location.reload();
  };
  const handleDeleteEmail = (email: string) => {
    setEmails((prevEmails: any) => prevEmails.filter((item: any) => item.email !== email));
  };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] overflow-y-auto">
        <span className="loading loading-spinner loading-xl "></span>
        <div>Fetching Details</div>
      </div>
    );
  }

  const handleEmailAdd = (data: z.infer<typeof AddEmailSchema>) => {
    setEmails([...allEmails, data.email]);
    emailForm.reset();
  };

  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...emailForm}>
        <form action="" className="flex flex-col gap-6 items-center w-full">
          <FormTextInput
            formName="email"
            label=""
            placeholder="Type email ID of user you want to invite"
            leftIcon={<MagnifyingGlassIcon className="text-[#0F172A] w-5 h-5" />}
            inputProps={{
              onKeyDown: e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  emailForm.handleSubmit(handleEmailAdd)(e);
                }
              },
            }}
            rightIcon={
              <PlusCircleIcon
                onClick={emailForm.handleSubmit(handleEmailAdd)}
                className="text-[#0F172A] w-5 h-5"
              />
            }
          />
        </form>
      </Form>
      <div className="flex flex-wrap gap-3 max-h-[80px] w-full overflow-y-auto my-4">
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
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <hr className="mt-2 mb-2 " />
            <FormTextInput
              formName="subject"
              label="Subject"
              placeholder="Welcome to DigiWhistle"
            />
            <FormTextareaInput
              formName="message"
              label="Message"
              placeholder="I invite you to the platform"
            />
          </div>
        </form>
      </Form>

      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>Share</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ShareInvoice;
