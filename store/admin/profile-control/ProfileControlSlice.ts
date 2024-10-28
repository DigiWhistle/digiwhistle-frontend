import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { ProfileControl } from "@/types/admin/ProfileControl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProfileControlTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: ProfileControl[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as ProfileControl[] },
  loading: true,
  error: null as string | null,
};

export const fetchProfileControlTableData = createAsyncThunk(
  "ProfileControlTable/fetchProfileControlTableData",
  async ({ page, limit, name }: { page: number; limit: number; name?: string | null }) => {
    let url = `admin/all?page=${page}&limit=${limit}`;
    if (name) {
      url += `&name=${name}`;
    }
    const response = await GET<IProfileControlTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const ProfileControlTableSlice = createSlice({
  name: "ProfileControlTable",
  initialState,
  reducers: {
    updateIsPaused: (state, action: PayloadAction<{ userId: string; isPaused: boolean }>) => {
      const { userId, isPaused } = action.payload;
      const employee = state.data.data.find(influencer => influencer.userId === userId);
      if (employee) {
        employee.isPaused = isPaused;
      }
    },
    setPausedQuery: (state, action: PayloadAction<{ id: string; ispaused: boolean }>) => {
      const { id, ispaused } = action.payload;
      const query = state.data.data.find(query => query.id === id);
      if (query) {
        query.isPaused = ispaused;
      }
    },
    deleteProfileByID: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(query => query.userId !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfileControlTableData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileControlTableData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchProfileControlTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { setPausedQuery, deleteProfileByID, updateIsPaused } =
  ProfileControlTableSlice.actions;

export const ProfileControlTableReducer = ProfileControlTableSlice.reducer;

export const ProfileControlTable = (state: RootState) => state.profileTable;

export const ProfileControlTableData = (state: RootState) => state.profileTable.data;

export const ProfileControlTableCurrentPage = (state: RootState) =>
  state.profileTable.data.currentPage;

export const ProfileControlTableTotalCount = (state: RootState) =>
  state.profileTable.data.totalCount;

export const ProfileControlTableTotalPages = (state: RootState) =>
  state.profileTable.data.totalPages;

export const ProfileControlTableLoading = (state: RootState) => state.profileTable.loading;

export const ProfileControlTableError = (state: RootState) => state.profileTable.error;
