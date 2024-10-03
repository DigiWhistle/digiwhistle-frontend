import { BrandCampaign, Campaign } from "@/components/admin/campaign/schema";
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

export interface ICampaignTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Campaign[] | BrandCampaign[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Campaign[] | BrandCampaign[] },
  loading: false,
  error: null as string | null,
};

export const fetchCampaignsData = createAsyncThunk(
  "campaignsTable/fetchCampaignsData",
  async ({
    page,
    limit,
    startTime,
    endTime,
    name,
    payment,
    type,
    status,
    platform,
  }: {
    page: number;
    limit?: number;
    startTime?: string | null;
    endTime?: string | null;
    name?: string | null;
    payment?: string | null;
    type?: InfluencerType;
    status?: string | null;
    platform?: string | null;
  }) => {
    let url = `campaign?page=${page}&limit=${limit}`;

    if (startTime && endTime) {
      url += `&startTime=${startTime}&endTime=${endTime}`;
    }

    if (name) {
      url += `&name=${name}`;
    }

    if (payment) {
      url += `&payment=${payment}`;
    }

    if (type) {
      url += `&type=${type}`;
    }

    if (status) {
      url += `&campaignStatus=${status}`;
    }

    if (platform) {
      url += `&platform=${platform}`;
    }

    const response = await GET<ICampaignTable>(url);

    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const campaignsTableSlice = createSlice({
  name: "campaignsTable",
  initialState,
  reducers: {
    // patchInfluencerDataById: (
    //   state,
    //   action: PayloadAction<{ id: string; data: Partial<Influencer> }>,
    // ) => {
    //   const { id, data } = action.payload;
    //   const influencer = state.data.data.find(influencer => influencer.profileId === id);
    //   if (influencer) {
    //     Object.assign(influencer, data);
    //   }
    // },
    // deleteInfluencerById: (state, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   state.data.data = state.data.data.filter(influencer => influencer.profileId !== id);
    //   state.data.totalCount = state.data.totalCount - 1;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCampaignsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignsData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchCampaignsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
// export const { updateInfluencerApproval, patchInfluencerDataById, deleteInfluencerById } =
//   campaignsTableSlice.actions;

export const campaignsTableReducer = campaignsTableSlice.reducer;

export const campaignsTable = (state: RootState) => state.campaignsTable;

export const campaignsTableData = (state: RootState) => state.campaignsTable.data;

export const campaignsTableCurrentPage = (state: RootState) =>
  state.campaignsTable.data.currentPage;

export const campaignsTableTotalCount = (state: RootState) => state.campaignsTable.data.totalCount;

export const campaignsTableTotalPages = (state: RootState) => state.campaignsTable.data.totalPages;

export const campaignsTableLoading = (state: RootState) => state.campaignsTable.loading;

export const campaignsTableError = (state: RootState) => state.campaignsTable.error;
