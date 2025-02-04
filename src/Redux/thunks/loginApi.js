import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginApi = createAsyncThunk(
  "hr/loginApi",
  async (employeeData, { rejectWithValue }) => {
    try {
      const { employeeId, password } = employeeData;
      const response = await axios.post("https://hr.corely.in/api/auth/login", {
        employeeId,
        password,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to connect to the server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Server error");
      }
      return rejectWithValue(error.message);
    }
  }
);
