import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { IPurchaseInvoice } from "@/types/admin/invoice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPurchaseInvoiceTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: IPurchaseInvoice[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as IPurchaseInvoice[] },
  loading: true,
  error: null as string | null,
};

export const fetchPurchaseInvoiceTableData = createAsyncThunk(
  "PurchaseInvoiceTable/fetchPurchaseInvoiceTableData",
  async ({
    page,
    limit,
    startTime,
    endTime,
    invoiceNo,
  }: {
    page: number;
    limit: number;
    invoiceNo?: string | null;
    startTime?: string | null;
    endTime?: string | null;
  }) => {
    let url = `invoice/purchase?page=${page}&limit=${limit}`;

    if (startTime && endTime) {
      url += `&startDate=${startTime}&endDate=${endTime}`;
    }

    if (invoiceNo) {
      url += `&invoiceNo=${invoiceNo}`;
    }

    const response = await GET<IPurchaseInvoiceTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const PurchaseInvoiceTableSlice = createSlice({
  name: "PurchaseInvoiceTable",
  initialState,
  reducers: {
    deletePurchaseInvoiceByID: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(PurchaseInvoice => PurchaseInvoice.id !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPurchaseInvoiceTableData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseInvoiceTableData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchPurchaseInvoiceTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { deletePurchaseInvoiceByID } = PurchaseInvoiceTableSlice.actions;

export const purchaseInvoiceTableReducer = PurchaseInvoiceTableSlice.reducer;

export const PurchaseInvoiceTable = (state: RootState) => state.PurchaseInvoiceTable;

export const PurchaseInvoiceTableData = (state: RootState) => state.PurchaseInvoiceTable.data;

export const PurchaseInvoiceTableCurrentPage = (state: RootState) =>
  state.PurchaseInvoiceTable.data.currentPage;

export const PurchaseInvoiceTableTotalCount = (state: RootState) =>
  state.PurchaseInvoiceTable.data.totalCount;

export const PurchaseInvoiceTableTotalPages = (state: RootState) =>
  state.PurchaseInvoiceTable.data.totalPages;

export const PurchaseInvoiceTableLoading = (state: RootState) => state.PurchaseInvoiceTable.loading;

export const PurchaseInvoiceTableError = (state: RootState) => state.PurchaseInvoiceTable.error;
