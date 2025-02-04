import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const assignLeave = createAsyncThunk(
  "assignData/assignLeave",
  async (leaveData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://hr.corely.in/api/leaveAssignment/assignLeaves", leaveData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve leave");
    }
  }
);