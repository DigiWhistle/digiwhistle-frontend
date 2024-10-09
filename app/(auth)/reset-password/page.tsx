"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormPasswordInput from "@/components/ui/form/form-password-input";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { postRequest } from "@/lib/config/axios";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const params = useSearchParams();
  const paramsRole = params.get("oobCode") as string;

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handlePasswordSignUp = async (data: z.infer<typeof resetPasswordSchema>) => {
    if (!paramsRole) {
      toast.error("Invalid Link");
      return;
    } else {
      const response = await postRequest("auth/reset/password", {
        oobCode: paramsRole,
        password: data.password,
      });
      if (response.message) {
        toast.success(response.message);
        form.reset();
      } else if (response.error) {
        toast.error(response.error);
      }
    }
  };
  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle className="text-display-xs">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col mt-4 gap-6 items-center w-full"
            onSubmit={form.handleSubmit(handlePasswordSignUp)}
          >
            <hr className="w-full mb-8" />

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
            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
