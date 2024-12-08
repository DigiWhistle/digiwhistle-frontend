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
const brandAndAgencyProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobileNo: mobileNoSchema,
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
});
const uploadImageSchema = z.object({
  image: z.string(),
});
const keyDetailsSchema = z.object({
  aadharNumber: z.string(),
  PAN: z.string().optional(),
  gstin: z.string().optional(),
  MSMENumber: z.string().optional(),
});
const bankDetailsSchema = z.object({
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolderName: z.string().optional(),
  IFSC: z.string().optional(),
});
const UserProfileInformation = () => {
  const [user, setUser] = useState<any>(null);
  const userStore = useAppSelector(User);
  const router = useRouter();
  const [upload, setUpload] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const userRole = useAppSelector(UserRole);
  const dispatch = useAppDispatch();
  const [editable, setEditor] = useState(false);
  const [keyDetailseditable, setKeyDetailsEditor] = useState(false);
  const [bsnkDetailseditable, setBankDetailsEditor] = useState(false);
  const brandForm = useForm<z.infer<typeof brandAndAgencyProfileSchema>>({
    resolver: zodResolver(brandAndAgencyProfileSchema),
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
  useEffect(() => {
    const userProfileGetter = async () => {
      const userProfile: any = await GET("user");

      if (userProfile) {
        setUser(userProfile.data);
        keyDetailsForm.reset({
          aadharNumber: userProfile.data.profile.aadharNo,
          PAN: userProfile.data.profile.panNo ? userProfile.data.profile.panNo : undefined,
          gstin: userProfile.data.profile.gstNo ? userProfile.data.profile.gstNo : undefined,
          MSMENumber: userProfile.data.profile.msmeNo ? userProfile.data.profile.msmeNo : undefined,
        });

        brandForm.reset({
          firstName: userProfile.data.profile.firstName,
          lastName: userProfile.data.profile.lastName,
          mobileNo: userProfile.data.profile.mobileNo,
          email: userProfile.data.email,
          address: userProfile.data.profile.address,
          city: userProfile.data.profile.city,
          state: userProfile.data.profile.state,
          pincode: userProfile.data.profile.pincode,
        });
        if (userRole != "brand") {
          bankDetailsForm.reset({
            bankName: userProfile.data.profile.bankName,
            accountNumber: userProfile.data.profile.bankAccountNumber,
            accountHolderName: userProfile.data.profile.bankAccountHolderName,
            IFSC: userProfile.data.profile.bankIfscCode,
          });
        }
      }
    };
    userProfileGetter();
  }, []);

  const uploadForm = useForm<z.infer<typeof uploadImageSchema>>({
    resolver: zodResolver(uploadImageSchema),
  });
  const handleKeyDetailsFormUpdate = async (data: z.infer<typeof keyDetailsSchema>) => {
    let senddata: any;
    senddata = {
      panNo: data.PAN,
      aadharNo: data.aadharNumber,
      gstNo: data.gstin,
    };
    let response: any;
    if (userRole === "brand") {
      response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, {
        ...senddata,

        msmeNo: data.MSMENumber,
      });
    } else {
      response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, senddata);
    }
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
  const handleBrandProfileUpdate = async (data: z.infer<typeof brandAndAgencyProfileSchema>) => {
    let senddata: any;
    senddata = {
      mobileNo: data.mobileNo,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      address: data.address,
      panNo: user.profile?.panNo,
      aadharNo: user.profile?.aadharNo,
    };
    let response;
    if (userRole === "brand" || userRole === "agency") {
      response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, {
        ...senddata,
        pocFirstName: data.firstName,
        pocLastName: data.lastName,
      });
    } else {
      response = await PATCH(`${userRole}/profile/${user?.profile?.id}`, {
        ...senddata,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
    // let response={error:null,message:"done"};
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      dispatch(
        setUserProfile({
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          profilePic: user.profile.profilePic,
        }),
      );
    }
    setEditor(!editable);
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
      if (userRole === "brand" || userRole === "agency") {
        data = {
          profilePic: url,
        };
      } else {
        data = {};
      }
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
    window.location.reload();
  };

  return (
    <div className=" flex flex-col gap-8">
      <div className="w-full text-display-xxs font-heading">Personal Information</div>
      {/* this is the first profile section */}
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
          {userRole === "brand" || userRole === "agency" || userRole === "influencer" ? (
            <div className="flex flex-col gap-4">
              <Form {...brandForm}>
                <form action="" onSubmit={brandForm.handleSubmit(handleBrandProfileUpdate)}>
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
                      <FormTextInput
                        formName="email"
                        label="Email Id"
                        placeholder="Enter email"
                        required
                        disabled
                        leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                      />
                      <FormPhoneInput
                        label="Mobile Number"
                        mobileFormName="mobileNo"
                        required
                        disabled={!editable}
                      />
                    </div>
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="address"
                        label="Your office address"
                        placeholder=""
                        disabled={!editable}
                        required
                      />
                    </div>
                    <div className="flex gap-5  w-full">
                      <FormTextInput
                        formName="city"
                        label="City"
                        placeholder=""
                        disabled={!editable}
                        required
                      />
                      <FormTextInput
                        formName="state"
                        label="State"
                        placeholder=""
                        disabled={!editable}
                        required
                      />
                      <FormTextInput
                        formName="pincode"
                        label="PIN"
                        placeholder=""
                        disabled={!editable}
                        required
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
                onClick={brandForm.handleSubmit(handleBrandProfileUpdate)}
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
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {/* this is the key details section */}
      {user && userRole != "admin" ? (
        <div className="flex flex-col w-[660px] gap-6">
          <div className="w-full text-display-xxs font-heading ">Key details</div>
          <Form {...keyDetailsForm}>
            <form
              action=""
              className="flex flex-col gap-3"
              onSubmit={keyDetailsForm.handleSubmit(handleKeyDetailsFormUpdate)}
            >
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
              <div className="flex gap-5  w-full">
                {userRole != "employee" ? (
                  <>
                    <FormTextInput
                      formName="gstin"
                      label="GSTIN"
                      placeholder=""
                      disabled={!keyDetailseditable}
                    />
                    {userRole === "brand" ? (
                      <FormTextInput
                        formName="MSMENumber"
                        label="MSME number"
                        placeholder=""
                        disabled={!keyDetailseditable}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
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
      {user && userRole != "brand" ? (
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

export default UserProfileInformation;
