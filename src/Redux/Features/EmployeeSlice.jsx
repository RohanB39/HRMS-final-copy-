import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLeaves } from "../thunks/fetchAllLeaves";
import { createNewLeaveApplication } from "../thunks/createNewLeaveApplication";
import { fetchLeaveInfo } from "../thunks/fetchLeaveInfo";
import { employeeTotalDetails } from "../thunks/employeeTotalDetails";
import { regularizationRequests } from "../thunks/regularizarionRequests";

// Initial state for the HR slice
const initialState = {
  // for all leaves
  AllLeaves: [],
  status: "idle",
  error: null,

  // for creating leave application
  createApplicationStatus: "idle",
  createApplicationError: null,

  // for leave assignment details
  leaveAssignments: [],

  // for employee total details
  empDetails: [],

  // for regularization requests
  regularizationRequestsStatus: "idle",
  regularizationRequestsError: null,
  regularizationreq: [],
};

const EmployeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchAllLeaves
      .addCase(fetchAllLeaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AllLeaves = action.payload;
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handling createNewLeaveApplication
      .addCase(createNewLeaveApplication.pending, (state) => {
        state.createApplicationStatus = "loading";
        state.createApplicationError = null;
      })
      .addCase(createNewLeaveApplication.fulfilled, (state) => {
        state.createApplicationStatus = "succeeded";
        state.createApplicationError = null;
      })
      .addCase(createNewLeaveApplication.rejected, (state, action) => {
        state.createApplicationStatus = "failed";
        state.createApplicationError = action.payload;
      })

      // Handling Leave Assignment
      .addCase(fetchLeaveInfo.pending, (state) => {
        state.createApplicationStatus = "loading";
        state.createApplicationError = null;
      })
      .addCase(fetchLeaveInfo.fulfilled, (state, action) => {
        state.createApplicationStatus = "succeeded";
        state.leaveAssignments = action.payload;
      })
      .addCase(fetchLeaveInfo.rejected, (state, action) => {
        state.createApplicationStatus = "failed";
        state.createApplicationError = action.payload;
      })

      // Fetching employee total information
      .addCase(employeeTotalDetails.pending, (state) => {
        state.createApplicationStatus = "loading";
        state.createApplicationError = null;
      })
      .addCase(employeeTotalDetails.fulfilled, (state, action) => {
        state.createApplicationStatus = "succeeded";
        state.empDetails = action.payload;
      })
      .addCase(employeeTotalDetails.rejected, (state, action) => {
        state.createApplicationStatus = "failed";
        state.createApplicationError = action.payload;
      })

      .addCase(regularizationRequests.pending, (state) => {
        state.regularizationRequestsStatus = "loading";
        state.regularizationRequestsError = null;
      })
      .addCase(regularizationRequests.fulfilled, (state, action) => {
        state.regularizationRequestsStatus = "succeeded";
        state.regularizationreq = action.payload;
      })
      .addCase(regularizationRequests.rejected, (state, action) => {
        state.regularizationRequestsStatus = "failed";
        state.regularizationRequestsError = action.payload;
      });
  },
});

export default EmployeeSlice.reducer;
