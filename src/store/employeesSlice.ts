import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployees, type Employee } from '../services/api';

interface EmployeesState {
  employees: Employee[];
  isLoading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  isLoading: false,
  error: null,
};

export const fetchEmployeesAsync = createAsyncThunk(
  'employees/fetchEmployees',
  async (
    { companyId, employeeId }: { companyId: number; employeeId?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchEmployees(companyId, employeeId);
      // Handle different response structures
      const employees = response.data || response.employees || [];
      return employees;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployees: (state) => {
      state.employees = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchEmployeesAsync.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.isLoading = false;
          state.employees = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchEmployeesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearEmployees, clearError } = employeesSlice.actions;
export default employeesSlice.reducer;

