import { createAsyncThunk } from "@reduxjs/toolkit";

export const AddCoffRequest = createAsyncThunk(
  'AddCoffRequest/AddCoffRequest',
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Dispatching formData:", formData);

      const response = await fetch('https://hr.corely.in/api/leaveAssignment/addCoffRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() }; // Convert text response to JSON format
      }

      console.log("API Response:", data);

      if (!response.ok) {
        return rejectWithValue(data.message || "Something went wrong");
      }

      return data; // Ensure success response is properly structured
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

