import { RootState } from "@/lib/config/store";
import { IAdminResponse, IBrandResponse, IInfluencerResponse } from "@/types/auth/response-types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  role: "admin" | "employee" | "influencer" | "brand" | "agency";
  email: string;
  isOnBoarded: boolean;
  isVerified: boolean;
  isPaused?: boolean;
  profile?: IInfluencerResponse | IAdminResponse | IBrandResponse;
}

const initialState: { user: IUser | null } = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUserProfile: (
      state,
      action: PayloadAction<IInfluencerResponse | IAdminResponse | IBrandResponse>,
    ) => {
      if (state.user) {
        state.user.profile = { ...state.user.profile, ...action.payload };
      }
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, setUserProfile, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const User = (state: RootState) => state.user.user;
export const UserRole = (state: RootState) => (state.user.user ? state.user.user.role : null);
export const UserDesignation = (state: RootState) =>
  state.user.user && state.user.user.profile ? state.user.user.profile.designation : null;
