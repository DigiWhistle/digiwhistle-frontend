import { INFLUENCER_TABLE_PAGE_LIMIT } from "@/components/admin/new-requests/TableSection/influencer-table";
import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { Brand } from "@/types/admin/new-requests";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface IBrandTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Brand[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Brand[] },
  loading: false,
  error: null as string | null,
};

export const fetchBrandRequestsData = createAsyncThunk(
  "brandRequestsTable/fetchBrandRequestsData",
  async ({
    page,
    limit = INFLUENCER_TABLE_PAGE_LIMIT,
    name,
    rejected,
    approved,
  }: {
    page: number;
    limit: number;
    name?: string | null;
    rejected?: boolean;
    approved?: boolean;
  }) => {
    let url = `brand?page=${page}&limit=${limit}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (rejected !== undefined) {
      url += `&rejected=${rejected}`;
    }

    if (approved !== undefined) {
      url += `&approved=${approved}`;
    }
    const response = await GET<IBrandTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const brandRequestsTableSlice = createSlice({
  name: "brandRequestsTable",
  initialState,
  reducers: {
    updateBrandApproval: (
      state,
      action: PayloadAction<{ id: string; isApproved: boolean | null }>,
    ) => {
      const { id, isApproved } = action.payload;
      const brand = state.data.data.find(brand => brand.id === id);
      if (brand) {
        brand.user.isApproved = isApproved;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrandRequestsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandRequestsData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchBrandRequestsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { updateBrandApproval } = brandRequestsTableSlice.actions;

export const brandRequestsTableReducer = brandRequestsTableSlice.reducer;

export const BrandRequestsTable = (state: RootState) => state.brandRequestsTable;

export const BrandRequestsTableData = (state: RootState) => state.brandRequestsTable.data;

export const BrandRequestsTableCurrentPage = (state: RootState) =>
  state.brandRequestsTable.data.currentPage;

export const BrandRequestsTableTotalCount = (state: RootState) =>
  state.brandRequestsTable.data.totalCount;

export const BrandRequestsTableTotalPages = (state: RootState) =>
  state.brandRequestsTable.data.totalPages;

export const BrandRequestsTableLoading = (state: RootState) => state.brandRequestsTable.loading;

export const BrandRequestsTableError = (state: RootState) => state.brandRequestsTable.error;
