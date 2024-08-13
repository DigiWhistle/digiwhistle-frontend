"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import FormTextInput from "@/components/ui/form/form-text-input";
import { getAuthorizedRequest, postAuthorizedRequest } from "@/lib/config/axios";
import { toast } from "sonner";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import EditableRemark from "./EditableRemark";
import { useSelector } from "react-redux";
import { User } from "@/store/UserSlice";
const RemarksFormSchema = z.object({
  remarks: z.string().max(400, "characters should be less than 400"),
});
const ViewRemarks = ({
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
  const userInfo = useSelector(User);
  const [mainEditor, SetEditorMode] = useState<boolean>(true);
  const [fetchOrNot, SetFetcher] = useState<number>(0);
  const [allRemarks, setRemarks] = useState<any>([]);
  useEffect(() => {
    const fetchRemarks = async () => {
      const Remarks = await getAuthorizedRequest(`remarks?userId=${userId}`);
      setRemarks(Remarks.data);
    };
    fetchRemarks();
  }, [fetchOrNot]);

  const form = useForm<z.infer<typeof RemarksFormSchema>>({
    resolver: zodResolver(RemarksFormSchema),
  });
  const handleForm = async (data: z.infer<typeof RemarksFormSchema>) => {
    const response = await postAuthorizedRequest("remarks", {
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
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col gap-5 pb-8 max-h-[250px] overflow-y-scroll ">
        {allRemarks.map((item: any) => (
          <EditableRemark
            key={item.name}
            fetchOrNot={fetchOrNot}
            SetFetcher={SetFetcher}
            item={item}
            name={userInfo?.profile?.firstName}
            SetEditorMode={SetEditorMode}
            mainEditor={mainEditor}
          />
        ))}
      </div>
      {mainEditor ? (
        <div className="flex items-center justify-start gap-3 w-full border-y-2 py-8">
          <Avatar className="w-11 h-10 bg-slate-100 rounded-full ">
            {url ? (
              <AvatarImage src="https://github.com/shadcn.png" />
            ) : (
              <div className="flex w-full h-full items-center justify-center">BV</div>
            )}
          </Avatar>
          <Form {...form}>
            <form
              action=""
              className="flex flex-col gap-6 items-center w-full"
              onSubmit={form.handleSubmit(handleForm)}
            >
              <FormTextInput
                className={""}
                formName="remarks"
                label=""
                placeholder="Add new remark here..."
                rightIcon={<PaperAirplaneIcon className="text-tc-ic-black-default w-4 h-4" />}
              />
            </form>
          </Form>
        </div>
      ) : (
        <></>
      )}
      {mainEditor ? (
        <div className="flex w-full gap-3 pt-6">
          <CancelButton />
          <ActionButton onClick={form.handleSubmit(handleForm)}>Confirm</ActionButton>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ViewRemarks;
