import { createAsyncThunk } from '@reduxjs/toolkit';

export const rejectReguralization = createAsyncThunk(
  'rejectRegularize/rejectReguralization',
  async ({ id }, { rejectWithValue }) => {
    try {
      // Construct the URL with query parameters
      const url = `https://hr.corely.in/api/regularization/rejectRegularize?id=${encodeURIComponent(id)}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add regularize');
      }

      const data = await response.text(); // If the response is plain text, use .text() instead of .json()
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
