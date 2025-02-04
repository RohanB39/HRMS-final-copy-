import { createAsyncThunk } from "@reduxjs/toolkit";

export const signOutApi = createAsyncThunk(
  "auth/signOutApi",
  async (signOutData, { rejectWithValue }) => {
    try {
      console.log("Sending sign-out data:", signOutData);
      const response = await fetch("https://hr.corely.in/api/attendance/signOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signOutData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }
      const data = await response.text();
      console.log("Sign-out response:", data); 
      return data; 
    } catch (error) {
      console.error("Sign-out error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);
