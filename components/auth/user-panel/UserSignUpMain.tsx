"use client";
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
import { redirect } from "next/navigation";
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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { User, setUser } from "@/store/UserSlice";
import { useRouter } from "next/navigation";
enum Role {
  Influencer = "influencer",
  Brand = "brand",
  Agency = "agency",
}

const signUpSchema = z
  .object({
    role: z.nativeEnum(Role),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
    remember: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const UserSignUpMain = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) });
  const dispatch = useDispatch();
  const user = useSelector(User);
  const router = useRouter();
  console.log("this is the user", user);

  const handleSignUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const response: any = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const userDetails = {
        idToken: response._tokenResponse.idToken,
        role: form.getValues("role"),
      };
      console.log("this is the response", response);
      const result = await postRequest("auth/signup", userDetails);
      const user_info = {
        name: form.getValues("email"),
        role: form.getValues("role"),
        onboarded: false,
        isverified: false,
        token: result.data.id,
      };
      dispatch(setUser(user_info));
      router.push("/sign-up/user/user-verification");
      console.log("this is the result", result);
      toast.success(result.message);
      toast.info("Please wait for admin approval");
    } catch (error: any) {
      console.log("this is the error", error);
      toast.error(error.message);
    } finally {
      form.reset();
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
      const data = {
        idToken: response._tokenResponse.idToken,
        role: form.getValues("role"),
      };

      const result = await postRequest("auth/signup", data);
      const user_info = {
        name: form.getValues("email"),
        role: form.getValues("role"),
        onboarded: false,
        isverified: false,
        token: result.data.id,
      };
      dispatch(setUser(user_info));
      toast.success(result.message.data.id);
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
            className="flex flex-col mt-4 gap-6 items-center w-full"
            onSubmit={form.handleSubmit(handleSignUp)}
          >
            <FormRadioGroup
              formName="role"
              label="Select your role"
              radioOptions={[
                { label: "Influencer", value: "influencer" },
                { label: "Brand", value: "brand" },
                { label: "Agency", value: "agency" },
              ]}
              triggerOnChange
            />
            <hr className="w-full" />
            <div className="flex flex-col w-full gap-4 ">
              <FormTextInput
                formName="email"
                label="Email"
                placeholder="Enter email"
                required
                leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
              />
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
            <hr className="w-full" />
            <div className="w-full space-y-4">
              <FormField
                control={form.control}
                name="remember"
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
                className="w-full"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Create Account
              </Button>
            </div>
          </form>
        </Form>
        <Button className="w-full mt-4" onClick={() => handleGoogleSignUp()}>
          Use Google ID and Proceed
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserSignUpMain;
