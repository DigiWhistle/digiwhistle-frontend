"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@/components/ui/textarea";
import FormTextInput from "@/components/ui/form/form-text-input";
import { Form } from "@/components/ui/form";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { POST } from "@/lib/config/axios";
import { toast } from "sonner";
import { Pointer } from "lucide-react";
import FormTextareaInput from "@/components/ui/form/form-textarea-input";
const AddEmailSchema = z.object({ email: z.string().email("Invalid email address") });
const MessageSchema = z.object({
  subject: z.string().min(1, "Enter Subject"),
  message: z.string().min(1, "Enter Message"),
});
const InviteInfluencer = () => {
  const [allEmails, setEmails] = useState<any>([]);

  const emailForm = useForm<z.infer<typeof AddEmailSchema>>({
    resolver: zodResolver(AddEmailSchema),
  });
  const messageForm = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
  });
  const handleEmailAdd = (data: z.infer<typeof AddEmailSchema>) => {
    setEmails([...allEmails, data.email]);
    emailForm.reset();
  };
  const handleFormSubmit = async (data: z.infer<typeof MessageSchema>) => {
    if (allEmails.length === 0) {
      toast.error("Enter Atleast 1 Email");
      return;
    }
    const response = await POST("influencer/invite", {
      message: data.message,
      subject: data.subject,
      emails: allEmails,
    });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setEmails([]);
    messageForm.reset();
    emailForm.reset();
  };
  const handleDeleteEmail = (item: string) => {
    setEmails((prevEmails: any) => prevEmails.filter((email: string) => email !== item));
  };
  return (
    <div className="flex flex-col w-full space-y-5 ">
      <Form {...emailForm}>
        <form action="" className="flex flex-col gap-6 mt-4 items-center w-full">
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
      <div className="flex flex-wrap gap-3 max-h-[80px] w-full overflow-y-auto">
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
      <div className="flex flex-col border-t-2">
        <Form {...messageForm}>
          <form action="" className="flex flex-col gap-4 mt-4 items-center w-full">
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
            <div className="flex w-full gap-3 pt-6 border-t-2 mt-3">
              <CancelButton />
              <ActionButton onClick={messageForm.handleSubmit(handleFormSubmit)}>
                Send the invite
              </ActionButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default InviteInfluencer;
