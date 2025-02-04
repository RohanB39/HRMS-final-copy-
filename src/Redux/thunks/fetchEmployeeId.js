import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployeeId = createAsyncThunk(
  'empid/fetchEmployeeId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://hr.corely.in/api/employees/genrateEmpId');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch employee id');
    }
  }
);
