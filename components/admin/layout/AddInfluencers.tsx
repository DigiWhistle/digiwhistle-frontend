"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { LinkIcon, DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import {
  instagramURL,
  linkedinURL,
  mobileNoSchema,
  termsCheckSchema,
  twitterURL,
  youtubeURL,
} from "@/lib/validationSchema";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { POST } from "@/lib/config/axios";
import { toast } from "sonner";

const AddInfluencersSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  instagramURL: instagramURL,
  twitterURL: twitterURL,
  youtubeURL: youtubeURL,
  mobileNo: mobileNoSchema,
  linkedInURL: linkedinURL,
  linkedInCommercial: z.number().optional(),
  location: z.string().optional(),
  rating: z.number().optional(),
  instagramCommercial: z.number().optional(),
  twitterCommercial: z.number().optional(),
  youtubeCommercial: z.number().optional(),
});

const AddInfluencers = () => {
  const form = useForm<z.infer<typeof AddInfluencersSchema>>({
    resolver: zodResolver(AddInfluencersSchema),
  });

  const handleAddInfluencers = async (data: z.infer<typeof AddInfluencersSchema>) => {
    const response = await POST("influencer", {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
      twitterURL: data.twitterURL || undefined,
      instagramURL: data.instagramURL || undefined,
      youtubeURL: data.youtubeURL || undefined,
      instagramCommercial: data.instagramCommercial,
      youtubeCommercial: data.youtubeCommercial,
      twitterCommercial: data.twitterCommercial,
      location: data.location,
      rating: data.rating,
      email: data.email,
      linkedInURL: data.linkedInURL || undefined,
      linkedInCommercial: data.linkedInCommercial,
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
            <div className="flex gap-4 items-center">
              <FormTextInput
                formName="instagramURL"
                label="Instagram Profile Link"
                placeholder="https://www.instagram.com/username/"
                leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
              />
              <FormTextInput
                formName="instagramCommercial"
                label="Instagram Commercial"
                placeholder="Enter commercial"
                type="number"
              />
            </div>
            <div className="flex gap-4 items-center">
              <FormTextInput
                formName="youtubeURL"
                label="Youtube Profile Link"
                placeholder="https://www.youtube.com/username/"
                leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
              />
              <FormTextInput
                formName="youtubeCommercial"
                label="Youtube Commercial"
                placeholder="Enter commercial"
                type="number"
              />
            </div>
            <div className="flex gap-4 items-center">
              <FormTextInput
                formName="twitterURL"
                label="X Profile Link"
                placeholder="https://www.x.com/username/"
                leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
              />
              <FormTextInput
                formName="twitterCommercial"
                label="Twitter Commercial"
                placeholder="Enter commercial"
                type="number"
              />
            </div>
            <div className="flex gap-4 items-center">
              <FormTextInput
                formName="linkedInURL"
                label="Linkedin Profile Link"
                placeholder="https://www.linkedin.com/"
                leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
              />
              <FormTextInput
                formName="linkedInCommercial"
                label="Linkedin Commercial"
                placeholder="Enter commercial"
                type="number"
              />
            </div>
            <div className="flex gap-4 items-center">
              <FormTextInput
                formName="location"
                label="Influencer Location"
                placeholder="Enter location"
              />
              <FormTextInput
                formName="rating"
                label="DW Rating"
                placeholder="Enter rating"
                type="number"
              />
            </div>
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
