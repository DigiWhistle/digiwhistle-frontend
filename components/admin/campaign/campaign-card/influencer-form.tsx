import FormSelectInput from "@/components/ui/form/form-select-input";
import FormTextInput from "@/components/ui/form/form-text-input";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCampaignForm } from ".";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeliverableForm from "./deliverable-form";
import { uuid } from "uuidv4";
import { Button } from "@/components/ui/button";
import { PaymentStatusOptions } from "./agency-form";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem } from "@/components/ui/form";

const getNewDeliverable = () => {
  const newDeliverable = {
    id: uuid(),
    title: "",
    platform: "" as "",
    campaignStatus: "Not Live" as "Live" | "Not Live",
    deliverableLink: "",
    er: 0,
    cpv: 0,
  };

  return newDeliverable;
};

const InfluencerForm = ({ index }: { index: number }) => {
  const [selectedItems, setSelectedItems] = useState<
    { type: "deliverable"; id: number | string; influencerIndex?: number }[]
  >([]);
  const form = useFormContext<TCampaignForm>();
  const {
    fields: Deliverables,
    remove,
    append,
  } = useFieldArray({
    control: form.control,
    name: `participants.${index}.deliverables`,
  });

  const removeItems = () => {
    selectedItems.forEach(item => {
      console.log("Before remove:", form.getValues(`participants.${index}.influencer`));
      remove(item.id as number);
      console.log("After remove:", form.getValues(`participants.${index}.influencer`));
    });
    setSelectedItems([]);
  };

  const accessorString = `participants.${index}`;
  return (
    <div className="border rounded-2xl  flex flex-col gap-3 ">
      <div className="flex items-end gap-2 bg-sb-blue-580 p-4 rounded-t-2xl">
        <FormTextInput
          formName={`${accessorString}.name`}
          label="Influencer Name"
          placeholder="Enter name"
          className="max-w-72"
          inputCN="h-8"
        />
        <div className="w-px h-8 bg-gray-300 mb-1"></div>
        <FormField
          control={form.control}
          name={`participants.${index}.exclusive`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2 mb-2 mr-3">
                  <Switch id="exclusive" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-1">
          <FormTextInput
            formName={`${accessorString}.commercialBrand`}
            label="Comm-brand"
            placeholder=""
            inputCN="h-8"
          />
          <FormTextInput
            formName={`${accessorString}.commercialCreator`}
            label="Comm-creator"
            placeholder=""
            inputCN="h-8"
          />
          <FormTextInput
            formName={`${accessorString}.toBeGiven`}
            label="To be given"
            placeholder=""
            inputCN="h-8"
          />
          <FormTextInput
            formName={`${accessorString}.margin`}
            label="Margin"
            placeholder=""
            inputCN="h-8"
          />
        </div>
        <div className="flex gap-3 items-center flex-shrink-0">
          <FormSelectInput
            formName={`${accessorString}.paymentStatus`}
            label="Payment Status"
            placeholder="Payment Status"
            selectItems={PaymentStatusOptions}
            triggerCN="h-9"
            className="mt-1/2"
          />
          <div className=" flex flex-col gap-4 flex-shrink-0 self-start">
            <Label>Invoice status</Label>
            {form.getValues(`participants.${index}.invoiceStatus`) === "Generated" ? (
              <p className="text-success flex gap-1 items-center">
                Generated
                <Popover>
                  <PopoverTrigger>
                    <InformationCircleIcon className="w-5 h-5 text-tc-body-grey" />
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-fit text-tc-primary-white bg-black-201 text-sm p-3"
                    sideOffset={4}
                    alignOffset={-50}
                    align="start"
                  >
                    {form.getValues(`participants.${index}.invoice`)}
                  </PopoverContent>
                </Popover>
              </p>
            ) : (
              <p className="text-warning">Not Generated</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 ">
        <div className="flex flex-col gap-4">
          {Deliverables.length > 0 &&
            Deliverables.map((deliverable, deliverableIndex) => (
              <DeliverableForm
                participantIndex={index}
                index={deliverableIndex}
                key={deliverable.id}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            ))}
        </div>
      </div>
      <div className="flex gap-2 justify-end bg-bb-primary-default-gray p-4 rounded-t-2xl">
        <Button
          className="flex items-center gap-2 bg-alert text-white-301"
          disabled={selectedItems.length === 0}
          variant={"secondary"}
          onClick={() => removeItems()}
          type="button"
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
        <Button type="button" onClick={() => append(getNewDeliverable())}>
          Add Deliverable
        </Button>
      </div>
    </div>
  );
};

export default InfluencerForm;
