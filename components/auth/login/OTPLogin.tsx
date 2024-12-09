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
import FormPhoneInput from "@/components/ui/form/form-phone-input";
import { useDispatch } from "react-redux";
import { setUser, setUserProfile } from "@/store/UserSlice";
import { mobileNoSchema } from "@/lib/validationSchema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ADMIN_DEFAULT_ROUTE, USER_DEFAULT_ROUTE } from "@/lib/constants";

const OtpSchema = z.object({
  otp: z.string(),
  mobileNo: mobileNoSchema,
});

const OTPLogin = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [enableResend, setEnableResend] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
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
    const user_info = {
      mobileNo: form.getValues("mobileNo"),
    };
    try {
      const response = await postRequest("auth/otp", user_info);

      if (response.error) {
        toast.error(response.error);
      } else {
        if (!showOtpInput) {
          setShowOtpInput(true);
        }
        toast.success("OTP sent!");
      }

      setEnableResend(false);
      setResendTimer(30);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingResend(false);
    }
  };

  const handleOtpLogin = async (data: z.infer<typeof OtpSchema>) => {
    const user_info = {
      mobileNo: form.getValues("mobileNo"),
      otp: form.getValues("otp"),
    };
    try {
      const response: any = await postRequest("auth/otp/verify", user_info);
      if (response.data) {
        const user_data = {
          id: response.data.user.id,
          role: response.data.user.role,
          email: response.data.user.email,
          isOnBoarded: response.data.user.isOnBoarded,
          isVerified: response.data.user.profile.user.isVerified,
          isPaused: response.data.user.profile.user.isPaused,
        };

        if (!user_data.isOnBoarded) {
          if (user_data.role === "admin" || user_data.role === "employee") {
            router.push("/sign-up/admin");
          } else if (
            user_data.role === "influencer" ||
            user_data.role === "brand" ||
            user_data.role === "agency"
          ) {
            router.push("/onboarding");
          }
        } else if (!user_data.isVerified) {
          toast.info("Please wait for admin approval");
        } else {
          setCookie("token", response.data.token);
          setCookie("role", user_data.role);

          if (user_data.role === "admin" || user_data.role === "employee") {
            router.push(ADMIN_DEFAULT_ROUTE);
          } else if (
            user_data.role === "influencer" ||
            user_data.role === "brand" ||
            user_data.role === "agency"
          ) {
            router.push(USER_DEFAULT_ROUTE);
          }
        }
        toast.success("Log In Successfully");
        dispatch(setUser(user_data));
        dispatch(setUserProfile(response.data.user.profile));
      } else {
        toast.error(response.error);
      }
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
          <FormPhoneInput mobileFormName="mobileNo" required />
        </div>
        {showOtpInput && (
          <>
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
            <button
              type="submit"
              className="w-full border rounded-md bg-white h-12 flex items-center justify-center gap-4 hover:opacity-90"
            >
              <Image src="/assets/icons/whatsapp.svg" alt="whatsapp icon" width={25} height={25} />
              Sign in with Whatsapp
            </button>
          </>
        )}
      </form>
    </Form>
  ) : (
    <button
      className="w-full border rounded-md bg-white h-12 flex items-center justify-center gap-4 hover:opacity-90"
      onClick={() => setShowMobileInput(true)}
    >
      <Image src="/assets/icons/whatsapp.svg" alt="whatsapp icon" width={25} height={25} />
      Sign in with Whatsapp
    </button>
  );
};

export default OTPLogin;
