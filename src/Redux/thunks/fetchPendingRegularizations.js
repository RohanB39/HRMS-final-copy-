import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPendingRegularizations = createAsyncThunk(
  "regularizationsPending/fetchPendingRegularizations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://hr.corely.in/api/regularization/fetchPending");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch pending regularizations"
      );
    }
  }
);
