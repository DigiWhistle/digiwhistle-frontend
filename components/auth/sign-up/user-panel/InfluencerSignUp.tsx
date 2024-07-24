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

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  Insta_Link: z
    .string()
    .optional()
    .refine(
      value => !value || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/.test(value),
      {
        message: "Please provide a valid Instagram URL",
      },
    ),
  YouTube_Link: z
    .string()
    .optional()
    .refine(
      value =>
        !value ||
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(channel\/|c\/|user\/)?[A-Za-z0-9_-]+|youtu\.be\/[A-Za-z0-9_-]+)(\/.*)?$/.test(
          value,
        ),
      {
        message: "Please provide a valid YouTube URL",
      },
    ),
  X_Link: z
    .string()
    .optional()
    .refine(
      value => !value || /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/.test(value),
      {
        message: "Please provide a valid X (Twitter) URL",
      },
    ),
  mobileNumber: z
    .number()
    .int()
    .positive()
    .refine(value => value.toString().length === 10, {
      message: "Mobile number must be a 10-digit number",
    }),
  termsCheck: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms",
  }),
});

const InfluencerSignUp = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) });

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response: any = null;
      const userDetails = {
        idToken: response._tokenResponse.idToken,
      };

      const result = await postRequest("auth/signup", userDetails);

      toast.success(result.message);
      toast.info("Please wait for admin approval");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
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
                  required
                />
              </div>
              <div className="w-full space-y-4">
                <FormTextInput
                  formName="Insta_Link"
                  label="Instagram Profile Link"
                  placeholder="https://www.instagram.com/username/"
                  leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <FormTextInput
                  formName="Youtube_Link"
                  label="Youtube Profile Link"
                  placeholder="https://www.youtube.com/username/"
                  leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <FormTextInput
                  formName="X_Link"
                  label="X Profile Link"
                  placeholder="https://www.x.com/username/"
                  leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <FormTextInput
                  formName="mobileNumber"
                  label="Enter Mobile Number"
                  placeholder="Enter number"
                  required
                  type="number"
                  leftIcon={<DevicePhoneMobileIcon className="text-[#0F172A] w-5 h-5" />}
                />
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
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
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

export default InfluencerSignUp;
