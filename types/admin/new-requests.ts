import { ChartPieIcon } from "@heroicons/react/24/solid";

export interface Brand {
  id: string;
  name: string;
  pocFirstName: string;
  pocLastName: string;
  mobileNo: string;
  websiteURL: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    isVerified: boolean;
    isApproved: boolean | null;
    isPaused: boolean;
  };
}

export interface Agency extends Brand {}

export const BRAND_TABLE_PAGE_LIMIT = 5;
export const AGENCY_TABLE_PAGE_LIMIT = 5;

export type TDataCard = {
  label: string;
  value: string | number;
  subValue?: string;
  iconName: string | typeof ChartPieIcon;
};
