import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const approveLeave = createAsyncThunk(
  "hr/approveLeave",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://hr.corely.in/api/leaveApplications/approveLeave", leaveData);
      return response.data; // Return the updated leave data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve leave");
    }
  }
);
