"use client";
import { getAuthorizedRequest } from "@/lib/config/axios";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  PencilSquareIcon,
  EnvelopeIcon,
  XMarkIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import { UserRole } from "@/store/UserSlice";
import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import { Form } from "@/components/ui/form";
import { mobileNoSchema } from "@/lib/validationSchema";
import FormUploadInput from "@/components/ui/form/form-upload-input";
import { size } from "lodash";
const MAX_FILE_SIZE = 50000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const adminProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNo: mobileNoSchema,
});
const uploadImageSchema = z.object({
  image: z.string(),
});
const employeeProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNo: mobileNoSchema,
  Designation: z.string(),
});

const ProfileInformation = () => {
  const [profile, setProfile] = useState<any>({});
  const [upload, setUpload] = useState<boolean>(false);
  const userRole = useSelector(UserRole);
  const [editable, setEditor] = useState(false);
  console.log("profile", profile);
  useEffect(() => {
    const fetchInformation = async () => {
      const Information = await getAuthorizedRequest("admin/profile");
      console.log(Information);
      setProfile(Information.data);
    };
    fetchInformation();
  }, []);
  const adminForm = useForm<z.infer<typeof adminProfileSchema>>({
    resolver: zodResolver(adminProfileSchema),
  });
  const employeeForm = useForm<z.infer<typeof employeeProfileSchema>>({
    resolver: zodResolver(employeeProfileSchema),
  });
  const uploadForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });
  const handleFormSubmit = async (data: z.infer<typeof uploadImageSchema>) => {
    console.log(data.image);
  };
  return (
    <div className=" flex flex-col gap-8">
      <div className="w-full text-display-xxs font-heading">Personal Information</div>
      <div className="flex gap-10">
        <Avatar className=" relative w-40 h-40 bg-slate-100 rounded-full ">
          {!profile.profilePic ? (
            <AvatarImage
              className="rounded-full border-4 w-full h-full shado"
              src="https://github.com/shadcn.png"
            />
          ) : (
            <div className="flex w-full h-full items-center justify-center">BV</div>
          )}

          <div
            onClick={() => {
              setUpload(!upload);
            }}
            className="cursor-pointer flex pl-2 pb-2 pt-1.5 pr-1.5 items-center justify-center border-2 bg-white rounded-full shadow-lg absolute right-2 bottom-0"
          >
            {upload ? (
              <XMarkIcon className="text-[#0F172A] w-5 h-5" />
            ) : (
              <PencilSquareIcon className="text-[#0F172A] w-5 h-5" />
            )}
          </div>
        </Avatar>
        {userRole === "admin" ? (
          <div className="flex flex-col gap-6">
            <Form {...adminForm}>
              <form action="">
                <div className="flex flex-col w-[660px] gap-4 ">
                  <div className="flex gap-5  w-full">
                    <FormTextInput
                      formName="firstName"
                      label="First Name"
                      defaultValue={profile.firstName}
                      //   disabled={!editable}
                      placeholder="Enter first name"
                      required
                    />
                    <FormTextInput
                      formName="lastName"
                      defaultValue={profile.lastName}
                      //   disabled={!editable}
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <div className="flex gap-5  w-full">
                    <FormPhoneInput
                      defaultValue={profile.mobileNo}
                      //   disabled={!editable}
                      mobileFormName="mobileNo"
                      required
                    />
                    <FormTextInput
                      formName="email"
                      label="Email"
                      defaultValue={profile.user.email}
                      //   disabled={!editable}
                      placeholder="Enter email"
                      required
                      leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                    />
                  </div>
                </div>
              </form>
            </Form>
            {upload ? (
              <Form {...uploadForm}>
                <form action="">
                  <FormUploadInput
                    defaultValue={profile.profilePic}
                    formName="image"
                    label=""
                    placeholder=""
                    leftIcon={<ArrowUpOnSquareIcon className="text-[#0F172A] w-5 h-5" />}
                  />
                </form>
                <ArrowUpOnSquareIcon
                  onClick={uploadForm.handleSubmit(handleFormSubmit)}
                  className="text-[#0F172A] cursor-pointer  w-5 h-5"
                />
              </Form>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            <Form {...employeeForm}>
              <form>
                <div className="flex flex-col w-[660px] gap-4 ">
                  <div className="flex gap-5  w-full">
                    <FormTextInput
                      formName="firstName"
                      label="First Name"
                      defaultValue={profile.firstName}
                      //   disabled={!editable}
                      placeholder="Enter first name"
                      required
                    />
                    <FormTextInput
                      formName="lastName"
                      defaultValue={profile.lastName}
                      //   disabled={!editable}
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <FormTextInput
                    formName="email"
                    label="Email"
                    defaultValue={profile.user.email}
                    disabled={!editable}
                    placeholder="Enter email"
                    required
                    leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                  />

                  <div className="flex gap-5  w-full">
                    <FormPhoneInput
                      defaultValue={profile.mobileNo}
                      disabled={!editable}
                      mobileFormName="mobileNo"
                      required
                    />
                    <FormTextInput
                      formName="lastName"
                      defaultValue={profile.lastName}
                      disabled={!editable}
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInformation;
