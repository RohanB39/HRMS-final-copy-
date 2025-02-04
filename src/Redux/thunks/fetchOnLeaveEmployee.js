import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOnLeaveEmployee = createAsyncThunk(
    'OnLeave/fetchOnLeaveEmployee',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://hr.corely.in/api/leaveApplications/fetchApproved');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch absent employees');
      }
    }
  );