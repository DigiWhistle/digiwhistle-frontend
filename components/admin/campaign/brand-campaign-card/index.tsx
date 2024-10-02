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
import { PlayIcon, UserCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export type TCampaignForm = BrandCampaign;

const DeliverableItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-1">
      <p className="text-tc-primary-default font-medium shrink-0">{title}</p>
      <div className="flex gap-1 items-center text-[#7D7D7F] ml-0.5">{children}</div>
    </div>
  );
};

const BrandCampaignCard = ({ data, index }: { data: TCampaignForm; index: number }) => {
  return (
    <Accordion defaultValue="" type="single" collapsible className="w-full">
      <AccordionItem
        value={index.toString()}
        className="w-full border border-bc-grey rounded-2xl p-3 px-4 space-y-4"
      >
        <HeadingCard data={data} />

        <AccordionContent className="flex flex-col-reverse gap-5">
          {data.participants.length > 0 &&
            data.participants.map((participant, index) => (
              <div
                className="border border-gray-555 p-4 flex justify-between bg-gray-553 rounded-md"
                key={index}
              >
                <div className="space-y-1  justify-self-start">
                  <p className="text-tc-primary-default font-medium">Influencer Name</p>
                  <div className="flex gap-1 items-center">
                    <UserCircleIcon className="w-5 h-5 text-gray-558" />
                    <p>{participant.name}</p>
                  </div>
                </div>
                <div className="gap-2">
                  {"deliverables" in participant &&
                    participant.deliverables.map((item, index) => (
                      <>
                        <div key={index} className="flex gap-16 justify-between mr-8">
                          <div className="flex gap-16 items-start ">
                            <div className="space-y-1">
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
                            <DeliverableItem title="Platform">{item.platform}</DeliverableItem>
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
                          </div>
                          <div className="flex gap-16 items-start">
                            <DeliverableItem title="ER %">{item.er}</DeliverableItem>
                            <DeliverableItem title="CPV">{item.cpv}</DeliverableItem>
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BrandCampaignCard;
