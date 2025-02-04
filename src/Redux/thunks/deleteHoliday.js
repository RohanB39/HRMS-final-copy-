import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteHoliday = createAsyncThunk(
  'holidaysDelete/deleteHoliday',
  async (holidayId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://hr.corely.in/api/holidays/deleteHoliday/${holidayId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(holidayId),
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
