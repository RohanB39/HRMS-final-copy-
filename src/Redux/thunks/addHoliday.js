import { createAsyncThunk } from '@reduxjs/toolkit';

export const addHoliday = createAsyncThunk(
  'holidays/addHoliday',
  async (holidayData, { rejectWithValue }) => {
    try {
      const response = await fetch('https://hr.corely.in/api/holidays/addHoliday', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidayData),
      });

      if (!response.ok) {
        throw new Error('Failed to add holiday.');
      }

      // Parse as text since the response is not JSON
      const data = await response.text();
      return data; // Return the plain string from the API response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
