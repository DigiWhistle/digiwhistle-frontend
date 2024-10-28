"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import FormTextInput from "@/components/ui/form/form-text-input";
import { GET, POST, DELETE } from "@/lib/config/axios";
import { toast } from "sonner";
import { PaperAirplaneIcon, UserIcon } from "@heroicons/react/24/outline";
import EditableRemark from "./EditableRemark";
import { useSelector } from "react-redux";
import { User } from "@/store/UserSlice";
import { FormDescription } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const RemarksFormSchema = z.object({
  remarks: z
    .string()
    .max(400, "characters should be less than 400")
    .refine(n => n.length > 0, "Please Enter Something"),
});
const ViewRemarks = ({ userId }: { userId: string }) => {
  const userInfo = useSelector(User);

  const [mainEditor, SetEditorMode] = useState<boolean>(true);
  const [fetchOrNot, SetFetcher] = useState<number>(0);
  const [allRemarks, setRemarks] = useState<any>([]);
  const user = useSelector(User);

  useEffect(() => {
    const fetchRemarks = async () => {
      const Remarks = await GET(`remarks?userId=${userId}`);
      setRemarks(Remarks.data);
    };
    fetchRemarks();
  }, [fetchOrNot]);

  const form = useForm<z.infer<typeof RemarksFormSchema>>({
    resolver: zodResolver(RemarksFormSchema),
  });
  const handleForm = async (data: z.infer<typeof RemarksFormSchema>, e: any) => {
    e.preventDefault();
    const response = await POST("remarks", {
      message: data.remarks,
      userId: userId,
    });
    SetFetcher(fetchOrNot + 1);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    form.reset();
  };
  const handleClearRemarks = async (e: any) => {
    e.preventDefault();
    const response = await DELETE(`remarks?userId=${userId}`);
    SetFetcher(fetchOrNot + 1);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }
    form.reset();
  };
  return (
    <div className="flex flex-col  ">
      <div className="flex -mr-4 pr-2 flex-col  gap-5 pb-8 max-h-[160px] overflow-y-auto ">
        {allRemarks.map((item: any) => (
          <EditableRemark
            key={item.id}
            fetchOrNot={fetchOrNot}
            SetFetcher={SetFetcher}
            item={item}
            name={userInfo?.profile?.firstName}
            SetEditorMode={SetEditorMode}
            mainEditor={mainEditor}
          />
        ))}
      </div>

      <div className="flex items-start justify-start gap-3 w-full border-y-2 pt-5 pb-5">
        <Avatar>
          <AvatarImage src={user?.profile?.profilePic ?? ""} />
          <AvatarFallback>
            <UserIcon className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col gap-2 items-center w-full"
            onSubmit={form.handleSubmit(handleForm)}
          >
            <FormTextInput
              className={""}
              inputCN="h-8 border-2 border-black"
              formName="remarks"
              label=""
              disabled={!mainEditor}
              placeholder="Add new remark here..."
              inputProps={{ maxLength: 400 }}
              rightIcon={<PaperAirplaneIcon className="text-tc-ic-black-default w-4 h-4" />}
            />
            {mainEditor ? (
              <FormDescription className="flex w-full pl-2">
                {form.watch("remarks") ? 400 - form.watch("remarks").length : "400"}/400 characters
                remaining
              </FormDescription>
            ) : (
              <></>
            )}
          </form>
        </Form>
      </div>

      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton
            text="Clear all remarks"
            handleClick={mainEditor ? handleClearRemarks : () => {}}
          />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={mainEditor ? form.handleSubmit(handleForm) : () => {}}>
            Confirm
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ViewRemarks;
