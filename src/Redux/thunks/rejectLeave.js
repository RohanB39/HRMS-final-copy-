import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const rejectLeave = createAsyncThunk(
  "hr/rejectLeave",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://hr.corely.in/api/leaveApplications/rejectLeave", leaveData);
      return response.data; // Return the updated leave data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve leave");
    }
  }
);