import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodaysBirthdays = createAsyncThunk(
    'birthday/fetchTodaysBirthdays',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get('https://hr.corely.in/api/employees/todaysBirthDays');
        if (response.status === 204) {
          return [];
        }
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );