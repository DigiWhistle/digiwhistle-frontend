import FormSelectInput from "@/components/ui/form/form-select-input";
import FormTextInput from "@/components/ui/form/form-text-input";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCampaignForm } from ".";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeliverableForm from "./deliverable-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { PaymentStatusOptions, PaymentTermsOptions } from "./agency-form";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { DELETE, POST } from "@/lib/config/axios";
import { toast } from "sonner";
import { getNewDeliverable } from "./utils";

const InfluencerForm = ({ index }: { index: number }) => {
  const [confirmation, setConfirmation] = useState(false);
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
    selectedItems.forEach(async item => {
      const response = await DELETE(`campaign/deliverables/${item.id}`);

      if (response.error) {
        toast.error(`Error deleting deliverable: ${response.error}`);
      } else {
        const participant = form.getValues(`participants.${index}`);
        if ("deliverables" in participant) {
          participant.deliverables = participant.deliverables.filter(
            (deliverable: { id: number | string }) => deliverable.id !== item.id,
          );
          form.setValue(`participants.${index}`, participant);
        }
      }
    });
    setSelectedItems([]);
  };

  const accessorString = `participants.${index}`;

  useEffect(() => {
    // Calculate margin
    const calculatedMargin =
      (form.watch(`participants.${index}.commercialBrand`) || 0) -
      (form.watch(`participants.${index}.toBeGiven`) || 0);

    // Set the margin value
    form.setValue(`participants.${index}.margin`, calculatedMargin);
  }, [
    form.watch(`participants.${index}.commercialBrand`),
    form.watch(`participants.${index}.toBeGiven`),
  ]);

  return (
    <div className="border rounded-2xl  flex flex-col gap-3 ">
      <div className="flex items-start gap-2 bg-sb-blue-580 p-4 rounded-t-2xl">
        <FormTextInput
          formName={`${accessorString}.name`}
          label={`Influencer Name ${form.watch(`participants.${index}.exclusive`) ? "(Exclusive)" : ""}`}
          placeholder="Enter name"
          className="max-w-44"
          inputCN="h-8"
          disabled
        />
        {/* <div className="w-px h-8 bg-gray-300 mt-6"></div>
        <FormField
          control={form.control}
          name={`participants.${index}.exclusive`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2 mt-7 mr-3">
                  <Switch id="exclusive" checked={field.value} onCheckedChange={field.onChange} />
                  <Label htmlFor="exclusive">Exclusive</Label>
                </div>
              </FormControl>
            </FormItem>
          )}
        /> */}

        <div className="flex gap-1">
          <FormTextInput
            formName={`${accessorString}.commercialBrand`}
            label="Comm-brand"
            placeholder=""
            inputCN="h-8"
            type="number"
          />
          <FormTextInput
            formName={`${accessorString}.commercialCreator`}
            label="Comm-creator"
            placeholder=""
            inputCN="h-8"
            type="number"
          />
          <FormTextInput
            formName={`${accessorString}.toBeGiven`}
            label="To be given"
            placeholder=""
            inputCN="h-8"
            type="number"
          />
          <FormTextInput
            formName={`${accessorString}.margin`}
            label="Margin"
            placeholder=""
            inputCN="h-8"
            type="number"
            disabled
          />
        </div>
        <div className="flex gap-3 items-center flex-shrink-0">
          <FormSelectInput
            formName={`${accessorString}.paymentStatus`}
            label="Payment Status"
            placeholder="Payment Status"
            selectItems={PaymentStatusOptions}
            triggerCN="h-[34px]"
            className=""
          />
          <FormSelectInput
            formName={`${accessorString}.paymentTerms`}
            label="Payment Terms"
            placeholder="Payment Terms"
            selectItems={PaymentTermsOptions}
            triggerCN="w-min"
            className=""
          />
          <div className=" flex flex-col gap-4 mt-[3px] flex-shrink-0 self-start">
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
      <div className="flex gap-2 justify-end bg-bb-primary-default-gray p-4 rounded-b-2xl">
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
        {form.watch(`participants.${index}`).confirmationSent || confirmation ? (
          <div className="text-success">Confirmation Sent</div>
        ) : (
          <Button
            type="button"
            variant={"secondary"}
            onClick={async () => {
              const response = await POST("campaign/sendEmail", {
                id: form.watch(`participants.${index}`).id,
              });
              if (response.error) {
                toast.error("Failed to send confirmation email");
              } else {
                toast.success("Confirmation email sent");
                setConfirmation(true);
              }
            }}
          >
            Send Confirmation Email
          </Button>
        )}
      </div>
    </div>
  );
};

export default InfluencerForm;
