import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import {
  Influencer,
  InfluencerFollowers,
  InfluencerNiche,
  InfluencerPlatforms,
  InfluencerType,
} from "@/types/admin/influencer";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInfluencerTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Influencer[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Influencer[] },
  loading: false,
  error: null as string | null,
};

export const fetchInfluencerRequestsData = createAsyncThunk(
  "influencerRequestsTable/fetchInfluencerRequestsData",
  async ({
    page,
    limit,
    platform,
    name,
    rejected,
    approved,
    niche,
    followers,
    type,
    refresh,
    sortEr,
  }: {
    page: number;
    limit?: number;
    platform?: InfluencerPlatforms;
    name?: string | null;
    rejected?: boolean;
    approved?: boolean;
    niche?: InfluencerNiche;
    followers?: InfluencerFollowers;
    type?: InfluencerType;
    refresh?: boolean;
    sortEr?: boolean;
  }) => {
    let url = `influencer?page=${page}&limit=${limit}&platform=${platform}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (rejected !== undefined) {
      url += `&rejected=${rejected}`;
    }

    if (approved !== undefined) {
      url += `&approved=${approved}`;
    }

    if (niche) {
      url += `&niche=${niche}`;
    }

    if (followers) {
      url += `&followers=${followers}`;
    }

    if (type) {
      url += `&type=${type}`;
    }

    if (refresh) {
      url += `&refresh=${refresh}`;
    }

    if (sortEr) {
      url += `&sortEr=${sortEr}`;
    }

    const response = await GET<IInfluencerTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const influencerRequestsTableSlice = createSlice({
  name: "influencerRequestsTable",
  initialState,
  reducers: {
    updateInfluencerApproval: (
      state,
      action: PayloadAction<{ id: string; isApproved: boolean | null }>,
    ) => {
      const { id, isApproved } = action.payload;
      const influencer = state.data.data.find(influencer => influencer.profileId === id);
      if (influencer) {
        influencer.isApproved = isApproved;
      }
    },
    patchInfluencerDataById: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Influencer> }>,
    ) => {
      const { id, data } = action.payload;
      const influencer = state.data.data.find(influencer => influencer.profileId === id);
      if (influencer) {
        Object.assign(influencer, data);
      }
    },
    deleteInfluencerById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(influencer => influencer.profileId !== id);

      state.data.totalCount = state.data.totalCount - 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInfluencerRequestsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInfluencerRequestsData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchInfluencerRequestsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { updateInfluencerApproval, patchInfluencerDataById, deleteInfluencerById } =
  influencerRequestsTableSlice.actions;

export const influencerRequestsTableReducer = influencerRequestsTableSlice.reducer;

export const InfluencerRequestsTable = (state: RootState) => state.influencerRequestsTable;

export const InfluencerRequestsTableData = (state: RootState) => state.influencerRequestsTable.data;

export const InfluencerRequestsTableCurrentPage = (state: RootState) =>
  state.influencerRequestsTable.data.currentPage;

export const InfluencerRequestsTableTotalCount = (state: RootState) =>
  state.influencerRequestsTable.data.totalCount;

export const InfluencerRequestsTableTotalPages = (state: RootState) =>
  state.influencerRequestsTable.data.totalPages;

export const InfluencerRequestsTableLoading = (state: RootState) =>
  state.influencerRequestsTable.loading;

export const InfluencerRequestsTableError = (state: RootState) =>
  state.influencerRequestsTable.error;
