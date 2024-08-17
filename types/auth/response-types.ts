import { IUser } from "@/store/UserSlice";

export interface ISignUpResponse {
  id: string;
  email: string;
  role: "influencer" | "brand" | "agency" | "admin" | "employee";
  isVerified: boolean;
  isPaused: boolean;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IResetPasswordResponse {
  message: string;
}

export interface IInfluencerResponse {
  firstName: string;
  lastName: string;
  mobileNo: string;
  twitterURL: string;
  instagramURL: string;
  youtubeURL: string;
  linkedInURL: string;
  profilePic?: string;
  user: string;
}
export interface IAdminResponse {
  firstName: string;
  lastName: string;
  mobileNo: string;
  profilePic?: string;
  user: string;
}
export interface IBrandResponse {
  name: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  websiteURL: string;
  profilePic?: string;
  user: string;
}
