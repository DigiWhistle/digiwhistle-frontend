"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import FormPasswordInput from "@/components/ui/form/form-password-input";
import FormRadioGroup from "@/components/ui/form/form-radio-group";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/config/axios";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
    mobileNumber: z
      .number()
      .int()
      .positive()
      .refine(value => value.toString().length === 10, {
        message: "Mobile number must be a 10-digit number",
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const PanelSignUp = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) });

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
      // await postRequest("signup", data);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-display-s">Sign Up</CardTitle>
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
            className="flex flex-col gap-6 items-center w-full"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <FormRadioGroup
              formName="role"
              label="Select your role"
              radioOptions={[
                { label: "Admin", value: "admin" },
                { label: "Employee", value: "employee" },
              ]}
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
                <FormTextInput
                  formName="mobileNumber"
                  label="Enter Mobile Number"
                  placeholder="Enter number"
                  required
                  type="number"
                  leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
                />
              </div>
            </div>
            <hr className="w-full" />
            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PanelSignUp;
