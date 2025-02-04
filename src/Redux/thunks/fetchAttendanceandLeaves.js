import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching attendance data
export const fetchAttendanceandLeaves = createAsyncThunk(
  "fetchAttendanceLeaves/fetchAttendanceandLeaves",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://hr.corely.in/api/attendance/attendanceAndLeave");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);