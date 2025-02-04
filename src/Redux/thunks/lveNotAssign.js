import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const lveNotAssign = createAsyncThunk(
  'fetchNotAssignedLeaves/lveNotAssign',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://hr.corely.in/api/leaves/notAssignedLeave");
      return response.data;
    } catch (error) {
      console.error("API Error:", error); // Debug log
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue("Network Error");
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);