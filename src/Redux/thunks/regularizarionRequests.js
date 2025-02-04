import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const regularizationRequests = createAsyncThunk(
  "regularizationreq/regularizationRequests",
  async (requestsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://hr.corely.in/api/regularization/submitRegularizationRequests",
        requestsData
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to connect to the server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Failed to submit requests"
        );
      }
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);
