import { GET, POST } from "@/lib/config/axios";
import { RootState } from "@/lib/config/store";
import { PaymentStatus, PaymentTerms, Payroll } from "@/types/admin/payroll";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPayrollTable {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  data: Payroll[];
}

const initialState = {
  data: { currentPage: 1, totalCount: 10, totalPages: 0, data: [] as Payroll[] },
  loading: true,
  error: null as string | null,
};

export const fetchPayrollTableData = createAsyncThunk(
  "payrollTable/fetchPayrollTableData",
  async ({
    page,
    limit,
    startTime,
    endTime,
    type,
    search,
    isEmployee = false,
  }: {
    page: number;
    limit: number;
    search?: string | null;
    startTime?: string | null;
    endTime?: string | null;
    type: PaymentStatus;
    isEmployee: boolean;
  }) => {
    let url;
    if (isEmployee) {
      url = `payroll/employee?page=${page}&limit=${limit}`;
    } else {
      url = `payroll?page=${page}&limit=${limit}`;
    }

    if (startTime && endTime) {
      url += `&startDate=${startTime}&endDate=${endTime}`;
    }

    if (type && !isEmployee) {
      url += `&type=${type}`;
    }

    if (search) {
      url += `&searchQuery=${search}`;
    }

    const response = await GET<IPayrollTable>(url);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.data;
  },
);

export const payrollTableSlice = createSlice({
  name: "payrollTable",
  initialState,
  reducers: {
    deletePayrollByID: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.data.data = state.data.data.filter(payroll => payroll.id !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPayrollTableData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayrollTableData.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.currentPage = action.payload.currentPage;
          state.data.totalCount = action.payload.totalCount;
          state.data.totalPages = action.payload.totalPages;
          state.data.data = action.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchPayrollTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch initial state";
      });
  },
});
export const { deletePayrollByID } = payrollTableSlice.actions;

export const payrollTableReducer = payrollTableSlice.reducer;

export const PayrollTable = (state: RootState) => state.payrollTable;

export const PayrollTableData = (state: RootState) => state.payrollTable.data;

export const PayrollTableCurrentPage = (state: RootState) => state.payrollTable.data.currentPage;

export const PayrollTableTotalCount = (state: RootState) => state.payrollTable.data.totalCount;

export const PayrollTableTotalPages = (state: RootState) => state.payrollTable.data.totalPages;

export const PayrollTableLoading = (state: RootState) => state.payrollTable.loading;

export const PayrollTableError = (state: RootState) => state.payrollTable.error;
