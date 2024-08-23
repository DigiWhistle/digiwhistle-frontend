import React from "react";
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
import { UserIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const RejectFormSchema = z.object({
  remarks: z.string().max(400, "characters should be less than 400"),
});

const RejectForm = ({
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
  const form = useForm<z.infer<typeof RejectFormSchema>>({
    resolver: zodResolver(RejectFormSchema),
  });
  const handleForm = async (data: z.infer<typeof RejectFormSchema>) => {
    const response = await postAuthorizedRequest("user/reject", {
      userId: userId,
    });
    const remarkResponse = await postAuthorizedRequest("remarks", {
      message: data.remarks,
      userId: userId,
    });
    if (response.error) {
      toast.error(response.error);
    } else if (remarkResponse.error) {
      toast.error(remarkResponse.error);
    } else {
      toast.success(response.message);
      updateData(updateid, false);
    }
    form.reset();
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={url} />
          <AvatarFallback>
            <UserIcon className="w-5 h-5" />
          </AvatarFallback>
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
                inputProps={{ maxLength: 400 }}
              />
              <FormDescription className="flex w-full">
                {form.watch("remarks") ? 400 - form.watch("remarks").length : "400"}/400 characters
                remaining
              </FormDescription>
            </div>
            <div className="flex w-full gap-3">
              <CancelButton />
              <ActionButton
                className="bg-red-600 text-white"
                onClick={form.handleSubmit(handleForm)}
              >
                Reject
              </ActionButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RejectForm;
