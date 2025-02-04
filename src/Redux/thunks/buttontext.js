import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const buttontext = createAsyncThunk(
  "buttontextData/buttontext",
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://hr.corely.in/api/attendance/buttonText/${employeeId}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Server error");
      }
      return rejectWithValue(error.message);
    }
  }
);