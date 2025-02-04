import {  createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch and filter on-roll employees
export const OnRollEmpApi = createAsyncThunk(
  'employees/OnRollEmpApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/employees'); 

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      console.log(data)

      
      const onRollEmployees = data.filter(employee => employee.employmenttype === 'Onroll');
      console.log(onRollEmployees)

      return onRollEmployees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
