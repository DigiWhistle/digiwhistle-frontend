"use client";
import { GET, PATCH } from "@/lib/config/axios";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  PencilSquareIcon,
  EnvelopeIcon,
  XMarkIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/react/24/outline";
import { User, UserRole } from "@/store/UserSlice";
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
import { useAppDispatch, useAppSelector } from "@/lib/config/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/config/firebase";
import { Button } from "@/components/ui/button";
import { setUserProfile } from "@/store/UserSlice";
import { AppDispatch } from "@/lib/config/store";
import { getCookie } from "cookies-next";
import { cn } from "@/lib/utils";
import { IBrandResponse } from "@/types/auth/response-types";
const brandProfileSchema = z.object({
  name: z.string().min(1, "First name is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  websiteURL: z.string().url().min(1, "Website url is required"),
  mobileNo: mobileNoSchema,
});
const uploadImageSchema = z.object({
  image: z.string(),
});

const ProfileInformation = () => {
  const [user, setUser] = useState<any>(null);
  const userStore = useAppSelector(User);
  const router = useRouter();
  const [upload, setUpload] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const userRole = useAppSelector(UserRole);
  const dispatch = useAppDispatch();
  const [editable, setEditor] = useState(false);
  const brandForm = useForm<z.infer<typeof brandProfileSchema>>({
    resolver: zodResolver(brandProfileSchema),
    defaultValues: {},
  });
  useEffect(() => {
    const userProfileGetter = async () => {
      const userProfile: any = await GET("user");

      console.log("userr", userProfile);
      if (userProfile) {
        setUser(userProfile.data);
        brandForm.reset({
          name: userProfile.data.profile.name,
          firstName: userProfile.data.profile.firstName,
          lastName: userProfile.data.profile.lastName,
          websiteURL: userProfile.data.profile.websiteURL,
          mobileNo: userProfile.data.profile.mobileNo,
          email: userProfile.data.email,
        });
      }
    };
    userProfileGetter();
  }, []);
  // const employeeForm = useForm<z.infer<typeof employeeProfileSchema>>({
  //   resolver: zodResolver(employeeProfileSchema),
  //   defaultValues: {
  //     firstName: user?.profile?.firstName,
  //     lastName: user?.profile?.lastName,
  //     email: user?.email,
  //     mobileNo: user?.profile?.mobileNo,
  //     Designation: user?.profile?.designation,
  //   },
  // });
  const uploadForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });

  const handleBrandProfileUpdate = async (data: z.infer<typeof brandProfileSchema>) => {
    const senddata = {
      name: data.name,
      pocFirstName: data.firstName,
      pocLastName: data.lastName,
      mobileNo: data.mobileNo,
      profilePic: user.profile?.profilePic,
      websiteURL: data.websiteURL,
    };
    console.log("senddata", senddata);
    const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    // let response={error:null,message:"done"};
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      dispatch(
        setUserProfile({
          name: data.name,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          profilePic: user.profile.profilePic,
          websiteURL: data.websiteURL,
        }),
      );
    }
    setEditor(!editable);
  };
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return; // Return if no file is selected
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
    // console.log(url, user.profile?.id, url);
    // console.log("this is url:", url);
    if (url) {
      let data;
      if (userRole === "brand") {
        data = {
          name: user.profile.name,
          pocFirstName: user.profile.firstName,
          pocLastName: user.profile.lastName,
          websiteURL: user.profile.websiteURL,
          mobileNo: user.profile.mobileNo,
          profilePic: url,
        };
      } else {
        data = {};
      }
      // console.log("this is url:",url)
      // console.log("this is data:", data);
      const response = await PATCH(`${user.role}/profile/${user.profile.id}`, data);
      // let response={error:null,message:"done"};

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);

        dispatch(
          setUserProfile({
            name: user.profile.name,
            firstName: user.profile?.firstName,
            lastName: user.profile?.lastName,
            mobileNo: user.profile?.mobileNo,
            profilePic: url,
            websiteURL: user.profile.websiteURL,
          }),
        );
      }
      uploadForm.reset();
      setUpload(!upload);
    }
  };

  return (
    <div className=" flex flex-col gap-8">
      <div className="w-full text-display-xxs font-heading">Personal Information</div>
      {user ? (
        <div className="flex gap-10">
          <div className="flex flex-col gap-8 items-center">
            <Avatar className=" relative w-40 h-40 bg-slate-100 rounded-full ">
              {userStore?.profile?.profilePic ? (
                <AvatarImage
                  className="rounded-full border-4 w-full h-full shado object-cover"
                  src={userStore.profile.profilePic}
                />
              ) : (
                <div className="flex w-full h-full items-center justify-center">BV</div>
              )}

              <div
                onClick={() => {
                  setUpload(!upload);
                }}
                className={cn(
                  "cursor-pointer flex px-2 py-2  items-center justify-center border-2 bg-white rounded-full shadow-lg absolute right-2 bottom-0",
                  !upload ? "pt-1.5 pr-1.5" : "px-1.5 py-1.5",
                )}
              >
                {upload ? (
                  <XMarkIcon className="text-[#0F172A] w-5 h-5" />
                ) : (
                  <PencilSquareIcon className="text-[#0F172A] w-5 h-5" />
                )}
              </div>
            </Avatar>
            {upload ? (
              <div className="flex flex-col gap-3">
                <Form {...uploadForm}>
                  <form action="" onSubmit={uploadForm.handleSubmit(handleFormSubmit)}>
                    <FormUploadInput
                      className="w-40"
                      setFile={setFile}
                      inputProps={{
                        onKeyDown: e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            uploadForm.handleSubmit(handleFormSubmit);
                          }
                        },
                      }}
                      formName="image"
                      label=""
                      placeholder=""
                      leftIcon={<ArrowUpOnSquareIcon className="text-[#0F172A] w-5 h-5" />}
                    />
                  </form>
                </Form>
                <Button className="w-full h-9" onClick={handleFormSubmit}>
                  Upload
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
          {userRole === "brand" ? (
            <div className="flex flex-col gap-4">
              <Form {...brandForm}>
                <form action="" onSubmit={brandForm.handleSubmit(handleBrandProfileUpdate)}>
                  <div className="flex flex-col w-[660px] gap-4 ">
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="firstName"
                        label="POC First Name"
                        placeholder="Enter first name"
                        disabled={!editable}
                        required
                      />
                      <FormTextInput
                        formName="lastName"
                        label="POC Last Name"
                        placeholder="Enter last name"
                        disabled={!editable}
                        required
                      />
                    </div>
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="name"
                        label="Brand Name"
                        placeholder="Enter first name"
                        disabled={!editable}
                        required
                      />
                      <FormTextInput
                        formName="websiteURL"
                        label="Brand Website Link"
                        placeholder="Enter last name"
                        disabled={!editable}
                        required
                      />
                    </div>
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="email"
                        label="POC Email Id"
                        placeholder="Enter email"
                        required
                        disabled
                        leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                      />
                      <FormPhoneInput
                        label="POC Mobile Number"
                        mobileFormName="mobileNo"
                        required
                        disabled={!editable}
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <Button className={editable ? "hidden" : ""} onClick={() => setEditor(!editable)}>
                Edit Details
              </Button>
              <Button
                className={editable ? "" : "hidden"}
                onClick={brandForm.handleSubmit(handleBrandProfileUpdate)}
              >
                Submit
              </Button>
              <Button
                className={cn("bg-white border-slate-800 border-2", editable ? "" : "hidden")}
                onClick={() => setEditor(!editable)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileInformation;
