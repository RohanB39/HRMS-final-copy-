import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTodaysPresenty = createAsyncThunk(
  'hr/fetchTodaysPresenty',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://hr.corely.in/api/attendance/todaysSignIns');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      const todaystotalPresence = data.reduce((total, item) => total + (item.isLateIn ? 1 : 0), 0);

      return { todaystotalPresence, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
