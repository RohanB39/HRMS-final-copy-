import { createAsyncThunk } from '@reduxjs/toolkit';

export const editLeaves = createAsyncThunk(
  'editLeavesData/editLeaves',
  async ({ employeeId, leaveId, approvedLeaves, leaveBalance }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://hr.corely.in/api/leaveAssignment/updateLeaves?employeeId=${employeeId}&leaveId=${leaveId}&approvedLeaves=${approvedLeaves}&leaveBalance=${leaveBalance}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update leave details.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);