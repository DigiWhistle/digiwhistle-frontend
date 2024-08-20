export enum PersonType {
  INFLUENCER = "Influencer",
  BRAND = "Brand",
}
export type Query = {
  id: string;
  name: string;
  email: string;
  followersCount?: string | null;
  profileLink?: string | null;
  mobileNo?: string | null;
  message?: string | null;
  personType: PersonType;
  viewed: boolean;
};

export const QUERY_TABLE_PAGE_LIMIT = 5;
