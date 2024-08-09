import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { userReducer } from "@/store/UserSlice";
import { brandRequestsTableReducer } from "@/store/admin/new-requests/BrandRequestsTableSlice";

export const store = configureStore({
  reducer: { user: userReducer, brandRequestsTable: brandRequestsTableReducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
