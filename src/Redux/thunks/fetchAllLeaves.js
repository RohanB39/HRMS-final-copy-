import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllLeaves = createAsyncThunk(
    'AllLeaves/fetchAllLeaves',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://hr.corely.in/api/leaves/getAllLeaves');
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch leaves');
      }
    }
  );