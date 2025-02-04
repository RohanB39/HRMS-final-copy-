import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPendingLeaves = createAsyncThunk(
    'pendingLeaves/fetchPendingLeaves',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://hr.corely.in/api/leaveApplications/pendingLeaveApplications');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch absent employees');
      }
    }
  );