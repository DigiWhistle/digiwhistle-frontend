"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import FormPasswordInput from "@/components/ui/form/form-password-input";
import FormRadioGroup from "@/components/ui/form/form-radio-group";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { postRequest } from "@/lib/config/axios";
import { cn } from "@/lib/utils";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const OtpSchema = z.object({
  otp: z.number(),
});

const LoginForm = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema) });
  const otpForm = useForm<z.infer<typeof OtpSchema>>({ resolver: zodResolver(OtpSchema) });

  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // const response = await postRequest("login", data);
      //  dispatch(setUser(response));
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };
  const handleOtpLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // const response = await postRequest("login", data);
      //  dispatch(setUser(response));
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-display-xs">Log In</CardTitle>
        <CardDescription className="text-body-lg-medium">
          Already a user ?{" "}
          <Link href={"/sign-up"} className="underline text-link">
            Signup here
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-6 items-center w-full"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <hr className="w-full mt-8" />
            <div className="flex flex-col w-full gap-4 ">
              <div className="w-full space-y-4">
                <FormTextInput
                  formName="email"
                  label="Email"
                  placeholder="Enter email"
                  required
                  leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
                />
                <div className="flex flex-col w-full">
                  <FormPasswordInput
                    formName="password"
                    label="Password"
                    placeholder="Enter password"
                    required
                    leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                  />
                  <a href="/reset-password" className=" self-end mt-1">
                    <button type="button" className="text-sm underline">
                      Forgot Password?
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              Login using email id
            </Button>
          </form>
        </Form>
        <Button className="w-full ">Login with Google ID</Button>
        <div className="relative inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-4 bg-gray-200 border-0 " />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 text-sm">OR</div>
        </div>
        {showMobileInput && (
          <Form {...form}>
            <form
              className="flex flex-col gap-6 items-center w-full"
              onSubmit={form.handleSubmit(handleOtpLogin)}
            >
              <div
                className="relative flex flex-col w-full"
                data-aos="zoom-in"
                data-aos-delay={300}
              >
                <button
                  type="button"
                  className={cn(
                    "absolute flex gap-1 items-center text-sm  self-end mt-1 disabled:cursor-not-allowed",
                    showOtpInput ? "text-success" : "underline",
                  )}
                  disabled={showOtpInput}
                  onClick={() => {
                    setShowOtpInput(true);
                  }}
                >
                  {showOtpInput ? "Sent" : "Send OTP"}
                  {showOtpInput && <CheckCircleIcon className=" w-4 h-4" />}
                </button>
                <FormTextInput
                  formName="mobileNumber"
                  label="Mobile Number"
                  placeholder="Enter Number"
                  required
                  leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                />
              </div>
              {showOtpInput && (
                <div className="flex flex-col w-full" data-aos="zoom-in" data-aos-delay={300}>
                  <FormTextInput
                    formName="otp"
                    label="Enter OTP"
                    placeholder="Enter OTP"
                    required
                    leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                  />
                  <button className="text-sm underline self-end mt-1" type="button">
                    resend OTP
                  </button>
                </div>
              )}
              <Button className="w-full ">Login using OTP on Whatsapp</Button>
            </form>
          </Form>
        )}
        {!showMobileInput && (
          <Button className="w-full " onClick={() => setShowMobileInput(true)}>
            Login using OTP on Whatsapp
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginForm;
