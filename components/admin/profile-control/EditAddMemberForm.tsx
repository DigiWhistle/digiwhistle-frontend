"use client";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FormPasswordInput from "@/components/ui/form/form-password-input";
import FormRadioGroup from "@/components/ui/form/form-radio-group";
import { Button } from "@/components/ui/button";
import { PATCH, postRequest } from "@/lib/config/axios";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { setUser, setUserProfile, User } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { IAdminResponse, ISignUpResponse } from "@/types/auth/response-types";
import { useAppDispatch } from "@/lib/config/store";
import { isValidPhoneNumber } from "react-phone-number-input";
import { mobileNoSchema, termsCheckSchema } from "@/lib/validationSchema";
import FormSelectInput from "@/components/ui/form/form-select-input";
import { ProfileControl } from "@/types/admin/ProfileControl";
import { POST } from "@/lib/config/axios";
const EditmemberAddSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobileNo: mobileNoSchema,
  designation: z.string().optional(),
});
const selectItems = ["Talent Manager", "Account Manager", "PR Manager", "Brand Manager"];
const EditAddMemberForm = ({
  className,
  EditData,
}: {
  className?: string;
  EditData: ProfileControl;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof EditmemberAddSchema>>({
    resolver: zodResolver(EditmemberAddSchema),
    defaultValues: {
      firstName: EditData.firstName,
      lastName: EditData.lastName,
      mobileNo: EditData.mobileNo ? EditData.mobileNo : undefined,
      email: EditData.email,
      designation: EditData.designation,
    },
  });
  const handleForm = async (data: z.infer<typeof EditmemberAddSchema>, e: any) => {
    e.preventDefault();

    let sendInfo;

    sendInfo = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNo: data.mobileNo,
      designation: data.designation,
      profilePic: "string",
    };
    const response = await PATCH(`employee/profile/${EditData.profileId}`, sendInfo);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      window.location.reload();
    }
  };
  return (
    <div>
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col w-full gap-4 ">
            <div className="flex gap-3  w-full">
              <FormTextInput
                formName="firstName"
                label="First Name"
                placeholder="Enter first name"
                required
              />
              <FormTextInput formName="lastName" label="Last Name" placeholder="Enter last name" />
            </div>
            <div className="flex gap-3  w-full">
              <FormPhoneInput mobileFormName="mobileNo" required />

              <FormTextInput
                formName="email"
                label="Email"
                placeholder="Enter email"
                required
                disabled
                leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
              />
            </div>

            <FormSelectInput
              selectItems={selectItems}
              formName="designation"
              placeholder="Select Designation"
              label="Employee’s designation"
              required
            />
          </div>
        </form>
      </Form>
      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>Confirm</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default EditAddMemberForm;
