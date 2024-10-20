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

const PayrollSchema = z.object({
  subject: z.string().min(1, "Enter Subject"),
  message: z.string().min(1, "Enter Message"),
  shareEmail: z.string().optional() || null,
});
const ShareInvoice = ({ edit_id }: { edit_id?: string }) => {
  const [allEmails, setEmails] = useState<any>([]);

  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PayrollSchema>>({
    resolver: zodResolver(PayrollSchema),
    defaultValues: {},
  });
  useEffect(() => {}, []);

  const setterfunction = (formname: any, Option: any) => {
    if (formname === "shareEmail") {
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

  const handleForm = async (data: z.infer<typeof PayrollSchema>, e: any) => {
    const sendInfo = {};
    console.log("sendinfo", data, allEmails);
    let response: any;
    response = {};
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
        <div>Fetching Campaign Details</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <SearchSelect
              popoverclassname="w-[500px]"
              type={"EmailSelector"}
              // Options={Options}
              formName="shareEmail"
              searchPlaceholder="Type email ID here"
              placeholder="Type email ID here"
              label="Add influencer/ agency"
              setterfunction={setterfunction}
              leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
            />
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
          <ActionButton onClick={form.handleSubmit(handleForm)}>Share invoice</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ShareInvoice;
