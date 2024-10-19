"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { Campaign, CampaignSchema } from "../schema";
import HeadingCard from "./heading-card";
import AgencyForm from "./agency-form";
import InfluencerForm from "./influencer-form";
import { Button } from "@/components/ui/button";
import { PUT } from "@/lib/config/axios";
import { toast } from "sonner";

export type TCampaignForm = Campaign;

const CampaignCard = ({ data, index }: { data: TCampaignForm; index: number }) => {
  const form = useForm<TCampaignForm>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: data,
  });

  const handleAddCampaign = async (data: TCampaignForm) => {
    const response = await PUT("campaign", data);

    if (response.error) {
      toast.error(response.error);
    }

    if (response.message) {
      toast.success(response.message);
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 mt-4 items-center w-full"
        onSubmit={form.handleSubmit(handleAddCampaign, errors => {
          console.error("Form submission errors:", errors);
        })}
      >
        <Accordion defaultValue={""} type="single" collapsible className="w-full">
          <AccordionItem
            value={index.toString()}
            className="w-full  border border-bc-grey rounded-2xl p-3 px-4 space-y-4"
          >
            <HeadingCard />

            <AccordionContent className="flex flex-col-reverse gap-5">
              {form.getValues("participants").length > 0 &&
                form.watch("participants").map((participant, index) => {
                  if (participant.type === "agency") {
                    return <AgencyForm key={index} index={index} />;
                  } else {
                    return <InfluencerForm key={index} index={index} />;
                  }
                })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};

export default CampaignCard;
