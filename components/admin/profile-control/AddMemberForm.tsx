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
import { postRequest } from "@/lib/config/axios";
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

enum Role {
  Admin = "admin",
  Employee = "employee",
}
const adminSignUpSchema = z.object({
  role: z.nativeEnum(Role),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobileNo: mobileNoSchema,
  designation: z.string().optional(),
});

const AddMemberForm = () => {
  return <div>AddMemberForm</div>;
};

export default AddMemberForm;
