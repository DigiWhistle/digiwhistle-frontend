import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { userReducer } from "@/store/UserSlice";
import { brandRequestsTableReducer } from "@/store/admin/new-requests/BrandRequestsTableSlice";
import { queriesTableReducer } from "@/store/admin/queries/QueriesTableSlice";
import { agencyRequestsTableReducer } from "@/store/admin/new-requests/AgencyRequestsTableSlice";
import { influencerRequestsTableReducer } from "@/store/admin/new-requests/InfluencerRequestsTableSlice";
import { ProfileControlTableReducer } from "@/store/admin/profile-control/ProfileControlSlice";
import { campaignsTableReducer } from "@/store/admin/campaigns/CampaignTableSlice";
import { payrollTableReducer } from "@/store/admin/payroll/PayrollTableSlice";
import { purchaseInvoiceTableReducer } from "@/store/admin/invoice/PurchaseInvoiceTableSlice";
import { saleInvoiceTableReducer } from "@/store/admin/invoice/SaleInvoiceTableSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    brandRequestsTable: brandRequestsTableReducer,
    agencyRequestsTable: agencyRequestsTableReducer,
    queriesTable: queriesTableReducer,
    profileTable: ProfileControlTableReducer,
    influencerRequestsTable: influencerRequestsTableReducer,
    campaignsTable: campaignsTableReducer,
    payrollTable: payrollTableReducer,
    PurchaseInvoiceTable: purchaseInvoiceTableReducer,
    SaleInvoiceTable: saleInvoiceTableReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
