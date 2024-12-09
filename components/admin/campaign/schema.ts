import { InfluencerPlatforms } from "@/types/admin/influencer";
import { z } from "zod";

const DeliverableSchema = z
  .object({
    id: z.string().uuid(),
    title: z.string({ message: "required" }).min(1, { message: "required" }),
    platform: z.enum([
      InfluencerPlatforms.INSTAGRAM,
      InfluencerPlatforms.YOUTUBE,
      InfluencerPlatforms.X,
      "",
    ]),
    status: z.enum(["Live", "Not Live"]),
    deliverableLink: z.string().url().nullable().optional(),
    er: z.number().int().nonnegative().nullable().optional(),
    cpv: z.number().int().nonnegative().nullable().optional(),
  })
  .refine(data => data.status !== "Live" || data.deliverableLink !== null, {
    message: "required",
    path: ["deliverableLink"],
  });

const InfluencerSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ message: "required" }),
  deliverables: z.array(DeliverableSchema),
});

const ParticipantBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ message: "required" }),
  commercialBrand: z.number({ message: "required" }),
  commercialCreator: z.number({ message: "required" }),
  toBeGiven: z.number({ message: "required" }),
  margin: z.number({ message: "required" }),
  paymentStatus: z.enum(["Pending", "All Paid"]),
  invoiceStatus: z.enum(["Not Generated", "Generated"]),
  confirmationSent: z.boolean().default(false),
  paymentTerms: z.enum(["Advance", "30 Days", "60 Days"]).default("30 Days"),
  invoice: z.string().nullable(),
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
  name: z.string({ message: "required" }),
  code: z.string(),
  brandName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  commercial: z.number(),
  incentiveWinner: z.string(),
  paymentStatus: z.enum(["Pending", "All Received"]),
  paymentPercent: z.string().optional().nullable(),
  invoice: z.string().nullable().optional(),
  incentiveReleased: z.boolean().default(false),

  // status: z.enum(["active", "inactive"]).nullable().optional(),
  participants: z.array(ParticipantSchema),
});

export const BrandCampaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ message: "required" }),
  code: z.string(),
  campaignId: z.string().nullable().optional(),
  commercial: z.string(),
  brandName: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  capital: z.number(),
  poc: z.string(),
  invoice: z.string().nullable().optional(),
  status: z.enum(["Live", "Pending"]).nullable().optional(),
  participants: z.array(ParticipantSchema),
  invoiceStatus: z.string().nullable().optional(),
  file: z.string().nullable().optional(),
  isRaiseInvoice: z.boolean().default(false),
});

export const CampaignsSchema = z.array(CampaignSchema);
export const BrandCampaignsSchema = z.array(BrandCampaignSchema);

export type Deliverable = z.infer<typeof DeliverableSchema>;
export type Influencer = z.infer<typeof InfluencerSchema>;
export type ParticipantBase = z.infer<typeof ParticipantBaseSchema>;
export type InfluencerParticipant = z.infer<typeof InfluencerParticipantSchema>;
export type AgencyParticipant = z.infer<typeof AgencyParticipantSchema>;
export type Participant = z.infer<typeof ParticipantSchema>;
export type Campaign = z.infer<typeof CampaignSchema>;
export type Campaigns = z.infer<typeof CampaignsSchema>;
export type BrandCampaign = z.infer<typeof BrandCampaignSchema>;
export type BrandCampaigns = z.infer<typeof BrandCampaignSchema>;
