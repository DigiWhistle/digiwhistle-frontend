export enum PersonType {
  INFLUENCER = "Influencer",
  BRAND = "Brand",
}
export type ProfileControl = {
  id: string;
  userId: string;
  email: string;
  isVerified: boolean;
  mobileNo?: string | null;
  designation: string;
  isPaused: boolean;
  firstName: string;
  lastName: string;
  profilePic: string;
  profileId: string;
  role: string;
};

export const PROFILE_CONTROL_TABLE_PAGE_LIMIT = 5;
