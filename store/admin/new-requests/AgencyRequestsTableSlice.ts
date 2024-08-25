import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { Agency } from "@/types/admin/new-requests";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface IAgencyTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Agency[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Agency[] },
  loading: false,
  error: null as string | null,
};

export const fetchAgencyRequestsData = createAsyncThunk(
  "agencyRequestsTable/fetchAgencyRequestsData",
  async ({
    page,
    limit,
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
    let url = `agency?page=${page}&limit=${limit}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (rejected !== undefined) {
      url += `&rejected=${rejected}`;
    }

    if (approved !== undefined) {
      url += `&approved=${approved}`;
    }
    const response = await GET<IAgencyTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const agencyRequestsTableSlice = createSlice({
  name: "agencyRequestsTable",
  initialState,
  reducers: {
    updateAgencyApproval: (
      state,
      action: PayloadAction<{ id: string; isApproved: boolean | null }>,
    ) => {
      const { id, isApproved } = action.payload;
      const agency = state.data.data.find(agency => agency.id === id);
      if (agency) {
        agency.user.isApproved = isApproved;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAgencyRequestsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencyRequestsData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchAgencyRequestsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { updateAgencyApproval } = agencyRequestsTableSlice.actions;

export const agencyRequestsTableReducer = agencyRequestsTableSlice.reducer;

export const AgencyRequestsTable = (state: RootState) => state.agencyRequestsTable;

export const AgencyRequestsTableData = (state: RootState) => state.agencyRequestsTable.data;

export const AgencyRequestsTableCurrentPage = (state: RootState) =>
  state.agencyRequestsTable.data.currentPage;

export const AgencyRequestsTableTotalCount = (state: RootState) =>
  state.agencyRequestsTable.data.totalCount;

export const AgencyRequestsTableTotalPages = (state: RootState) =>
  state.agencyRequestsTable.data.totalPages;

export const AgencyRequestsTableLoading = (state: RootState) => state.agencyRequestsTable.loading;

export const AgencyRequestsTableError = (state: RootState) => state.agencyRequestsTable.error;
