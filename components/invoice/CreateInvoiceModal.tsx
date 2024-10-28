"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormTextInput from "@/components/ui/form/form-text-input";
import { ArrowUpOnSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import { UserIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import CancelButton from "@/components/ui/customAlertDialog/CancelButton";
import ActionButton from "@/components/ui/customAlertDialog/ActionButton";
import { DateRangePicker } from "@/components/ui/form/Date-Range-Picker";
import { PATCH, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import FormSelectInput from "@/components/ui/form/form-select-input";
import { SearchSelect } from "@/components/ui/form/SearchSelect";
import { useState } from "react";
import FormTextareaInput from "@/components/ui/form/form-textarea-input";
import { GET } from "@/lib/config/axios";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DatePicker } from "@/components/ui/form/Date-Picker";
import FormUploadInput from "../ui/form/form-upload-input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/config/firebase";
import { useAppSelector } from "@/lib/config/store";
const Options = ["English", "Chinese", "Hindi", "Punjabi", "Thai", "Gujarati", "Marathi"];
import { User } from "@/store/UserSlice";
export const PaymentStatusOptions = [
  {
    value: "All Recieved",
    label: (
      <div className="flex items-center gap-2">
        <CheckCircleIcon className="w-4 h-4 text-success" /> All paid
      </div>
    ),
  },
  {
    value: "Pending",
    label: (
      <div className="flex items-center gap-2">
        <ExclamationCircleIcon className="w-4 h-4 text-warning" /> Pending
      </div>
    ),
  },
];
export const DaysOptions = [
  { value: "0 Days", label: "0 Days" },
  { value: "30 Days", label: "30 Days" },
  { value: "60 Days", label: "60 Days" },
];
const InvoiceModalSchema = z.object({
  doc: z.any(),
  campaignName: z.string(),
  campaignCode: z.string(),
  invoiceNo: z.string().optional(),
  PAN: z.string(),
  brand: z.string().optional(),
  total: z.number(),
  igst: z.number(),
  cgst: z.number(),
  sgst: z.number(),
  totalInvoiceAmount: z.number(),
  tdsAmount: z.number(),
  finalAmount: z.number(),
  amountToBeRecieved: z.number(),
  paymentTerms: z.string(),
  paymentStatus: z.string(),
});
const CreateInvoiceModal = ({
  mode,
  edit_id,
}: {
  mode: "Create sale invoice" | "Edit sale invoice";
  edit_id?: string;
}) => {
  const [getbrand, brandSetter] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [editfileurl, seteditfileurl] = useState<any>(null);
  const form = useForm<z.infer<typeof InvoiceModalSchema>>({
    resolver: zodResolver(InvoiceModalSchema),
    defaultValues: {},
  });
  const { resetField } = form;
  const usestore = useAppSelector(User);
  console.log(usestore);
  const setterfunction = (formname: any, Option: any) => {
    form.setValue(formname, Option.name);
  };
  console.log("filee", file);
  useEffect(() => {
    if (mode === "Edit sale invoice") {
      const updateFunction = async () => {
        setLoading(true);
        const response: any = await GET(`invoice/purchase/${edit_id}`);
        if (response.error) {
          toast.error(response.error);
          setLoading(false);
          return;
        }
        console.log("response", response);
        form.reset({
          campaignName: response.data.campaign.name,
          campaignCode: response.data.campaign.code,
          invoiceNo: response.data.invoiceNo,
          PAN: response.data.pan,
          brand: response.data.campaign.brandName,
          total: Number(response.data.amount),
          igst: Number(response.data.igst),
          cgst: Number(response.data.cgst),
          sgst: Number(response.data.sgst),
          totalInvoiceAmount: Number(response.data.totalAmount),
          tdsAmount: Number(response.data.tds),
          finalAmount: Number(response.data.finalAmount),
          amountToBeRecieved: Number(response.data.amountToBeReceived),
          paymentTerms: response.data.paymentTerms,
          paymentStatus: response.data.paymentStatus,
        });
        setLoading(false);
        seteditfileurl(response.data.file);
        // SetEditData(response.data);
      };
      updateFunction();
    }
  }, []);
  const handleForm = async (data: z.infer<typeof InvoiceModalSchema>, e: any) => {
    console.log("dataa", data, file);

    const campaignData: any = await GET(`campaign/search?code=${data.campaignCode}`);
    console.log(campaignData);
    if (campaignData.error) {
      toast.error("Please enter a valid Campaign Code");
      return;
    }
    if (mode === "Edit sale invoice") {
      let sendInfo: any;
      if (!file && !editfileurl) {
        toast.error("Please choose a file");
      } else if (file) {
        const storageRef = ref(storage, `invoice/${file.name}`); // Create a reference to the file in Firebase Storage

        await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
        const url = await getDownloadURL(storageRef);
        if (!url) {
          toast.error("error uploading invoice");
          return;
        }
        sendInfo = {
          invoiceNo: data.invoiceNo,
          pan: data.PAN,
          amount: data.total,
          igst: data.igst,
          cgst: data.cgst,
          sgst: data.sgst,
          totalAmount: data.totalInvoiceAmount,
          tds: data.tdsAmount,
          finalAmount: data.finalAmount,
          amountToBeReceived: data.amountToBeRecieved,
          paymentTerms: data.paymentTerms,
          paymentStatus: data.paymentStatus,
          file: url,
        };
      } else {
        sendInfo = {
          invoiceNo: data.invoiceNo,
          pan: data.PAN,
          amount: data.total,
          igst: data.igst,
          cgst: data.cgst,
          sgst: data.sgst,
          totalAmount: data.totalInvoiceAmount,
          tds: data.tdsAmount,
          finalAmount: data.finalAmount,
          amountToBeReceived: data.amountToBeRecieved,
          paymentTerms: data.paymentTerms,
          paymentStatus: data.paymentStatus,
          file: editfileurl,
        };
      }
      const response = await PATCH(`invoice/purchase/${edit_id}`, sendInfo);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
      }
      window.location.reload();
      return;
    }
    if (!file) return; // Return if no file is selected
    const storageRef = ref(storage, `invoice/${file.name}`); // Create a reference to the file in Firebase Storage

    await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const url = await getDownloadURL(storageRef);
    if (!url) {
      toast.error("error uploading invoice");
      return;
    }
    console.log("url", url);
    const sendInfo = {
      campaign: campaignData.data.id,
      invoiceNo: data.invoiceNo,
      pan: data.PAN,
      amount: data.total,
      igst: data.igst,
      cgst: data.cgst,
      sgst: data.sgst,
      totalAmount: data.totalInvoiceAmount,
      tds: data.tdsAmount,
      finalAmount: data.finalAmount,
      amountToBeReceived: data.amountToBeRecieved,
      paymentTerms: data.paymentTerms,
      paymentStatus: data.paymentStatus,
      file: url,
      invoiceDate: new Date().toISOString(),
    };

    let response: any;
    if (usestore) {
      if (usestore.role === "agency") {
        response = await POST(`invoice/purchase`, {
          ...sendInfo,
          agencyProfile: usestore.profile?.id,
        });
      }
      if (usestore.role === "influencer") {
        response = await POST(`invoice/purchase`, {
          ...sendInfo,
          influencerProfile: usestore.profile?.id,
        });
      }
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
      }
    }

    form.reset({});
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] overflow-y-auto">
        <span className="loading loading-spinner loading-xl "></span>
        <div>Fetching Invoice Details</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col max-h-[570px] overflow-y-auto pb-3">
      <Form {...form}>
        <form action={""}>
          <div className="flex flex-col gap-2 ">
            <div className="flex">
              {file || editfileurl ? (
                <div className="flex items-center h-14 border-2 rounded-xl border-dashed  w-full p-4 gap-4">
                  <ArrowUpOnSquareIcon className="text-[#0F172A] w-5 h-5" />
                  <div className="flex flex-col w-full">
                    <div>{file ? `${file.name}` : "Invoice"}</div>
                    <div className="text-body-sm-light text-tc-body-grey">
                      Only pdf, docx files within 3mb file size.
                    </div>
                  </div>
                  <TrashIcon
                    className="text-[#F61732] w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setFile(undefined);
                      seteditfileurl(null);
                      resetField("doc");
                    }}
                  />
                </div>
              ) : (
                <FormUploadInput
                  className="w-full  "
                  inputCN="border-2 rounded-xl border-dashed  "
                  setFile={setFile}
                  inputProps={{
                    onKeyDown: e => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    },
                  }}
                  formName="doc"
                  label=""
                  placeholder=""
                  leftIcon={<ArrowUpOnSquareIcon className="text-[#0F172A] w-5 h-5" />}
                />
              )}
            </div>
            <hr className="mt-4 mb-0 " />
            <div className="flex gap-5">
              <FormTextInput
                formName="campaignName"
                placeholder="Enter name"
                label="Campaign name"
                disabled={mode === "Edit sale invoice"}
              />
              <FormTextInput
                formName="campaignCode"
                placeholder="Enter code"
                label="Campaign code"
                disabled={mode === "Edit sale invoice"}
              />
              <FormTextInput
                formName="invoiceNo"
                placeholder="Enter invoice number"
                label="Invoice number"
              />
              <FormTextInput formName="PAN" placeholder="Enter PAN" label="PAN" />
              <SearchSelect
                endpoint={"brand/search"}
                formName="brand"
                searchPlaceholder="Search Brand"
                placeholder="Select Brand"
                label="Brand name"
                selectedValueSetter={brandSetter}
                setterfunction={setterfunction}
                leftIcon={<UserIcon className="text-tc-body-grey w-5 h-5" />}
              />
            </div>

            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="total"
                placeholder="Enter amount"
                label="Total amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="igst"
                placeholder="Enter IGST"
                label="IGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="cgst"
                placeholder="Enter CGST"
                label="CGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="sgst"
                placeholder="Enter SGST"
                label="SGST"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="totalInvoiceAmount"
                placeholder="Enter amount"
                label="Total invoice amount"
              />
            </div>
            <hr className="mt-6 mb-2 " />

            <div className="flex gap-5">
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">%</div>}
                formName="tdsAmount"
                placeholder="Enter TDS"
                label="TDS amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="finalAmount"
                placeholder="Enter amount"
                label="Final amount"
              />
              <FormTextInput
                type="number"
                leftIcon={<div className="text-tc-body-grey">₹</div>}
                formName="amountToBeRecieved"
                placeholder="Enter amount"
                label="Amount to be received"
              />
              <FormSelectInput
                formName={"paymentTerms"}
                label="Payment terms"
                placeholder="Select payment terms"
                selectItems={DaysOptions}
                triggerCN="h-10"
                className="mt-1"
              />
              <FormSelectInput
                formName={"paymentStatus"}
                label="Payment Status"
                placeholder="Payment Status"
                selectItems={PaymentStatusOptions}
                triggerCN="h-10"
                className="mt-1"
              />
            </div>

            <hr className="mt-4 mb-0 " />
          </div>
        </form>
      </Form>

      <div className="flex w-full gap-3 pt-6">
        <div className="flex w-full">
          <CancelButton text="Cancel" />
        </div>
        <div className="flex w-full">
          <ActionButton onClick={form.handleSubmit(handleForm)}>
            {mode === "Create sale invoice" ? "Create invoice" : "Confirm changes"}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;
