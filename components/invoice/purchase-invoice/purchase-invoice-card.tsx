// @ts-nocheck
"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import HeadingCard from "./heading-card";
// import InfluencerForm from "./influencer-form";
import { Button } from "@/components/ui/button";
import { PUT } from "@/lib/config/axios";
import { toast } from "sonner";
import {
  PlayIcon,
  UserCircleIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import CurrencyValueDisplay from "@/components/ui/currency-value-display";
export type TCampaignForm = BrandCampaign;

const DeliverableItem = ({
  title,
  children,
  classname,
}: {
  title: string;
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1 ", classname)}>
      <p className="text-tc-primary-default font-medium shrink-0 ">{title}</p>
      <div className="flex gap-1 items-center text-[#7D7D7F] ml-0.5">{children}</div>
    </div>
  );
};

const PurchaseInvoiceCard = ({ data, index }: { data: TCampaignForm; index: number }) => {
  return (
    <Accordion defaultValue="" type="single" collapsible className="w-full">
      <AccordionItem
        value={index.toString()}
        className="w-full border border-bc-grey rounded-2xl p-3 px-4 space-y-4"
      >
        <HeadingCard data={data} />

        <AccordionContent className="flex flex-col-reverse gap-5">
          {
            <div className="border rounded-2xl  flex flex-col gap-3 " key={index}>
              <div className="flex items-start gap-10 bg-sb-blue-580 p-4 pl-8 rounded-t-2xl">
                <DeliverableItem classname="min-w-[100px]" title="Total Amount">
                  <CurrencyValueDisplay value={data.totalAmount} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="IGST">
                  <CurrencyValueDisplay value={data.igst} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="CGST">
                  <CurrencyValueDisplay value={data.cgst} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="SGST">
                  <CurrencyValueDisplay value={data.sgst} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="Total Invoice Amount">
                  <CurrencyValueDisplay value={data.totalInvoiceAmount} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="TDS">
                  <CurrencyValueDisplay value={data.tds} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="amount">
                  <CurrencyValueDisplay value={data.amount} />
                </DeliverableItem>
                {/* <DeliverableItem classname="min-w-[100px]" title="Payment Status">
                  {data.paymentStatus === "All Paid" ? (
                    <CheckCircleIcon className="w-4 h-4 text-success" />
                  ) : (
                    <MinusCircleIcon className="w-4 h-4 text-warning" />
                  )}
                  {data.paymentStatus}
                </DeliverableItem> */}
              </div>
              <div className="gap-2 mb-4">
                <div key={index} className="flex gap-14 justify-between ml-8">
                  <div className="flex gap-20 items-start justify-between">
                    <DeliverableItem classname="min-w-[100px]" title="Amount to be received">
                      <CurrencyValueDisplay value={data.amountToBeReceived} />
                    </DeliverableItem>
                    <DeliverableItem classname="min-w-[100px]" title="Balance Amount">
                      <CurrencyValueDisplay value={data.balanceAmount} />
                    </DeliverableItem>
                    <DeliverableItem title="Payment Status">
                      <>
                        {data.PaymentStatus === "All Paid" ? (
                          <CheckIcon className="w-4 h-4 text-success" />
                        ) : (
                          <MinusCircleIcon className="w-4 h-4 text-warning" />
                        )}
                        {data.PaymentStatus}
                      </>
                    </DeliverableItem>
                    <DeliverableItem title="Payment Terms">
                      <>{data.paymentTerms}</>
                    </DeliverableItem>
                  </div>
                </div>
              </div>
            </div>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PurchaseInvoiceCard;
