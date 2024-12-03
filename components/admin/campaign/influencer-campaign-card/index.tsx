// @ts-nocheck
"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { BrandCampaign, Campaign, CampaignSchema } from "../schema";
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
} from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
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

const InfluencerCampaignCard = ({ data, index }: { data: TCampaignForm; index: number }) => {
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
              <div className="flex items-start gap-20 bg-sb-blue-580 p-4 pl-8 rounded-t-2xl">
                <DeliverableItem classname="min-w-[100px]" title="To be received">
                  {data.toBeGiven}
                </DeliverableItem>
                <DeliverableItem classname="min-w-[100px]" title="Payment Status">
                  {data.paymentStatus === "All Paid" ? (
                    <CheckCircleIcon className="w-4 h-4 text-success" />
                  ) : (
                    <MinusCircleIcon className="w-4 h-4 text-warning" />
                  )}
                  {data.paymentStatus}
                </DeliverableItem>
                {data.invoiceStatus === "Generated" && data.paymentStatus != "All Paid" ? (
                  <DeliverableItem classname="min-w-[100px]" title="Due date">
                    {data.invoiceDueDate ? data.invoiceDueDate : ""}
                  </DeliverableItem>
                ) : (
                  <></>
                )}
              </div>
              <div className="gap-2 mb-4">
                {"deliverable" in data &&
                  data.deliverable.map((item, index) => (
                    <>
                      <div key={index} className="flex gap-14 justify-between ml-8">
                        <div className="flex gap-10 items-start ">
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
                              {item.title}
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
                          <DeliverableItem title="Deliverable Link">
                            <>
                              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-link" />
                              {item.deliverableLink ? item.deliverableLink : "-"}
                            </>
                          </DeliverableItem>
                          <DeliverableItem classname="min-w-14" title="ER %">
                            {item.er}
                          </DeliverableItem>
                          <DeliverableItem classname="min-w-14" title="CPV">
                            {item.cpv}
                          </DeliverableItem>
                        </div>
                      </div>
                      {index < data.deliverable.length - 1 && (
                        <hr className="my-5 border border-bc-grey" />
                      )}
                    </>
                  ))}
              </div>
            </div>
          }
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InfluencerCampaignCard;
