"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { LinkIcon, DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import {
  instagramURL,
  mobileNoSchema,
  termsCheckSchema,
  twitterURL,
  youtubeURL,
} from "@/lib/validationSchema";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { GET, PATCH, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import { Influencer } from "@/types/admin/influencer";

const EditInfluencerSchema = z.object({
  instagramURL: instagramURL,
  twitterURL: twitterURL,
  youtubeURL: youtubeURL,
  mobileNo: mobileNoSchema,
  location: z.string().optional(),
  instagramCommercial: z.number().optional(),
  twitterCommercial: z.number().optional(),
  youtubeCommercial: z.number().optional(),
});

const EditInfluencer = ({ influencer }: { influencer: Influencer }) => {
  const [defaultValues, setDefaultValues] = useState<z.infer<typeof EditInfluencerSchema> | null>(
    null,
  );

  const form = useForm<z.infer<typeof EditInfluencerSchema>>({
    resolver: zodResolver(EditInfluencerSchema),
    defaultValues: defaultValues || {},
  });

  useEffect(() => {
    const fetchDefaultValues = async () => {
      const response = await GET(`influencer/profile/${influencer.profileId}`);
      if (response.error) {
        toast.error(response.error);
        setDefaultValues({
          instagramURL: "",
          twitterURL: "",
          youtubeURL: "",
          mobileNo: "",
          location: "",
          instagramCommercial: 0,
          twitterCommercial: 0,
          youtubeCommercial: 0,
        });
      } else {
        const data = response.data as z.infer<typeof EditInfluencerSchema>;
        setDefaultValues(data);
        form.setValue("mobileNo", data.mobileNo);
        form.setValue("instagramURL", data.instagramURL || undefined);
        form.setValue("twitterURL", data.twitterURL || undefined);
        form.setValue("youtubeURL", data.youtubeURL || undefined);
        form.setValue("instagramCommercial", data.instagramCommercial || 0);
        form.setValue("youtubeCommercial", data.youtubeCommercial || 0);
        form.setValue("twitterCommercial", data.twitterCommercial || 0);
        form.setValue("location", data.location || undefined);
      }
    };
    fetchDefaultValues();
  }, []);

  const handleEditInfluencer = async (data: z.infer<typeof EditInfluencerSchema>) => {
    const response = await PATCH(`influencer/profile/${influencer.profileId}`, {
      mobileNo: data.mobileNo,
      twitterURL: data.twitterURL || undefined,
      instagramURL: data.instagramURL || undefined,
      youtubeURL: data.youtubeURL || undefined,
      location: data.location,
      instagramCommercial: data.instagramCommercial,
      twitterCommercial: data.twitterCommercial,
      youtubeCommercial: data.youtubeCommercial,
    });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="flex flex-col gap-6 mt-4 items-center w-full"
        // onSubmit={form.handleSubmit(handleEditInfluencer)}
      >
        <div className="flex flex-col w-full gap-4 ">
          <FormPhoneInput
            label="New Mobile Number"
            mobileFormName="mobileNo"
            required
            formDescription={`Old mobile number: ${defaultValues?.mobileNo ?? ""}`}
          />
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
            <FormTextInput
              formName="location"
              label="Influencer Location"
              placeholder="Enter location"
            />
          </div>
          <div className="flex w-full gap-3 pt-6 border-t-2 mt-3">
            <CancelButton />
            <ActionButton onClick={form.handleSubmit(handleEditInfluencer)}>
              Confirm all edits
            </ActionButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditInfluencer;
