import { InfluencerPlatforms } from "@/types/admin/influencer";
import { z } from "zod";

const DeliverableSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  platform: z.enum([
    InfluencerPlatforms.INSTAGRAM,
    InfluencerPlatforms.YOUTUBE,
    InfluencerPlatforms.X,
    "",
  ]),
  campaignStatus: z.enum(["Live", "Not Live"]),
  deliverableLink: z.string().url(),
  er: z.number(),
  cpv: z.number(),
});

const InfluencerSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  deliverables: z.array(DeliverableSchema),
});

const ParticipantBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  commercialBrand: z.number(),
  commercialCreator: z.number(),
  toBeGiven: z.number(),
  margin: z.number(),
  paymentStatus: z.enum(["Pending", "All Paid"]),
  invoiceStatus: z.enum(["Not Generated", "Generated"]),
  invoice: z.string(),
});

const InfluencerParticipantSchema = ParticipantBaseSchema.extend({
  type: z.literal("influencer"),
  exclusive: z.boolean(),
  deliverables: z.array(DeliverableSchema),
});

const AgencyParticipantSchema = ParticipantBaseSchema.extend({
  type: z.literal("agency"),
  influencer: z.array(InfluencerSchema),
});

const ParticipantSchema = z.discriminatedUnion("type", [
  InfluencerParticipantSchema,
  AgencyParticipantSchema,
]);

export const CampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  code: z.string(),
  brandName: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  commercial: z.number(),
  incentiveWinner: z.string(),
  invoice: z.string(),
  status: z.enum(["active", "inactive"]),
  participants: z.array(ParticipantSchema),
});

export const CampaignsSchema = z.array(CampaignSchema);
