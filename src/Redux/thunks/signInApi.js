import { createAsyncThunk } from "@reduxjs/toolkit";

export const signInApi = createAsyncThunk(
  "auth/signInApi",
  async (signinData, { rejectWithValue }) => {
    try {
      const response = await fetch("https://hr.corely.in/api/attendance/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      // Read the response as plain text
      const data = await response.text();
      return data; // Return the text directly
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
