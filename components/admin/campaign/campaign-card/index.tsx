"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import { CampaignSchema } from "../schema";
import HeadingCard from "./heading-card";
import AgencyForm from "./agency-form";
import InfluencerForm from "./influencer-form";

export type TCampaignForm = z.infer<typeof CampaignSchema>;

const CampaignCard = ({ data }: { data: TCampaignForm }) => {
  const form = useForm<TCampaignForm>({
    resolver: zodResolver(CampaignSchema),
    defaultValues: data,
  });

  console.log(form.getValues());

  const handleAddCampaign = async (data: TCampaignForm) => {};
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 mt-4 items-center w-full"
        onSubmit={form.handleSubmit(handleAddCampaign)}
      >
        <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className="w-full border border-bc-grey rounded-2xl p-3 px-4 space-y-4"
          >
            <HeadingCard />

            <AccordionContent className="flex flex-col-reverse gap-5">
              {form.getValues("participants").length > 0 &&
                form.getValues("participants").map((participant, index) => {
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
