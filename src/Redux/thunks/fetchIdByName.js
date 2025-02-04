import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchIdByName = createAsyncThunk(
  'fetchIdbynme/fetchIdByName',
  async (fullName, { rejectWithValue }) => {
    try {
      // Encode the fullName to handle spaces or special characters
      const encodedName = encodeURIComponent(fullName);

      const response = await axios.get(
        `https://hr.corely.in/api/leaves/getEmployeeIdByName?fullname=${encodedName}`
      );

      console.log("API Response:", response.data);
      return response.data; // Ensure this matches the format you're expecting (e.g., { employeeId: '123' })

    } catch (error) {
      // Check for network or other errors
      if (error.response && error.response.data) {
        console.error("API Error:", error.response.data);
        return rejectWithValue(error.response.data); // Handle errors in the API response
      } else if (error.request) {
        console.error("Network Error:", error.request);
        return rejectWithValue("Network Error");
      } else {
        console.error("Error message:", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);
