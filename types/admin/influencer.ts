export type InstagramProfileStats = {
  likes: number;
  comments: number;
  followers: number;
  engagementRate: { value: number; label: string };
  percentageFakeFollowers: number;
  views: number;
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
}

export const enum InfluencerNiche {
  FINANCE = "finance",
  NON_FINANCE = "non-finance",
  ALL = "all",
}

export const enum InfluencerType {
  EXCLUSIVE = "exclusive",
  NON_EXCLUSIVE = "non-exclusive",
  ALL = "all",
}

export enum InfluencerFollowers {
  LESSTHAN250K = "lessThan250K",
  FROM250KTO500K = "250Kto500K",
  FROM500KTO750K = "500Kto750K",
  MORETHAN750K = "moreThan750K",
}

export type Influencer = {
  id: string;
  userId: string;
  email: string;
  mobileNo: string;
  name: string;
  profileId: string;
  profileUrl: string;
  requestDate: string;
  exclusive: boolean;
  isApproved: boolean | null;
  isPaused: boolean;
  isVerified: boolean;
};
