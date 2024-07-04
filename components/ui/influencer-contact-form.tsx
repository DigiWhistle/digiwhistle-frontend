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
import { Input } from "@/components/ui/input";
import FormTextInput from "./form-text-input";
import { Textarea } from "./textarea";

enum PersonType {
  Influencer = "Influencer",
  Brand = "Brand",
}

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  followersCount: z.nativeEnum({
    LessThan1000: "less than 250k",
    Between1000And10000: "250k to 500k",
    Between10000And100000: "500k to 750k",
    MoreThan100000: "greater than 750k",
  }),
  profileLink: z.string().url({
    message: "Invalid URL.",
  }),
  mobileNumber: z.string(),
  message: z.string().optional(),
  personType: z.nativeEnum(PersonType),
});

function InfluencerContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      followersCount: "less than 250k",
      personType: PersonType.Influencer,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
        <div className="flex flex-col md:flex-row gap-4">
          <FormTextInput formName="email" label="Email" placeholder="Enter email" required />
          <FormTextInput
            formName="mobileNumber"
            label="Mobile Number"
            placeholder="Enter number"
            required
          />
          <FormTextInput formName="fullName" label="Full Name" placeholder="Enter name" required />
        </div>
        <FormTextInput
          formName="profileLink"
          label="Profile Link"
          placeholder="Enter link"
          required
        />

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
                  defaultValue={field.value}
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Please type your message here" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default InfluencerContactForm;
