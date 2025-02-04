import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const employeeTotalDetails = createAsyncThunk(
  'empDetails/employeeTotalDetails',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://hr.corely.in/api/employees/${employeeId}/totalDetails`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);