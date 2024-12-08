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
});
const keyDetailsSchema = z.object({
  aadharNumber: z.string(),
  PAN: z.string().optional(),
});
const bankDetailsSchema = z.object({
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
  IFSC: z.string().optional().optional(),
});
const ProfileInformation = () => {
  const userstore = useAppSelector(User);
  const [user, setEmployee] = useState<any>(null);
  const router = useRouter();
  const [upload, setUpload] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const userRole = useAppSelector(UserRole);
  const dispatch = useAppDispatch();
  const [editable, setEditor] = useState(false);
  const [keyDetailseditable, setKeyDetailsEditor] = useState(false);
  const [bsnkDetailseditable, setBankDetailsEditor] = useState(false);

  const adminForm = useForm<z.infer<typeof adminProfileSchema>>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {},
  });
  const employeeForm = useForm<z.infer<typeof employeeProfileSchema>>({
    resolver: zodResolver(employeeProfileSchema),
    defaultValues: {},
  });
  const keyDetailsForm = useForm<z.infer<typeof keyDetailsSchema>>({
    resolver: zodResolver(keyDetailsSchema),
    defaultValues: {},
  });
  const bankDetailsForm = useForm<z.infer<typeof bankDetailsSchema>>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {},
  });
  const uploadForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });

  useEffect(() => {
    const userProfileGetter = async () => {
      let userProfile: any;
      userProfile = await GET("user");

      if (userProfile) {
        setEmployee(userProfile.data);

        if (userRole === "employee") {
          keyDetailsForm.reset({
            aadharNumber: userProfile.data.profile?.aadharNo
              ? userProfile.data.profile?.aadharNo
              : undefined,
            PAN: userProfile.data.panNo ? userProfile.data.panNo : undefined,
          });

          employeeForm.reset({
            firstName: userProfile.data.profile?.firstName,
            lastName: userProfile.data.profile?.lastName,
            mobileNo: userProfile.data.profile?.mobileNo,
            email: userProfile.data.profile?.user.email,
          });
          bankDetailsForm.reset({
            bankName: userProfile.data.profile?.bankName,
            accountNumber: userProfile.data.profile?.bankAccountNumber,
            accountHolderName: userProfile.data.profile?.bankAccountHolderName,
            IFSC: userProfile.data.profile?.bankIfscCode,
          });
        }
        if (userRole === "admin") {
          adminForm.reset({
            firstName: userProfile.data.profile.firstName,
            lastName: userProfile.data.profile.lastName,
            mobileNo: userProfile.data.profile.mobileNo,
            email: userProfile.data.email,
          });
        }
      }
    };

    userProfileGetter();
  }, [userRole]);
  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }
  const handleAdminProfileUpdate = async (data: z.infer<typeof adminProfileSchema>) => {
    const senddata = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
    };
    const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setEditor(!editable);
    window.location.reload();
  };
  const handleEmployeeProfileUpdate = async (data: z.infer<typeof employeeProfileSchema>) => {
    const senddata = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
    };
    const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    setEditor(!editable);
    window.location.reload();
  };
  const handleKeyDetailsFormUpdate = async (data: z.infer<typeof keyDetailsSchema>) => {
    let senddata: any;
    senddata = {
      panNo: data.PAN,
      aadharNo: data.aadharNumber,
    };
    let response: any;

    response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    window.location.reload();
  };
  const handleBankDetailsFormUpdate = async (data: z.infer<typeof bankDetailsSchema>) => {
    let senddata: any;
    senddata = {
      bankName: data.bankName,
      bankAccountNumber: data.accountNumber,
      bankAccountHolderName: data.accountHolderName,
      bankIfscCode: data.IFSC,
    };
    let response: any;

    response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    window.location.reload();
  };
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return; // Return if no file is selected
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
    if (url) {
      let data;

      data = {
        profilePic: url,
      };

      const response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, data);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        dispatch(
          setUserProfile({
            profilePic: url,
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
              {userstore?.profile?.profilePic ? (
                <AvatarImage
                  className="rounded-full border-4 w-full h-full shado object-cover"
                  src={userstore?.profile?.profilePic}
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
                Click to edit personal information
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
                <form action="" onSubmit={employeeForm.handleSubmit(handleEmployeeProfileUpdate)}>
                  <div className="flex flex-col w-[660px] gap-4 ">
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="firstName"
                        label="First Name"
                        disabled={!editable}
                        placeholder="Enter first name"
                        required
                      />
                      <FormTextInput
                        formName="lastName"
                        disabled={!editable}
                        label="Last Name"
                        placeholder="Enter last name"
                        required
                      />
                    </div>

                    <div className="flex gap-5  w-full">
                      <FormPhoneInput disabled mobileFormName="mobileNo" required />
                      <FormTextInput
                        formName="email"
                        label="Email"
                        disabled
                        placeholder="Enter email"
                        required
                        leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <Button className={editable ? "hidden" : ""} onClick={() => setEditor(!editable)}>
                Click to edit personal information
              </Button>
              <Button
                className={editable ? "" : "hidden"}
                onClick={employeeForm.handleSubmit(handleEmployeeProfileUpdate)}
              >
                Submit changes
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
      ) : (
        <></>
      )}
      {user && userRole != "admin" ? (
        <div className="flex flex-col gap-6 w-[660px]">
          <div className="w-full text-display-xxs font-heading ">Key details</div>
          <Form {...keyDetailsForm}>
            <form action="" onSubmit={keyDetailsForm.handleSubmit(handleKeyDetailsFormUpdate)}>
              <div className="flex gap-5  w-full">
                <FormTextInput
                  formName="aadharNumber"
                  label="Aadhar number"
                  placeholder=""
                  required
                  disabled={!keyDetailseditable}
                />
                <FormTextInput
                  formName="PAN"
                  label="PAN"
                  placeholder=""
                  disabled={!keyDetailseditable}
                />
              </div>
            </form>
          </Form>
          <Button
            className={keyDetailseditable ? "hidden" : ""}
            onClick={() => setKeyDetailsEditor(!keyDetailseditable)}
          >
            Click to edit key details
          </Button>
          <div className="flex flex-col w-full gap-5">
            <Button
              className={keyDetailseditable ? "" : "hidden"}
              onClick={keyDetailsForm.handleSubmit(handleKeyDetailsFormUpdate)}
            >
              Submit changes
            </Button>
            <Button
              className={cn(
                "bg-white border-slate-800 border-2",
                keyDetailseditable ? "" : "hidden",
              )}
              onClick={() => setKeyDetailsEditor(!keyDetailseditable)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {user && userRole != "admin" ? (
        <div className="flex flex-col w-[660px] gap-6">
          <div className="w-full text-display-xxs font-heading ">Bank A/C Details</div>
          <Form {...bankDetailsForm}>
            <form action="" onSubmit={bankDetailsForm.handleSubmit(handleBankDetailsFormUpdate)}>
              <div className="flex gap-5  w-full">
                <FormTextInput
                  formName="bankName"
                  label="Bank name"
                  placeholder=""
                  disabled={!bsnkDetailseditable}
                />
                <FormTextInput
                  formName="accountNumber"
                  label="Account number"
                  placeholder=""
                  disabled={!bsnkDetailseditable}
                />
              </div>
              <div className="flex gap-5  w-full">
                <FormTextInput
                  formName="accountHolderName"
                  label="Account holder name"
                  placeholder=""
                  disabled={!bsnkDetailseditable}
                />

                <FormTextInput
                  formName="IFSC"
                  label="IFSC code"
                  placeholder=""
                  disabled={!bsnkDetailseditable}
                />
              </div>
            </form>
          </Form>
          <Button
            className={bsnkDetailseditable ? "hidden" : ""}
            onClick={() => setBankDetailsEditor(!bsnkDetailseditable)}
          >
            Click to edit bank details
          </Button>
          <div className="flex flex-col w-full gap-5">
            <Button
              className={bsnkDetailseditable ? "" : "hidden"}
              onClick={bankDetailsForm.handleSubmit(handleBankDetailsFormUpdate)}
            >
              Submit changes
            </Button>
            <Button
              className={cn(
                "bg-white border-slate-800 border-2",
                bsnkDetailseditable ? "" : "hidden",
              )}
              onClick={() => setBankDetailsEditor(!bsnkDetailseditable)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileInformation;
