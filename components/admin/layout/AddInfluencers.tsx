"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { LinkIcon, DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import { mobileNoSchema, termsCheckSchema } from "@/lib/validationSchema";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";
import { getCookie, getCookies } from "cookies-next";
const AddInfluencersSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  instagramURL: z
    .string()
    .optional()
    .refine(
      value => !value || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(value),
      {
        message: "Please provide a valid Instagram URL",
      },
    ),
  youtubeURL: z
    .string()
    .optional()
    .refine(
      value =>
        !value ||
        /^(https?:\/\/)?(www\.)?youtube\.com\/(channel\/|c\/|user\/|@)[\w-]{1,}/.test(value),
      {
        message: "Please provide a valid YouTube channel or user URL",
      },
    ),
  twitterURL: z
    .string()
    .optional()
    .refine(
      value =>
        !value || /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/.test(value),
      {
        message: "Please provide a valid X (Twitter) URL",
      },
    ),
  mobileNo: mobileNoSchema,
});

const AddInfluencers = () => {
  const form = useForm<z.infer<typeof AddInfluencersSchema>>({
    resolver: zodResolver(AddInfluencersSchema),
  });

  const handleAddInfluencers = async (data: z.infer<typeof AddInfluencersSchema>) => {
    console.log("called");
    const response = await postAuthorizedRequest("influencer", {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
      twitterURL: data.twitterURL,
      linkedInURL: "string",
      instagramURL: data.instagramURL,
      youtubeURL: data.youtubeURL,
      email: data.email,
    });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="flex flex-col gap-6 mt-4 items-center w-full"
        onSubmit={form.handleSubmit(handleAddInfluencers)}
      >
        <div className="flex flex-col w-full gap-4 ">
          <div className="flex gap-3  w-full">
            <FormTextInput
              formName="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />
            <FormTextInput
              formName="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />
          </div>
          <div className="flex gap-3  w-full">
            <FormPhoneInput mobileFormName="mobileNo" required />
            <FormTextInput
              formName="email"
              label="Email"
              placeholder="Enter email"
              required
              leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
            />
          </div>
          <div className="w-full space-y-4">
            <FormTextInput
              formName="instagramURL"
              label="Instagram Profile Link"
              placeholder="https://www.instagram.com/username/"
              leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
            />
            <FormTextInput
              formName="youtubeURL"
              label="Youtube Profile Link"
              placeholder="https://www.youtube.com/username/"
              leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
            />
            <FormTextInput
              formName="twitterURL"
              label="X Profile Link"
              placeholder="https://www.x.com/username/"
              leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
            />
          </div>
          <div className="flex w-full gap-3 pt-6 border-t-2 mt-3">
            <CancelButton />
            <ActionButton onClick={form.handleSubmit(handleAddInfluencers)}>
              Add Influencer
            </ActionButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddInfluencers;