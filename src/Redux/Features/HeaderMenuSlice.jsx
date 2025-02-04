// src/redux/slices/HeaderMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const headerMenuSlice = createSlice({
  name: "headermenu",
  initialState: { isVisible: true },
  reducers: {
    toggleMenu: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleMenu } = headerMenuSlice.actions;
export default headerMenuSlice.reducer;
