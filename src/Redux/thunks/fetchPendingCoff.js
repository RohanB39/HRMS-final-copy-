import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPendingCoff = createAsyncThunk(
  'pendingCoff/fetchPendingCoff',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://hr.corely.in/api/leaveAssignment/fetchPendingCoff');
      console.log(response);
      return response.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch C-Offs');
    }
  }
);