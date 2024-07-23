import { RootState } from "@/lib/config/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IUser {
  name: string;
  role: "admin" | "employee" | "influencer" | "brand";
  token: string;
}

const initialState: { user: IUser | null } = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const User = (state: RootState) => state.user.user;
export const UserRole = (state: RootState) => (state.user.user ? state.user.user.role : null);
