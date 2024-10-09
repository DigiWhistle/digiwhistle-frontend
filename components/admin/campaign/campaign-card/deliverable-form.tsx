import { Checkbox } from "@/components/ui/checkbox";
import FormSelectInput from "@/components/ui/form/form-select-input";
import FormTextInput from "@/components/ui/form/form-text-input";
import React from "react";
import { influencerPlatforms } from "../../new-requests/TableSection/influencer-table/InfluencerFilters";
import { MinusCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import { TCampaignForm } from ".";
import { useFormContext } from "react-hook-form";

const statusOptions = [
  {
    value: "Live",
    label: (
      <div className="flex items-center gap-2">
        <PlayIcon className="w-4 h-4 text-alert" /> Live
      </div>
    ),
  },
  {
    value: "Not Live",
    label: (
      <div className="flex items-center gap-2">
        <MinusCircleIcon className="w-4 h-4 text-warning" /> Not Live
      </div>
    ),
  },
];
const DeliverableForm = ({
  participantIndex,
  influencerIndex,
  index,
  selectedItems,
  setSelectedItems,
}: {
  participantIndex: number;
  influencerIndex?: number;
  index: number;
  selectedItems: { type: "influencer" | "deliverable"; id: string | number }[];
  setSelectedItems: any;
}) => {
  const form = useFormContext<TCampaignForm>();
  const accessorString =
    influencerIndex !== undefined
      ? `participants.${participantIndex}.influencer.${influencerIndex}.deliverables.${index}`
      : `participants.${participantIndex}.deliverables.${index}`;
  const deliverable = form.watch(
    influencerIndex !== undefined
      ? `participants.${participantIndex}.influencer.${influencerIndex}.deliverables.${index}`
      : `participants.${participantIndex}.deliverables.${index}`,
  );

  if (!deliverable) return null;
  return (
    <div key={index} className="flex items-start gap-3">
      <div className="flex items-center gap-4">
        <Checkbox
          id={deliverable.id}
          className="border-bc-grey"
          checked={selectedItems.some(
            item => item.id === deliverable.id && item.type === "deliverable",
          )}
          onCheckedChange={value => {
            if (value) {
              setSelectedItems([
                ...selectedItems,
                { type: "deliverable", id: deliverable.id, influencerIndex },
              ]);
            } else {
              setSelectedItems(selectedItems.filter(item => item.id !== deliverable.id));
            }
          }}
        />
        <FormTextInput
          formName={`${accessorString}.title`}
          label="Deliverable"
          placeholder="Enter deliverable "
          inputCN="h-8"
          className="min-w-44 max-w-72"
        />
      </div>
      <FormSelectInput
        formName={`${accessorString}.platform`}
        label="Platform"
        className="max-w-32"
        placeholder="Select Platform"
        selectItems={influencerPlatforms}
        triggerCN="h-[34px]"
      />
      <FormSelectInput
        formName={`${accessorString}.status`}
        label="Campaign Status"
        className="max-w-32"
        placeholder="Select status"
        selectItems={statusOptions}
        triggerCN="h-[34px]"
      />
      <FormTextInput
        formName={`${accessorString}.deliverableLink`}
        label="Deliverable link"
        placeholder="Paste link here"
        inputCN="h-8"
        className="flex-grow"
        leftIcon={<LinkIcon className="text-[#0F172A] w-5 h-5" />}
      />
      <FormTextInput
        formName={`${accessorString}.er`}
        label="ER%"
        placeholder="value"
        inputCN="h-8"
        className=" max-w-24"
        type="number"
      />
      <FormTextInput
        formName={`${accessorString}.cpv`}
        label="CPV"
        placeholder="value"
        inputCN="h-8"
        className=" max-w-24"
        type="number"
      />
    </div>
  );
};

export default DeliverableForm;
