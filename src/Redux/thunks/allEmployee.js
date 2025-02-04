import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const allEmployee = createAsyncThunk(
  'employees/allEmployee',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://hr.corely.in/api/employees/allEmp');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch employees');
    }
  }
);

