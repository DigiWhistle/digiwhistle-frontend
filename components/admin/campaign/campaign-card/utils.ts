import { AgencyParticipant, InfluencerParticipant, ParticipantBase } from "../schema";
import { v4 as uuidv4 } from "uuid";

export const createNewParticipant = (
  type: "agency" | "influencer",
  additionalData: Partial<InfluencerParticipant | AgencyParticipant> = {},
  commonData: Partial<ParticipantBase> = {},
): InfluencerParticipant | AgencyParticipant => {
  const baseData: ParticipantBase = {
    id: uuidv4(),
    name: "",
    commercialBrand: 0,
    commercialCreator: 0,
    toBeGiven: 0,
    margin: 0,
    paymentStatus: "Pending",
    invoiceStatus: "Not Generated",
    invoice: "",
    confirmationSent: false,
    paymentTerms: "30 Days",
    ...commonData,
  };

  if (type === "influencer") {
    return {
      ...baseData,
      type: "influencer",
      exclusive: false,
      deliverables: [getNewDeliverable()],
      ...additionalData,
    } as InfluencerParticipant;
  } else if (type === "agency") {
    return {
      ...baseData,
      type: "agency",
      influencer: [{ id: uuidv4(), name: "", deliverables: [getNewDeliverable()] }],
      ...additionalData,
    } as AgencyParticipant;
  } else {
    throw new Error("Invalid participant type");
  }
};

export const getNewDeliverable = () => {
  const newDeliverable = {
    id: uuidv4(),
    title: "",
    platform: "" as "",
    status: "Not Live" as "Live" | "Not Live",
    deliverableLink: null,
    er: 0,
    cpv: 0,
  };

  return newDeliverable;
};
