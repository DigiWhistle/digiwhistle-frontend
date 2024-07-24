import { IUser } from "@/store/UserSlice";

export interface ISignUpResponse {
  id: string;
  email: string;
  role: "influencer" | "brand" | "agency" | "admin" | "employee";
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}
