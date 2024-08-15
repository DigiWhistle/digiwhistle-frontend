"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import FormTextInput from "@/components/ui/form/form-text-input";
import { postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";
import { FormDescription } from "@/components/ui/form";
const ApproveFormSchema = z.object({
  remarks: z.string().max(400, "characters should be less than 400"),
});

const ApproveForm = ({
  userId,
  name,
  url,
  updateData,
  updateid,
}: {
  userId: string;
  name: string;
  url?: string;
  updateData: any;
  updateid: string;
}) => {
  const form = useForm<z.infer<typeof ApproveFormSchema>>({
    resolver: zodResolver(ApproveFormSchema),
  });
  const handleForm = async (data: z.infer<typeof ApproveFormSchema>) => {
    const response = await postAuthorizedRequest("user/approve", {
      userId: userId,
    });
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      updateData(updateid, true);
    }
    form.reset();
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 bg-slate-100 rounded-full ">
          {url ? (
            <AvatarImage src="https://github.com/shadcn.png" />
          ) : (
            <div className="flex w-full h-full items-center justify-center">BV</div>
          )}
        </Avatar>
        {name}
      </div>
      <div className="flex flex-col">
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-6 items-center w-full"
            onSubmit={form.handleSubmit(handleForm)}
          >
            <div className="flex flex-col w-full gap-2 ">
              <FormTextInput
                className={"border-t-2  pt-3 "}
                formName="remarks"
                label="Add remarks"
                placeholder="Write here."
                required
                maxLength={400}
              />
              <FormDescription className="flex w-full">
                {form.watch("remarks") ? 400 - form.watch("remarks").length : "400"}/400 characters
                remaining
              </FormDescription>
            </div>
            <div className="flex w-full gap-3">
              <CancelButton />
              <ActionButton onClick={form.handleSubmit(handleForm)}>Approve</ActionButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ApproveForm;
