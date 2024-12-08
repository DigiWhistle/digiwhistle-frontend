import FormSelectInput from "@/components/ui/form/form-select-input";
import FormTextInput from "@/components/ui/form/form-text-input";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TCampaignForm } from ".";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InformationCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import DeliverableForm from "./deliverable-form";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { getNewDeliverable } from "./utils";
import { DELETE, POST } from "@/lib/config/axios";
import { toast } from "sonner";

export const PaymentStatusOptions = [
  {
    value: "All Paid",
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
export const PaymentTermsOptions = [
  {
    value: "Advance",
    label: <div className="flex items-center gap-2">Advance</div>,
  },
  {
    value: "30 Days",
    label: <div className="flex items-center gap-2">30 Days</div>,
  },
  {
    value: "60 Days",
    label: <div className="flex items-center gap-2">60 Days</div>,
  },
];

const AgencyForm = ({ index }: { index: number }) => {
  const [confirmation, setConfirmation] = useState(false);

  const [selectedItems, setSelectedItems] = useState<
    { type: "influencer" | "deliverable"; id: number | string; influencerIndex?: number }[]
  >([]);
  const form = useFormContext<TCampaignForm>();

  const {
    fields: InfluencerFields,
    remove,
    append,
  } = useFieldArray({
    control: form.control,
    name: `participants.${index}.influencer`,
  });

  const handleAddDeliverable = (influencerIndex: number) => {
    form.setValue(`participants.${index}.influencer.${influencerIndex}.deliverables`, [
      ...form.getValues(`participants.${index}.influencer.${influencerIndex}.deliverables`),
      getNewDeliverable(),
    ]);
  };

  const removeDeliverable = async (influencerIndex: number, deliverableId: string) => {
    const deliverables = form.getValues(
      `participants.${index}.influencer.${influencerIndex}.deliverables`,
    );

    // if (deliverables.length === 1) {
    //   return;
    // }

    const response = await DELETE(`campaign/deliverables/${deliverableId}`);

    if (response.error) {
      toast.error(`Error deleting deliverable: ${response.error}`);
      return;
    }

    form.setValue(
      `participants.${index}.influencer.${influencerIndex}.deliverables`,
      deliverables.filter(_ => _.id !== deliverableId),
    );
  };

  const removeItems = () => {
    selectedItems.forEach(async item => {
      if (item.type === "deliverable") {
        removeDeliverable(item.influencerIndex as number, item.id as string);
      } else if (item.type === "influencer") {
        if (form) {
          const deliverableIds = form
            // @ts-ignore
            .watch(`participants.${index}.influencer.${item.id}.deliverables`)
            // @ts-ignore
            .map(_ => _.id);

          const response = await DELETE(`campaign/deliverables`, {
            Ids: deliverableIds,
          });
        }
        remove(item.id as number);
      }
    });
    setSelectedItems([]);
  };

  const accessorString = `participants.${index}`;

  // Use useEffect to update margin when commercialBrand or toBeGiven changes
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
    <div className="border rounded-2xl  flex flex-col gap-3 transition-all duration-1000">
      <div className="flex items-start gap-2 bg-sb-blue-580 p-4 rounded-t-2xl">
        <div className="flex gap-1">
          <FormTextInput
            formName={`${accessorString}.name`}
            label="Agency Name"
            placeholder="Enter name"
            className="max-w-[320px]"
            inputCN="h-8"
            disabled
          />
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
            className="mt-1/2 "
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
          {InfluencerFields.length > 0 &&
            InfluencerFields.map((influencer, influencerIndex) => (
              <div key={influencer.id} className="flex flex-col gap-4">
                <div className="flex items-end gap-4">
                  <Checkbox
                    id={influencerIndex.toString()}
                    className="border-bc-grey mb-3"
                    checked={selectedItems.some(
                      item => item.id === influencerIndex && item.type === "influencer",
                    )}
                    onCheckedChange={value => {
                      if (value) {
                        setSelectedItems([
                          ...selectedItems,
                          { type: "influencer", id: influencerIndex },
                        ]);
                      } else {
                        setSelectedItems(selectedItems.filter(item => item.id !== influencerIndex));
                      }
                    }}
                  />
                  <FormTextInput
                    formName={`participants.${index}.influencer.${influencerIndex}.name`}
                    label="Influencer Name"
                    placeholder="Enter name"
                    inputCN="h-8"
                    className="max-w-72"
                  />
                  <button
                    type="button"
                    className="flex gap-1 items-center  mb-2 text-link"
                    onClick={() => handleAddDeliverable(influencerIndex)}
                  >
                    <PlusCircleIcon className="w-5 h-5 " />
                    Add Deliverable
                  </button>
                </div>
                <div className="flex flex-col-reverse gap-4">
                  {form.watch(`participants.${index}.influencer.${influencerIndex}.deliverables`)
                    ?.length > 0 &&
                    form
                      .getValues(`participants.${index}.influencer.${influencerIndex}.deliverables`)
                      .map((deliverable, deliverableIndex) => (
                        <DeliverableForm
                          participantIndex={index}
                          influencerIndex={influencerIndex}
                          index={deliverableIndex}
                          key={deliverable.id}
                          selectedItems={selectedItems}
                          setSelectedItems={setSelectedItems}
                        />
                      ))}
                </div>
                {influencerIndex !==
                  form.getValues(`participants.${index}.influencer`).length - 1 && (
                  <hr className="my-4" />
                )}
              </div>
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
        <Button
          type="button"
          onClick={() => append({ id: uuidv4(), name: "", deliverables: [getNewDeliverable()] })}
        >
          Add Influencer
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

export default AgencyForm;
