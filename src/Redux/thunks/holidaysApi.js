
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch holidays
export const holidaysApi = createAsyncThunk(
  'holidays/holidaysApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://hr.corely.in/api/holidays/getAllHolidays');

      if (!response.ok) {
        throw new Error('Failed to fetch holidays');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
