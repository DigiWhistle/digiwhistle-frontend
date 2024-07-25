import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import FormTextInput from "@/components/ui/form/form-text-input";
import { Button } from "@/components/ui/button";
import { postRequest } from "@/lib/config/axios";

const OtpSchema = z.object({
  otp: z.number(),
  mobileNo: z
    .number()
    .int()
    .positive()
    .refine(value => value.toString().length === 10, {
      message: "Mobile number must be a 10-digit number",
    }),
});

const OTPLogin = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [enableResend, setEnableResend] = useState(false);

  useEffect(() => {
    if (!enableResend && resendTimer > 0) {
      setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setEnableResend(true);
    }
  }, [resendTimer, enableResend]);

  const form = useForm<z.infer<typeof OtpSchema>>({ resolver: zodResolver(OtpSchema) });

  const handleSendOtp = async () => {
    const mobileNo = form.getValues("mobileNo");
    form.trigger("mobileNo");
    if (!mobileNo || !OtpSchema.shape.mobileNo.safeParse(mobileNo).success) {
      return;
    }

    setLoadingResend(true);

    try {
      const response = await postRequest("auth/generate-mobile-otp", form.getValues("mobileNo"));

      if (!showOtpInput) {
        setShowOtpInput(true);
      }

      toast.success("OTP sent!");
      setEnableResend(false);
      setResendTimer(30);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingResend(false);
    }
  };

  const handleOtpLogin = async (data: z.infer<typeof OtpSchema>) => {
    try {
      const response = await postRequest("auth/verify-mobile-otp", form.getValues);
      //  dispatch(setUser(response));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      form.reset();
    }
  };
  return showMobileInput ? (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 items-center w-full"
        onSubmit={form.handleSubmit(handleOtpLogin)}
      >
        <div className="relative flex flex-col w-full">
          <button
            type="button"
            className={cn(
              "absolute flex gap-1 items-center text-sm  self-end mt-1 disabled:cursor-not-allowed",
              showOtpInput ? "text-success" : "underline",
            )}
            disabled={showOtpInput}
            onClick={handleSendOtp}
          >
            {showOtpInput ? "Sent" : "Send OTP"}
            {showOtpInput && <CheckCircleIcon className=" w-4 h-4" />}
          </button>
          <FormTextInput
            formName="mobileNo"
            label="Mobile Number"
            placeholder="Enter Number"
            required
            type="number"
            leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
          />
        </div>
        {showOtpInput && (
          <div
            className="flex flex-col w-full"
            data-aos="zoom-in"
            data-aos-easing="linear"
            data-aos-duration="100"
          >
            <FormTextInput
              formName="otp"
              label="Enter OTP"
              placeholder="Enter OTP"
              required
              leftIcon={<LockClosedIcon className="text-[#0F172A] w-5 h-5" />}
            />
            <button
              className="text-sm underline self-end mt-1"
              type="button"
              onClick={handleSendOtp}
              disabled={!enableResend}
            >
              <p>
                {enableResend ? (
                  loadingResend ? (
                    <>
                      <span className="loading loading-spinner loading-sm">Sending OTP ...</span>
                    </>
                  ) : (
                    <span>Resend OTP</span>
                  )
                ) : (
                  <span>Resend OTP in {resendTimer} seconds</span>
                )}
              </p>
            </button>
          </div>
        )}
        <Button className="w-full ">Login using OTP on Whatsapp</Button>
      </form>
    </Form>
  ) : (
    <Button className="w-full " onClick={() => setShowMobileInput(true)}>
      Login using OTP on Whatsapp
    </Button>
  );
};

export default OTPLogin;
