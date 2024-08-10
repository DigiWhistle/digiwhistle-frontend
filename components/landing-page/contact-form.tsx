"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormTextInput from "../ui/form/form-text-input";
import { Textarea } from "../ui/textarea";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LinkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Checkbox } from "../ui/checkbox";
import { postRequest } from "@/lib/config/axios";
import FormPhoneInput from "../ui/form/form-phone-input";
import { mobileNoSchema, termsCheckSchema } from "@/lib/validationSchema";
import { toast } from "sonner";

export enum PersonType {
  Influencer = "Influencer",
  Brand = "Brand",
}

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    followersCount: z
      .union([
        z.nativeEnum({
          LessThan250k: "less than 250k",
          Between250kAnd500k: "250k to 500k",
          Between500kAnd750k: "500k to 750k",
          MoreThan750k: "greater than 750k",
        }),
        z.null(),
        z.undefined(),
      ])
      .optional(),
    profileLink: z.string().url({
      message: "Invalid URL.",
    }),
    mobileNo: mobileNoSchema,
    message: z.string().optional(),
    personType: z.nativeEnum(PersonType),
    termsCheck: termsCheckSchema,
  })
  .superRefine((data, ctx) => {
    if (data.personType === "Influencer" && data.followersCount === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Followers count is required ",
        path: ["followersCount"],
      });
    }
  });

function ContactForm({ userType }: { userType: PersonType.Influencer | PersonType.Brand }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      followersCount: undefined,
      personType: userType,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = {
      name: data.name,
      email: data.email,
      followersCount: data.followersCount,
      profileLink: data.profileLink,
      mobileNo: data.mobileNo,
      message: data.message,
      personType: data.personType,
    };
    const response = await postRequest("contactUs", formData);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col gap-6 items-center justify-between"
      >
        <div className="w-full space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <FormTextInput
              formName="email"
              label="Email"
              placeholder="Enter email"
              required
              leftIcon={<EnvelopeIcon className="text-[#0F172A] w-5 h-5" />}
            />
            {/* <FormTextInput
              formName="mobileNo"
              label="Enter Mobile Number"
              placeholder="Enter number"
              required
              type="number"
              leftIcon={<DevicePhoneMobileIcon className="text-[#0F172A] w-5 h-5" />}
            /> */}
            <FormPhoneInput mobileFormName="mobileNo" required />

            <FormTextInput
              formName="name"
              label={userType === PersonType.Influencer ? "Full Name" : "Brand Name"}
              placeholder="Enter name"
              required
              leftIcon={<UserIcon className="text-[#0F172A] w-5 h-5" />}
            />
          </div>
          <FormTextInput
            formName="profileLink"
            label={userType === PersonType.Influencer ? "Profile Link" : "Website Link"}
            placeholder="Enter link"
            required
            leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
          />

          {userType === PersonType.Influencer && (
            <FormField
              control={form.control}
              name="followersCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Follower Count<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                      className="flex flex-wrap gap-2 justify-between"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="less than 250k" id="r1" />
                        </FormControl>
                        <FormLabel className="font-normal">Less than 250k</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="250k to 500k" id="r2" />
                        </FormControl>
                        <FormLabel className="font-normal">250k to 500k</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="500k to 750k" id="r3" />
                        </FormControl>
                        <FormLabel className="font-normal">500k to 750k</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="greater than 750k" id="r4" />
                        </FormControl>
                        <FormLabel className="font-normal">Greater than 750k</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-full"
                    {...field}
                    value={field.value || ""}
                    placeholder="Please type your message here"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full space-y-3">
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
            className="w-full disabled:text-black"
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
          >
            {form.formState.isSubmitSuccessful ? "Thank you!" : "Send"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
