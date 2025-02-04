import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const approveCoff = createAsyncThunk(
  "hr/approveCoff",
  async (coffData, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://hr.corely.in/api/leaveAssignment/approveCoff", coffData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve C-off");
    }
  }
);
