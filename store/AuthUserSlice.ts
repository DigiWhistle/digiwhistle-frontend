import { RootState } from "@/lib/config/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthUser {
  id: string;
  role: "admin" | "employee" | "influencer" | "brand" | "agency";
  email: string;
  isOnBoarded: boolean;
  isVerified: boolean;
  profile: {};
}

const initialState: { authUser: IAuthUser | null } = { authUser: null };

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<IAuthUser>) => {
      state.authUser = action.payload;
    },
    clearAuthUser: state => {
      state.authUser = null;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authUserSlice.actions;
export const authUserReducer = authUserSlice.reducer;

export const AuthUser = (state: RootState) => state.authUser.authUser;
