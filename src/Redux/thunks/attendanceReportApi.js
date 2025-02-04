import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const attendanceReportApi = createAsyncThunk(
  "attendance/attendanceReportApi",
  async (reportCriteria, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(reportCriteria).toString();
      const response = await axios.get(
        `https://hr.corely.in/api/attendance/attendanceReport?${queryString}`
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Failed to fetch attendance report");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Server error");
      }
      return rejectWithValue(error.message);
    }
  }
);
