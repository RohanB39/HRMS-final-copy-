import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAbsentEmployees = createAsyncThunk(
  'attendance/fetchAbsentEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://hr.corely.in/api/attendance/absentEmployees');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch absent employees');
    }
  }
);
