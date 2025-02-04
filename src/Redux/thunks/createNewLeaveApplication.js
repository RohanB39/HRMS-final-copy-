import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createNewLeaveApplication = createAsyncThunk(
  'leave/createNewLeaveApplication',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://hr.corely.in/api/leaveApplications/createNewApplication', formData);
      return { message: response.data, status: response.status };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data || error.message,
        status: error.response?.status || 500,
      });
    }
  }
);
