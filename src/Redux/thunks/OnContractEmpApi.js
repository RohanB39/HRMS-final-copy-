import {  createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch and filter on-roll employees
export const OnContractEmpApi = createAsyncThunk(
  'employees/OnContractEmpApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/employees'); 

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      console.log(data)

      
      const OnContractEmployees = data.filter(employee => employee.employmenttype === 'Oncontract');
      console.log(OnContractEmployees)

      return OnContractEmployees;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
