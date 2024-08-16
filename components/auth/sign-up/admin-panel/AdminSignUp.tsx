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
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { toast } from "sonner";
import { setUser, setUserProfile, User } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { IAdminResponse, ISignUpResponse } from "@/types/auth/response-types";
import { useAppDispatch } from "@/lib/config/store";
import { isValidPhoneNumber } from "react-phone-number-input";
import { mobileNoSchema, termsCheckSchema } from "@/lib/validationSchema";
import { ADMIN_DEFAULT_ROUTE } from "@/lib/constants";

enum Role {
  Admin = "admin",
  Employee = "employee",
}

const adminSignUpSchema = z
  .object({
    role: z.nativeEnum(Role),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
    mobileNo: mobileNoSchema,
    termsCheck: termsCheckSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AdminSignUp = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof adminSignUpSchema>>({
    resolver: zodResolver(adminSignUpSchema),
  });

  const handleSignUp = async (data: z.infer<typeof adminSignUpSchema>) => {
    try {
      const response: any = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const googleData = {
        idToken: response._tokenResponse.idToken,
        role: data.role,
      };

      const result = await postRequest<ISignUpResponse>("auth/signup", googleData);
      if (result.data) {
        const respond = await postRequest<IAdminResponse>(`${data.role}/profile`, {
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNo: data.mobileNo,
          user: result.data.id,
        });
        if (respond.data) {
          const user_info = {
            id: result.data.id,
            email: result.data.email,
            role: result.data.role,
            isOnBoarded: false,
            isVerified: result.data.isVerified,
            isPaused: result.data.isPaused,
            profile: respond.data,
          };

          dispatch(setUser(user_info));

          if (!result.data.isVerified) {
            toast.info("Please wait for admin approval");
          } else {
            router.push(ADMIN_DEFAULT_ROUTE);
          }
          toast.success(result.message);
        } else if (respond.error) {
          toast.error(respond.error);
        }

        form.reset();
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists with this email. Please sign in");
      } else {
        toast.error(error.message);
      }
    }
  };
  const handleGoogleSignUp = async () => {
    if (!form.getValues("role")) {
      form.setError("role", { message: "Select the role" }, { shouldFocus: true });
      toast.error("Select a Role first");
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      const response: any = await signInWithPopup(auth, provider);
      const googleData = {
        idToken: response._tokenResponse.idToken,
        role: form.getValues("role"),
      };

      const result = await postRequest<ISignUpResponse>("auth/signup", googleData);
      if (result.data) {
        const user_info = {
          id: result.data.id,
          email: result.data.email,
          role: result.data.role,
          isOnBoarded: false,
          isVerified: result.data.isVerified,
        };
        dispatch(setUser(user_info));
        toast.success(result.message);
        if (!result.data.isVerified) {
          toast.info("Please wait for admin approval");
        } else {
          router.push(ADMIN_DEFAULT_ROUTE);
        }
        form.reset();
      } else if (result.error) {
        toast.error(result.error);
        return null;
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists with this email. Please sign in");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-display-xs">Sign Up</CardTitle>
        <CardDescription className="text-body-lg-medium">
          Already a user ?{" "}
          <Link href={"/login"} className="underline text-link">
            Login here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-6 mt-4 items-center w-full"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <FormRadioGroup
              formName="role"
              label="Select your role"
              radioOptions={[
                { label: "Admin", value: "admin" },
                { label: "Employee", value: "employee" },
              ]}
              triggerOnChange
            />
            <hr className="w-full" />
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
                />
              </div>
              <div className="w-full space-y-4">
                <FormTextInput
                  formName="email"
                  label="Email"
                  placeholder="Enter email"
                  required
                  leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <div className="flex gap-3">
                  <FormPasswordInput
                    formName="password"
                    label="Password"
                    placeholder="Enter password"
                    required
                    leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                  />
                  <FormPasswordInput
                    formName="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter password"
                    required
                    leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                    triggerOnInput
                  />
                </div>
                {/* <FormTextInput
                  formName="mobileNo"
                  label="Enter Mobile Number"
                  placeholder="Enter number"
                  required
                  type="number"
                  leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                /> */}
                <FormPhoneInput mobileFormName="mobileNo" required />
              </div>
            </div>
            <hr className="w-full" />
            <div className="w-full space-y-2">
              <FormField
                control={form.control}
                name="termsCheck"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0  ">
                    <FormControl>
                      <Checkbox checked={field.value || false} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none ">
                      <FormLabel className="font-normal">
                        I agree to share my data and abide by all the{" "}
                        <span className="underline cursor-pointer">terms and conditions.</span>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
        {/* <Button className="w-full mt-4" onClick={() => handleGoogleSignUp()}>
          Sign up with Google ID
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default AdminSignUp;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
