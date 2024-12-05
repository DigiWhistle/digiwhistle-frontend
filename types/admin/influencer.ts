export type InstagramProfileStats = {
  likes: number;
  comments: number;
  followers: number;
  engagementRate: { value: number; label: string };
  percentageFakeFollowers: number;
  views: number;
  genders: any[];
  cities: any[];
  countries: any[];
  ages: any[];
  reach: any[];
};

export type InstagramPostStats = {
  likes: number;
  comments: number;
  views: number;
};

export type YoutubePostStats = {
  likes: number;
  comments: number;
  views: number;
};

export type YoutubeProfileStats = {
  views: number;
  subscribers: number;
  videos: number;
};

export type TwitterProfileStats = {
  followers: number;
  tweets: number;
  views: number;
  replyCount: number;
  retweets: number;
};

export const enum InfluencerPlatforms {
  INSTAGRAM = "instagram",
  YOUTUBE = "youtube",
  X = "x",
  LINKEDIN = "linkedin",
}

export const enum InfluencerNiche {
  ALL = "all",
  FINANCE = "finance",
  NON_FINANCE = "non-finance",
}

export const enum InfluencerType {
  ALL = "all",
  EXCLUSIVE = "exclusive",
  NON_EXCLUSIVE = "non-exclusive",
}

export enum InfluencerFollowers {
  LESSTHAN250K = "lessThan250K",
  FROM250KTO500K = "250Kto500K",
  FROM500KTO750K = "500Kto750K",
  MORETHAN750K = "moreThan750K",
}

export enum HideFrom {
  BRAND = "brand",
  Agency = "agency",
}

export type Influencer = {
  profileId: string;
  userId: string;
  email: string;
  mobileNo: string;
  name: string;
  profileUrl: string;
  requestDate: string;
  exclusive: boolean;
  hideFrom: HideFrom | null;
  isApproved: boolean | null;
  isPaused: boolean;
  isVerified: boolean;
  commercial: number;
  location: string;
};
