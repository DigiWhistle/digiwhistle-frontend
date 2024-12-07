import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { ISaleInvoice } from "@/types/admin/invoice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISaleInvoiceTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: ISaleInvoice[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as ISaleInvoice[] },
  loading: true,
  error: null as string | null,
};

export const fetchSaleInvoiceTableData = createAsyncThunk(
  "SaleInvoiceTable/fetchSaleInvoiceTableData",
  async ({
    page,
    limit,
    startTime,
    endTime,
    invoiceNo,
    invoiceType = "sale",
    name,
  }: {
    page: number;
    limit: number;
    invoiceNo?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    invoiceType?: "proforma" | "sale";
    name?: string | null;
  }) => {
    let url = `invoice/${invoiceType}?page=${page}&limit=${limit}`;

    if (startTime && endTime) {
      url += `&startDate=${startTime}&endDate=${endTime}`;
    }

    if (name) {
      url += `&invoiceNo=${name}`;
    }

    const response = await GET<ISaleInvoiceTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const SaleInvoiceTableSlice = createSlice({
  name: "SaleInvoiceTable",
  initialState,
  reducers: {
    deleteSaleInvoiceByID: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(SaleInvoice => SaleInvoice.id !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSaleInvoiceTableData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSaleInvoiceTableData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchSaleInvoiceTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { deleteSaleInvoiceByID } = SaleInvoiceTableSlice.actions;

export const saleInvoiceTableReducer = SaleInvoiceTableSlice.reducer;

export const SaleInvoiceTable = (state: RootState) => state.SaleInvoiceTable;

export const SaleInvoiceTableData = (state: RootState) => state.SaleInvoiceTable.data;

export const SaleInvoiceTableCurrentPage = (state: RootState) =>
  state.SaleInvoiceTable.data.currentPage;

export const SaleInvoiceTableTotalCount = (state: RootState) =>
  state.SaleInvoiceTable.data.totalCount;

export const SaleInvoiceTableTotalPages = (state: RootState) =>
  state.SaleInvoiceTable.data.totalPages;

export const SaleInvoiceTableLoading = (state: RootState) => state.SaleInvoiceTable.loading;

export const SaleInvoiceTableError = (state: RootState) => state.SaleInvoiceTable.error;
