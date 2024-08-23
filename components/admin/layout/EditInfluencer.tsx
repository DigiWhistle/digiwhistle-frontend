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
import {
  getAuthorizedRequest,
  patchAuthorizedRequest,
  postAuthorizedRequest,
} from "@/lib/config/axios";
import { toast } from "sonner";
import { Influencer } from "@/types/admin/influencer";

const EditInfluencerSchema = z.object({
  instagramURL: instagramURL,
  twitterURL: twitterURL,
  youtubeURL: youtubeURL,
  mobileNo: mobileNoSchema,
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
      const response = await getAuthorizedRequest(`influencer/profile/${influencer.profileId}`);
      if (response.error) {
        toast.error(response.error);
        setDefaultValues({
          instagramURL: "",
          twitterURL: "",
          youtubeURL: "",
          mobileNo: "",
        });
      } else {
        const data = response.data as z.infer<typeof EditInfluencerSchema>;
        setDefaultValues(data);
        form.setValue("mobileNo", data.mobileNo);
        form.setValue("instagramURL", data.instagramURL || undefined);
        form.setValue("twitterURL", data.twitterURL || undefined);
        form.setValue("youtubeURL", data.youtubeURL || undefined);
      }
    };
    fetchDefaultValues();
  }, []);

  const handleEditInfluencer = async (data: z.infer<typeof EditInfluencerSchema>) => {
    const response = await patchAuthorizedRequest(`influencer/profile/${influencer.profileId}`, {
      mobileNo: data.mobileNo,
      twitterURL: data.twitterURL || undefined,
      instagramURL: data.instagramURL || undefined,
      youtubeURL: data.youtubeURL || undefined,
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
        onSubmit={form.handleSubmit(handleEditInfluencer)}
      >
        <div className="flex flex-col w-full gap-4 ">
          <FormPhoneInput label="New Mobile Number" mobileFormName="mobileNo" required />
          <div className="w-full space-y-4">
            <FormTextInput
              formName="instagramURL"
              label="New Instagram Profile Link"
              placeholder="https://www.instagram.com/username/"
              leftIcon={<LinkIcon className="text-gray-557 w-5 h-5" />}
              formDescription={`Old profile link: ${defaultValues?.instagramURL ?? ""}`}
            />
            <FormTextInput
              formName="youtubeURL"
              label="New Youtube Profile Link"
              placeholder="https://www.youtube.com/username/"
              leftIcon={<LinkIcon className="text-gray-557 w-5 h-5" />}
              formDescription={`Old profile link: ${defaultValues?.youtubeURL ?? ""}`}
            />
            <FormTextInput
              formName="twitterURL"
              label="New X Profile Link"
              placeholder="https://www.x.com/username/"
              leftIcon={<LinkIcon className="text-gray-557 w-5 h-5" />}
              formDescription={`Old profile link: ${defaultValues?.twitterURL ?? ""}`}
            />
          </div>
          <div className="flex w-full gap-3 pt-6 border-t-2 mt-3">
            <CancelButton />
            <ActionButton onClick={form.handleSubmit(handleEditInfluencer)}>
              Add Influencer
            </ActionButton>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EditInfluencer;
