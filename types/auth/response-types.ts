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
  id?: string;
  firstName?: string;
  lastName?: string;
  mobileNo: string;
  twitterURL: string;
  instagramURL: string;
  youtubeURL: string;
  linkedInURL: string;
  profilePic?: string;
  user: string;
  designation?: string;
  pocFirstName?: string;
  pocLastName?: string;
}
export interface IAdminResponse {
  id?: string;
  firstName?: string;
  lastName?: string;
  mobileNo?: string;
  profilePic?: string;
  user?: string;
  designation?: string;
  pocFirstName?: string;
  pocLastName?: string;
}
export interface IBrandResponse {
  id?: string;
  name: string;
  firstName?: string;
  pocFirstName?: string;
  pocLastName?: string;
  lastName?: string;
  mobileNo: string;
  websiteURL: string;
  profilePic?: string;
  user: string;
  designation?: string;
}
