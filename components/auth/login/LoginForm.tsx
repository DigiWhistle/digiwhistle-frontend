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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/config/store";
import { postRequest } from "@/lib/config/axios";
import { cn } from "@/lib/utils";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/config/firebase";
import { toast } from "sonner";
import OTPLogin from "./OTPLogin";
import { IUser, User, UserRole, setUser } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ILoginResponse } from "@/types/auth/response-types";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginForm = ({ className }: { className?: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema) });

  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
      const response: any = await signInWithEmailAndPassword(auth, data.email, data.password);
      const googleData = {
        idToken: response._tokenResponse.idToken,
      };

      await handleBackendLogin(googleData);

      form.reset();
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credentials");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleGoogleLogIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response: any = await signInWithPopup(auth, provider);
      const googleData = {
        idToken: response._tokenResponse.idToken,
      };

      await handleBackendLogin(googleData);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid credentials");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleBackendLogin = async (googleData: { idToken: string }) => {
    const result = await postRequest<ILoginResponse>("auth/login", googleData);

    if (result.data) {
      toast.success(result.message);

      dispatch(setUser(result.data.user));

      if (!result.data.user.isOnBoarded) {
        if (result.data.user.role === "admin" || result.data.user.role === "employee") {
          router.push("/sign-up/admin");
        } else if (
          result.data.user.role === "influencer" ||
          result.data.user.role === "brand" ||
          result.data.user.role === "agency"
        ) {
          router.push("/onboarding");
        }
      }
      if (!result.data.user.isVerified) {
        toast.info("Please wait for admin approval");
      } else {
        setCookie("token", result.data.token);
        setCookie("role", result.data.user.role);

        if (result.data.user.role === "admin" || result.data.user.role === "employee") {
          router.push("/admin/dashboard");
        } else if (
          result.data.user.role === "influencer" ||
          result.data.user.role === "brand" ||
          result.data.user.role === "agency"
        ) {
          router.push("/user/dashboard");
        }
      }
    } else if (result.error) toast.error(result.error);
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-display-xs">Log In</CardTitle>
        <CardDescription className="text-body-lg-medium">
          New User ?{" "}
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
        <Button className="w-full " onClick={() => handleGoogleLogIn()}>
          Login with Google ID
        </Button>
        <div className="relative inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-4 bg-gray-200 border-0 " />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 text-sm">OR</div>
        </div>
      </CardContent>
      <OTPLogin />
    </Card>
  );
};

export default LoginForm;
