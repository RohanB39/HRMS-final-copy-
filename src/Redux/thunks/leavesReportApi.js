import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch leaves
export const leavesReportApi = createAsyncThunk(
  'leavesReport/leavesReportApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://hr.corely.in/api/leaveAssignment/getAllLeaves');
      if (!response.ok) {
        throw new Error('Failed to fetch leaves');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
