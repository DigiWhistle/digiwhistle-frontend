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
  const user = useAppSelector(User);
  const router = useRouter();
  const [upload, setUpload] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const userRole = useAppSelector(UserRole);
  const dispatch = useAppDispatch();
  const [editable, setEditor] = useState(false);

  useEffect(() => {
    const userProfileGetter = async () => {
      const userProfile: any = await GET("employee/profile");

      console.log("userr", userProfile);
    };
    userProfileGetter();
  }, []);
  const adminForm = useForm<z.infer<typeof adminProfileSchema>>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      email: user?.email,
      mobileNo: user?.profile?.mobileNo,
    },
  });
  const employeeForm = useForm<z.infer<typeof employeeProfileSchema>>({
    resolver: zodResolver(employeeProfileSchema),
    defaultValues: {
      firstName: user?.profile?.firstName,
      lastName: user?.profile?.lastName,
      email: user?.email,
      mobileNo: user?.profile?.mobileNo,
      Designation: user?.profile?.designation,
    },
  });
  const uploadForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });
  if (!user) {
    router.push("/login");
    return null;
  }
  const handleAdminProfileUpdate = async (data: z.infer<typeof adminProfileSchema>) => {
    const senddata = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
      profilePic: user.profile?.profilePic,
    };
    const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      dispatch(
        setUserProfile({
          id: user.profile?.id,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          profilePic: user.profile?.profilePic,
          designation: user.profile?.designation,
          user: user.profile?.user,
        }),
      );
    }
    setEditor(!editable);
  };
  const handleEmployeeProfileUpdate = async (data: z.infer<typeof employeeProfileSchema>) => {
    const senddata = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: user.profile?.mobileNo,
      profilePic: user.profile?.profilePic,
      designation: user.profile?.designation,
    };
    const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      dispatch(
        setUserProfile({
          id: user.profile?.id,
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: user.profile?.mobileNo,
          profilePic: user.profile?.profilePic,
          designation: user.profile?.designation,
          user: user.profile?.user,
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
    console.log(url, user.profile?.id, url);
    console.log("this is url:", url);
    if (url) {
      let data;
      if (userRole === "admin") {
        data = {
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
          mobileNo: user.profile?.mobileNo,
          profilePic: url,
        };
      } else {
        data = {
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
          mobileNo: user.profile?.mobileNo,
          profilePic: url,
          designation: user.profile?.designation,
        };
      }
      // console.log("this is url:",url)
      console.log("this is data:", data);
      const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, data);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        dispatch(
          setUserProfile({
            id: user.profile?.id,
            firstName: user.profile?.firstName,
            lastName: user.profile?.lastName,
            mobileNo: user.profile?.mobileNo,
            profilePic: url,
            designation: user.profile?.designation,
            user: user.profile?.user,
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
      <div className="flex gap-10">
        <div className="flex flex-col gap-8 items-center">
          <Avatar className=" relative w-40 h-40 bg-slate-100 rounded-full ">
            {user.profile?.profilePic ? (
              <AvatarImage
                className="rounded-full border-4 w-full h-full shado object-cover"
                src={user.profile?.profilePic}
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
        {userRole === "admin" ? (
          <div className="flex flex-col gap-4">
            <Form {...adminForm}>
              <form action="" onSubmit={adminForm.handleSubmit(handleAdminProfileUpdate)}>
                <div className="flex flex-col w-[660px] gap-4 ">
                  <div className="flex gap-5  w-full">
                    <FormTextInput
                      formName="firstName"
                      label="First Name"
                      placeholder="Enter first name"
                      disabled={!editable}
                      required
                    />
                    <FormTextInput
                      formName="lastName"
                      label="Last Name"
                      placeholder="Enter last name"
                      disabled={!editable}
                      required
                    />
                  </div>
                  <div className="flex gap-5  w-full">
                    <FormPhoneInput mobileFormName="mobileNo" required disabled={!editable} />
                    <FormTextInput
                      formName="email"
                      label="Email"
                      placeholder="Enter email"
                      required
                      disabled
                      leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
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
              onClick={adminForm.handleSubmit(handleAdminProfileUpdate)}
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
          <div className="flex flex-col gap-4">
            <Form {...employeeForm}>
              <form>
                <div className="flex flex-col w-[660px] gap-4 ">
                  <div className="flex gap-5  w-full">
                    <FormTextInput
                      formName="firstName"
                      label="First Name"
                      defaultValue={user.profile?.firstName}
                      disabled={!editable}
                      placeholder="Enter first name"
                      required
                    />
                    <FormTextInput
                      formName="lastName"
                      defaultValue={user.profile?.lastName}
                      disabled={!editable}
                      label="Last Name"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                  <FormTextInput
                    formName="email"
                    label="Email"
                    defaultValue={user.email}
                    disabled
                    placeholder="Enter email"
                    required
                    leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                  />

                  <div className="flex gap-5  w-full">
                    <FormPhoneInput
                      defaultValue={user.profile?.mobileNo}
                      disabled
                      mobileFormName="mobileNo"
                      required
                    />
                    <FormTextInput
                      formName="Designation"
                      defaultValue={user.profile?.designation}
                      disabled
                      label="Designation"
                      placeholder="Enter Designation"
                      required
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
              onClick={employeeForm.handleSubmit(handleEmployeeProfileUpdate)}
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
        )}
      </div>
    </div>
  );
};

export default ProfileInformation;
