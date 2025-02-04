// src/redux/slices/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { isVisible: false },
  reducers: {
    toggleMenu: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { toggleMenu } = sidebarSlice.actions;
export default sidebarSlice.reducer;
