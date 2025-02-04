import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const rejectCoff = createAsyncThunk(
  "hr/rejectCoff",
  async (SrNo, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://hr.corely.in/api/leaveAssignment/rejectCoffreq?srNo=${SrNo}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to approve C-off");
    }
  }
);