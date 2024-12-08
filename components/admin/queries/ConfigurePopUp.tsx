"use client";
import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SearchSelect } from "@/components/ui/form/SearchSelect";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { MagnifyingGlassIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { GET, PUT } from "@/lib/config/axios";
import { toast } from "sonner";
const ConfigSchema = z.object({
  shareEmailLessThan250: z.string().optional() || null,
  shareEmail250To500: z.string().optional() || null,
  shareEmail500To750: z.string().optional() || null,
  shareEmailGreaterThan750: z.string().optional() || null,
});
const ConfigurePopUp = () => {
  const [sendShareEmailLessThan250, setSendShareEmailLessThan250] = useState<any>([]);
  const [sendShareEmail250To500, setSendShareEmail250To500] = useState<any>([]);
  const [sendShareEmail500To750, setSendShareEmail500To750] = useState<any>([]);
  const [sendShareEmailGreaterThan750, setSendShareEmailGreaterThan750] = useState<any>([]);
  const form = useForm<z.infer<typeof ConfigSchema>>({
    resolver: zodResolver(ConfigSchema),
    defaultValues: {},
  });
  useEffect(() => {
    const fetchDefaultValues = async () => {
      const response: any = await GET(`contactUs/config`);
      if (response) {
        response.data.forEach((item: any) => {
          switch (item.followersCount) {
            case "Less than 250K":
              setSendShareEmailLessThan250(item.employees);
              break;
            case "250K to 500K":
              setSendShareEmail250To500(item.employees);
              break;
            case "500K to 750K":
              setSendShareEmail500To750(item.employees);
              break;
            case "Greater than 750K":
              setSendShareEmailGreaterThan750(item.employees);
              break;
            default:
              break;
          }
        });
      } else {
      }
    };
    fetchDefaultValues();
  }, []);

  const setterfunction1 = (formname: any, Option: any) => {
    if (formname === "shareEmailLessThan250") {
      const emailExists = sendShareEmailLessThan250.some(
        (email: any) => email.email === Option.email,
      );
      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setSendShareEmailLessThan250([...sendShareEmailLessThan250, Option]);
        form.setValue(formname, "");
      }
    }
  };
  const handleDeleteEmail1 = (email: string) => {
    setSendShareEmailLessThan250((prevEmails: any) =>
      prevEmails.filter((item: any) => item.email !== email),
    );
  };
  const setterfunction2 = (formname: any, Option: any) => {
    if (formname === "shareEmail250To500") {
      const emailExists = sendShareEmail250To500.some((email: any) => email.email === Option.email);

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setSendShareEmail250To500([...sendShareEmail250To500, Option]);
        form.setValue(formname, "");
      }
    }
  };
  const handleDeleteEmail2 = (email: string) => {
    setSendShareEmail250To500((prevEmails: any) =>
      prevEmails.filter((item: any) => item.email !== email),
    );
  };

  const setterfunction3 = (formname: any, Option: any) => {
    if (formname === "shareEmail500To750") {
      const emailExists = sendShareEmail500To750.some((email: any) => email.email === Option.email);

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setSendShareEmail500To750([...sendShareEmail500To750, Option]);
        form.setValue(formname, "");
      }
    }
  };
  const handleDeleteEmail3 = (email: string) => {
    setSendShareEmail500To750((prevEmails: any) =>
      prevEmails.filter((item: any) => item.email !== email),
    );
  };
  const setterfunction4 = (formname: any, Option: any) => {
    if (formname === "shareEmailGreaterThan750") {
      const emailExists = sendShareEmailGreaterThan750.some(
        (email: any) => email.email === Option.email,
      );

      // If it doesn't exist, add it to the array
      if (!emailExists) {
        setSendShareEmailGreaterThan750([...sendShareEmailGreaterThan750, Option]);
        form.setValue(formname, "");
      }
    }
  };
  const handleDeleteEmail4 = (email: string) => {
    setSendShareEmailGreaterThan750((prevEmails: any) =>
      prevEmails.filter((item: any) => item.email !== email),
    );
  };

  const handleForm = async (data: z.infer<typeof ConfigSchema>, e: any) => {
    const sendInfo = [
      {
        followersCount: "Less than 250K",
        employees: sendShareEmailLessThan250,
      },
      {
        followersCount: "250K to 500K",
        employees: sendShareEmail250To500,
      },
      {
        followersCount: "500K to 750K",
        employees: sendShareEmail500To750,
      },
      {
        followersCount: "Greater than 750K",
        employees: sendShareEmailGreaterThan750,
      },
    ];
    const response = await PUT(`contactUs/config`, sendInfo);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
    }

    form.reset({});
    window.location.reload();
  };
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto  pb-3">
      <Form {...form}>
        <form action={""} className="flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <SearchSelect
                popoverclassname="w-[500px]"
                type={"EmailSelector"}
                searchType="employee"
                // Options={Options}
                formName="shareEmailLessThan250"
                searchPlaceholder="Type email ID here"
                placeholder="Type email ID here"
                label="Less than 250k"
                setterfunction={setterfunction1}
                leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <div className="flex flex-wrap gap-3 mt-3 max-h-[40px] w-full overflow-y-auto">
                {sendShareEmailLessThan250.map((item: any) => (
                  <div
                    key={item.email}
                    className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full border object-cover w-6 h-6">
                        {item.profilePic ? (
                          <Image className="" src={item.profilePic} alt="" />
                        ) : (
                          <UserIcon className="text-tc-body-grey w-3 h-3" />
                        )}
                      </div>
                      {item.email}
                    </div>
                    <XMarkIcon
                      onClick={() => handleDeleteEmail1(item.email)}
                      cursor={"pointer"}
                      className="text-[#0F172A] w-3.5 h-3.5"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <SearchSelect
                popoverclassname="w-[500px]"
                type={"EmailSelector"}
                searchType="employee"
                // Options={Options}
                formName="shareEmail250To500"
                searchPlaceholder="Type email ID here"
                placeholder="Type email ID here"
                label="250k to 500k"
                setterfunction={setterfunction2}
                leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <div className="flex flex-wrap gap-3 mt-3 max-h-[40px] w-full overflow-y-auto">
                {sendShareEmail250To500.map((item: any) => (
                  <div
                    key={item.email}
                    className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full border object-cover w-6 h-6">
                        {item.profilePic ? (
                          <Image className="" src={item.profilePic} alt="" />
                        ) : (
                          <UserIcon className="text-tc-body-grey w-3 h-3" />
                        )}
                      </div>
                      {item.email}
                    </div>
                    <XMarkIcon
                      onClick={() => handleDeleteEmail2(item.email)}
                      cursor={"pointer"}
                      className="text-[#0F172A] w-3.5 h-3.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-full">
              <SearchSelect
                popoverclassname="w-[500px]"
                type={"EmailSelector"}
                searchType="employee"
                // Options={Options}
                formName="shareEmail500To750"
                searchPlaceholder="Type email ID here"
                placeholder="Type email ID here"
                label="500k to 750k"
                setterfunction={setterfunction3}
                leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <div className="flex flex-wrap gap-3 mt-3 max-h-[40px] w-full overflow-y-auto">
                {sendShareEmail500To750.map((item: any) => (
                  <div
                    key={item.email}
                    className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full border object-cover w-6 h-6">
                        {item.profilePic ? (
                          <Image className="" src={item.profilePic} alt="" />
                        ) : (
                          <UserIcon className="text-tc-body-grey w-3 h-3" />
                        )}
                      </div>
                      {item.email}
                    </div>
                    <XMarkIcon
                      onClick={() => handleDeleteEmail3(item.email)}
                      cursor={"pointer"}
                      className="text-[#0F172A] w-3.5 h-3.5"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full ">
              <SearchSelect
                popoverclassname="w-[500px]"
                type={"EmailSelector"}
                searchType="employee"
                // Options={Options}
                formName="shareEmailGreaterThan750"
                searchPlaceholder="Type email ID here"
                placeholder="Type email ID here"
                label="Greater than 750k"
                setterfunction={setterfunction4}
                leftIcon={<MagnifyingGlassIcon className="text-tc-body-grey w-5 h-5" />}
              />
              <div className="flex flex-wrap gap-3 mt-3 max-h-[40px] w-full overflow-y-auto">
                {sendShareEmailGreaterThan750.map((item: any) => (
                  <div
                    key={item.email}
                    className="border-2 rounded-full px-1.5 py-1.5 gap-1 flex items-center text-body-sm-light"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center rounded-full border object-cover w-6 h-6">
                        {item.profilePic ? (
                          <Image className="" src={item.profilePic} alt="" />
                        ) : (
                          <UserIcon className="text-tc-body-grey w-3 h-3" />
                        )}
                      </div>
                      {item.email}
                    </div>
                    <XMarkIcon
                      onClick={() => handleDeleteEmail4(item.email)}
                      cursor={"pointer"}
                      className="text-[#0F172A] w-3.5 h-3.5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Form>

      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>Share</ActionButton>
        </div>
      </div>
    </div>
  );
};

export default ConfigurePopUp;
