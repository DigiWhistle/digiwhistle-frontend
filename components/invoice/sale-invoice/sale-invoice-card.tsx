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

const SaleInvoiceCard = ({
  data,
  index,
  invoiceType,
}: {
  data: TCampaignForm;
  index: number;
  invoiceType: string;
}) => {
  return (
    <Accordion defaultValue="" type="single" collapsible className="w-full">
      <AccordionItem
        value={index.toString()}
        className="w-full border border-bc-grey rounded-2xl p-3 px-4 space-y-4"
      >
        <HeadingCard data={data} />

        <AccordionContent className="flex flex-col-reverse gap-5">
          {data.deliverables.length > 0 &&
            data.deliverables.map((participant, index) => (
              <div
                className="border border-gray-555 p-4 flex min-w-[800px] bg-gray-553 rounded-xl"
                key={index}
              >
                <div className="space-y-1 min-w-[200px]  justify-self-start">
                  <p className="text-tc-primary-default font-medium">Influencer Name</p>
                  <div className="flex gap-1 items-center">
                    <UserCircleIcon className="w-5 h-5 text-gray-558" />
                    <p>{participant.name}</p>
                  </div>
                </div>
                <div className="w-full gap-2">
                  {"deliverables" in participant &&
                    participant.deliverables.map((item, index) => (
                      <>
                        <div key={index} className="flex gap-5 justify-between  mr-8">
                          <div className="w-full flex gap-5 items-start justify-around ">
                            <div className="space-y-1 min-w-[122px]">
                              <div className="flex gap-1 items-center">
                                <p className="text-tc-primary-default font-medium">Deliverable</p>
                                <Popover>
                                  <PopoverTrigger>
                                    <InformationCircleIcon className="w-4 h-4 text-tc-body-grey -mt-px" />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-fit text-tc-primary-white bg-black-201 text-sm p-3 space-y-4"
                                    sideOffset={4}
                                    alignOffset={-50}
                                    align="start"
                                  >
                                    T&C: All posts go live only after approval from client.
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="flex gap-1 items-center text-[#7D7D7F] ml-0.5">
                                {item.desc}
                              </div>
                            </div>
                            <DeliverableItem classname="min-w-[100px]" title="Platform">
                              {item.platform}
                            </DeliverableItem>
                            <DeliverableItem title="Campaign Status">
                              <>
                                {item.status === "Live" ? (
                                  <PlayIcon className="w-4 h-4 text-alert" />
                                ) : (
                                  <MinusCircleIcon className="w-4 h-4 text-warning" />
                                )}
                                {item.status}
                              </>
                            </DeliverableItem>
                          </div>
                        </div>
                        {index < participant.deliverables.length - 1 && (
                          <hr className="my-5 border border-bc-grey" />
                        )}
                      </>
                    ))}
                </div>
              </div>
            ))}
          {
            <div className="border rounded-2xl  flex flex-col gap-3 " key={index}>
              <div className="flex  gap-10 justify-around bg-sb-blue-580 p-4 pl-8 rounded-t-2xl">
                <DeliverableItem classname="min-w-[100px]" title="Taxable Amount">
                  <CurrencyValueDisplay value={data.taxableAmount} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="Total Amount">
                  <CurrencyValueDisplay value={data.total} />
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

                {/* <DeliverableItem classname="min-w-[100px]" title="Payment Status">
                  {data.paymentStatus === "All Paid" ? (
                    <CheckCircleIcon className="w-4 h-4 text-success" />
                  ) : (
                    <MinusCircleIcon className="w-4 h-4 text-warning" />
                  )}
                  {data.paymentStatus}
                </DeliverableItem> */}
              </div>
              <div className="flex gap-10 justify-around pl-8 mb-4 px-4">
                <DeliverableItem classname="min-w-[100px]" title="TDS Amount">
                  <CurrencyValueDisplay value={data.tds} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="Received">
                  <CurrencyValueDisplay value={data.received} />
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="Balance Amount">
                  <CurrencyValueDisplay value={data.balance} />
                </DeliverableItem>
                {invoiceType === "sale" && (
                  <DeliverableItem title="Payment Status">
                    <>
                      {data.status === "All Received" ? (
                        <CheckIcon className="w-4 h-4 text-success" />
                      ) : (
                        <MinusCircleIcon className="w-4 h-4 text-warning" />
                      )}
                      {data.paymentStatus}
                    </>
                  </DeliverableItem>
                )}
                <DeliverableItem title="Month">
                  <>{data.month}</>
                </DeliverableItem>
              </div>
            </div>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SaleInvoiceCard;
