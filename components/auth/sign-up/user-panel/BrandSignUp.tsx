"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { LinkIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
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
import { IBrandResponse } from "@/types/auth/response-types";
import { useAppDispatch } from "@/lib/config/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUserProfile, User } from "@/store/UserSlice";
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import { mobileNoSchema, termsCheckSchema } from "@/lib/validationSchema";

const BrandOnboardingSchema = z.object({
  name: z.string().min(1, "First name is required"),
  pocFirstName: z.string().min(1, "First name is required"),
  pocLastName: z.string().optional(),
  websiteURL: z
    .string()
    .optional()
    .refine(
      value => !value || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value),
      {
        message: "Please provide a valid URL",
      },
    ),
  mobileNo: mobileNoSchema,
  termsCheck: termsCheckSchema,
});

const BrandSignUp = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(User);
  const router = useRouter();

  const form = useForm<z.infer<typeof BrandOnboardingSchema>>({
    resolver: zodResolver(BrandOnboardingSchema),
  });

  const handleBrandOnboarding = async (data: z.infer<typeof BrandOnboardingSchema>) => {
    const { termsCheck, ...filteredData } = data;

    if (user) {
      const result = await postRequest<IBrandResponse>("brand/profile", {
        ...filteredData,
        user: user.id,
      });
      if (result.data) {
        dispatch(setUserProfile(result.data));

        toast.success(result.message);
        if (!user.isVerified) {
          toast.info("Please wait for admin approval");
        } else {
          router.push("/user/dashboard");
        }

        form.reset();
      } else if (result.error) {
        toast.error(result.error);
      }
    } else {
      toast.error("User not found. Please login first");
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
            onSubmit={form.handleSubmit(handleBrandOnboarding)}
          >
            <div className="flex flex-col w-full gap-4 ">
              <FormTextInput formName="name" label="Brand Name" placeholder="Brand Name" />
              <div className="flex gap-3  w-full">
                <FormTextInput
                  formName="pocFirstName"
                  label="Brand POC First Name"
                  placeholder="Enter first name"
                  required
                />
                <FormTextInput
                  formName="pocLastName"
                  label="Brand POC Last Name"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="w-full space-y-4">
                <FormTextInput
                  formName="websiteURL"
                  label="Brand Website Link"
                  placeholder="https://www.Brand.com"
                  leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <FormPhoneInput mobileFormName="mobileNo" required />
              </div>
            </div>
            <hr className="w-full" />
            <div className="w-full space-y-4">
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
                className="w-full "
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Submit signup request for approval
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BrandSignUp;
