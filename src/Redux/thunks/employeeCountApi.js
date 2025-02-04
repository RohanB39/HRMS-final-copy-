import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchEmployeeCount = async () => {
  const response = await fetch('https://hr.corely.in/api/employees/allEmp');

  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }

  const data = await response.json();
  // console.log(data.length);

  return data.length;
};

export const employeeCountApi = createAsyncThunk(
  'hr/fetchEmployeeCount',
  async (_, { rejectWithValue }) => {
    try {
      const employeeCount = await fetchEmployeeCount();
      return employeeCount;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
