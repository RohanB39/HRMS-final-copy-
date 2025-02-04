import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
export const registerEmployeeApi = createAsyncThunk(
  "hr/registerEmployeeApi",
  async ({ employeeData, profileImage }, { rejectWithValue }) => {
    try {
      console.log('Employee data in thunk:', employeeData);
      console.log('Profile image in thunk:', profileImage);

      const formData = new FormData();
      formData.append("user", JSON.stringify(employeeData));
      formData.append("profileImage", profileImage);

      console.log('FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post("https://hr.corely.in/api/registration/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
        }
      });

      if (response.status !== 201) {
        throw new Error("Failed to register employee");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);