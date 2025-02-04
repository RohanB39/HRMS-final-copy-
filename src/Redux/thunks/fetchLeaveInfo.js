import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLeaveInfo = createAsyncThunk(
  'leaveAssignments/fetchLeaveInfo',
  async (employeeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://hr.corely.in/api/leaveAssignment/findLeavesByEmp/${employeeId}`
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

