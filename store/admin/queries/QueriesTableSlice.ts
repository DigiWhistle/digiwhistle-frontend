import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { Query } from "@/types/admin/queries";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IQueryTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Query[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Query[] },
  loading: true,
  error: null as string | null,
};

export const fetchQueriesTableData = createAsyncThunk(
  "queriesTable/fetchQueriesTableData",
  async ({
    page,
    limit,
    name,
    brands,
    influencer,
  }: {
    page: number;
    limit: number;
    name?: string | null;
    brands?: boolean;
    influencer?: boolean;
  }) => {
    let url = `contactUs?page=${page}&limit=${limit}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (brands !== undefined) {
      url += `&brands=${brands}`;
    }

    if (influencer !== undefined) {
      url += `&influencer=${influencer}`;
    }
    const response = await GET<IQueryTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const brandRequestsTableSlice = createSlice({
  name: "queriesTable",
  initialState,
  reducers: {
    setViewQuery: (state, action: PayloadAction<{ id: string; viewed: boolean }>) => {
      const { id, viewed } = action.payload;
      const query = state.data.data.find(query => query.id === id);
      if (query) {
        query.viewed = viewed;
      }
    },
    deleteQueryByID: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(query => query.id !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQueriesTableData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueriesTableData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchQueriesTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { setViewQuery, deleteQueryByID } = brandRequestsTableSlice.actions;

export const queriesTableReducer = brandRequestsTableSlice.reducer;

export const QueriesTable = (state: RootState) => state.queriesTable;

export const QueriesTableData = (state: RootState) => state.queriesTable.data;

export const QueriesTableCurrentPage = (state: RootState) => state.queriesTable.data.currentPage;

export const QueriesTableTotalCount = (state: RootState) => state.queriesTable.data.totalCount;

export const QueriesTableTotalPages = (state: RootState) => state.queriesTable.data.totalPages;

export const QueriesTableLoading = (state: RootState) => state.queriesTable.loading;

export const QueriesTableError = (state: RootState) => state.queriesTable.error;
