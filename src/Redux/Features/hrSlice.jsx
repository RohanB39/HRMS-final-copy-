import { createSlice } from "@reduxjs/toolkit";
import { registerEmployeeApi } from "../thunks/registerEmployeeApi";
import { loginApi } from "../thunks/loginApi";
import { employeeCountApi } from "../thunks/employeeCountApi";
import { OnRollEmpApi } from "../thunks/OnRollEmpApi";
import { OnContractEmpApi } from "../thunks/OnContractEmpApi";
import { holidaysApi } from "../thunks/holidaysApi";
import { signInApi } from "../thunks/signInApi";
import { signOutApi } from "../thunks/signOutApi";
import { fetchTodaysPresenty } from "../thunks/fetchTodaysPresentyApi";
import { leavesReportApi } from "../thunks/leavesReportApi";
import { allEmployee } from "../thunks/allEmployee";
import { fetchTodaysBirthdays } from "../thunks/fetchTodaysBirthdays";
import { fetchAbsentEmployees } from "../thunks/fetchAbsentEmployees";
import { fetchEmployeeId } from "../thunks/fetchEmployeeId";
import { fetchPendingLeaves } from "../thunks/fetchPendingLeaves";
import { approveLeave } from "../thunks/approveLeave";
import { rejectLeave } from "../thunks/rejectLeave";
import { fetchAttendance } from "../thunks/fetchAttendance";
import { fetchOnLeaveEmployee } from "../thunks/fetchOnLeaveEmployee";
import { fetchAttendanceOnId } from "../thunks/fetchAttendanceOnId";
import { fetchPendingRegularizations } from "../thunks/fetchPendingRegularizations";
import { addRegularize } from "../thunks/addRegularize";
import { rejectReguralization } from "../thunks/rejectReguralization";
import { updateWithSignInId } from "../thunks/updateWithSignInId";
import { addHoliday } from "../thunks/addHoliday";
import { deleteHoliday } from "../thunks/deleteHoliday";

import { fetchAttendanceandLeaves } from "../thunks/fetchAttendanceandLeaves";
import { AddCoffRequest } from "../thunks/AddCoffRequest";
import { fetchPendingCoff } from "../thunks/fetchPendingCoff";
import { rejectCoff } from "../thunks/rejectCoff";
import { approveCoff } from "../thunks/approveCoff";
import { lveNotAssign } from "../thunks/lveNotAssign";
import { assignLeave } from "../thunks/assignLeave";

import {buttontext} from "../thunks/buttontext"

// Initial state for the HR slice
const initialState = {
  employees: [],
  allEmployeeData: [],
  employeeCount: 0,
  onRollEmployees: [],
  onContractEmployees: [],
  leavesReportData: [],
  signInEmployee: null, // Tracks employee attendance (sign-in)
  holidays: [],
  formData: {
    basicInfo: {},
    additionalInfo: {},
    personalInfo: {},
  },
  status: "idle",
  error: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
  employeeProfile: null,
  signInEmployee: localStorage.getItem("employeeId") || false,
  isSignedIn: localStorage.getItem("employeeId") || null,

  // for presenty (attendance)
  todaystotalPresence: 0,
  todayspresenceList: [],

  // todaysBirthdays
  todaysBirthdays: [],

  //todays absent employees
  absentEmployees: [],

  //employee id
  empid: "",

  //pending Leaves
  pendingLeaves: [],

  //pending coff
  pendingCoff: [],

  //Pending leaves approval
  approveLeaves: [],

  //Pending approve Coff
  approveCoff: [],

  //Pending leaves reject
  rejectLeave: [],

  //Pending Coff rehet
  rejectCoff: [],

  // employee from attendencereport
  employeeAttendence: [],

  //for approved Leaves
  OnLeave: [],

  //For fetching attendanceOn id
  attendanceonId: [],

  // fetchPending regularization requests
  regularizationsPending: [],

  //add regularization all
  addRegularize: [],

  //reject Regelarization
  rejectRegularize: [],

  //update Regelarization
  updateRegularize: [],

  // addholiday data
  holidays: [],

  // delete data
  holidaysDelete: [],

  // fetch attendance and leave
  fetchAttendanceLeaves: [],

  // AddCoffRequest
  addCoffRequest: [],

  // fetch lve not assigned emp
  fetchNotAssignedLeaves: [],

  // assign leave
  assignData: [],

  // for Button text
  buttontextData: [],
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    // Update form data
    updateFormData: (state, action) => {
      const { section, data } = action.payload;
      state.formData[section] = data;
    },

    // Reset form data
    resetFormData: (state) => {
      state.formData = { basicInfo: {}, additionalInfo: {}, personalInfo: {} };
    },

    // Add new employee
    addEmployee: (state, action) => {
      const newEmployee = action.payload;
      state.employees.push(newEmployee);
    },

    // Set loading or error status
    setStatus: (state, action) => {
      state.status = action.payload;
    },

    // Set error in case of failure
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Action for user login success
    loginSuccess: (state, action) => {
      const loggedInUser = action.payload;
      state.isAuthenticated = true;
      state.loggedInUser = loggedInUser;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    },

    // Action to log out the user (clear authentication and sign-in)
    logout: (state) => {
      state.isAuthenticated = false;
      state.loggedInUser = null;
      state.signInEmployee = null;
      state.isSignedIn = false;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loggedInUser");
    },

    signInEmployee: (state, action) => {
      state.signInEmployee = action.payload;
      localStorage.setItem("employeeId", JSON.stringify(action.payload));
    },
    signOutEmployee: (state) => {
      state.signInEmployee = null;
      localStorage.removeItem("employeeId");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register employee thunk
      .addCase(registerEmployeeApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerEmployeeApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(registerEmployeeApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login API thunk
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.loggedInUser = action.payload;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Employee count API
      .addCase(employeeCountApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(employeeCountApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employeeCount = action.payload;
      })
      .addCase(employeeCountApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // On-roll employee API
      .addCase(OnRollEmpApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(OnRollEmpApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.onRollEmployees = action.payload;
      })
      .addCase(OnRollEmpApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // On-contract employee API
      .addCase(OnContractEmpApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(OnContractEmpApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.onContractEmployees = action.payload;
      })
      .addCase(OnContractEmpApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Holidays API
      .addCase(holidaysApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(holidaysApi.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays = action.payload;
      })
      .addCase(holidaysApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sign-in API (Attendance marking)
      .addCase(signInApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInApi.fulfilled, (state, action) => {
        console.log("Sign-in response:", action.payload); // Log the plain text
        state.isLoading = false;
        state.signInEmployee = action.payload; // You may not need to store this if it's just a message
        state.isSignedIn = true;
      })

      .addCase(signInApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle sign-out API
      .addCase(signOutApi.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signOutApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.signInEmployee = null;
        state.isSignedIn = false;
        localStorage.removeItem("employeeId");
      })
      .addCase(signOutApi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Today's presence API
      .addCase(fetchTodaysPresenty.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodaysPresenty.fulfilled, (state, action) => {
        state.loading = false;
        state.todaystotalPresence = action.payload.todaystotalPresence;
        state.todayspresenceList = action.payload.data;
      })
      .addCase(fetchTodaysPresenty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All Employees API
      .addCase(allEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.allEmployeeData = action.payload;
      })
      .addCase(allEmployee.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // All Leaves report
      .addCase(leavesReportApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leavesReportApi.fulfilled, (state, action) => {
        state.loading = false;
        state.leavesReportData = action.payload;
      })
      .addCase(leavesReportApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // Todays Birthdays
      .addCase(fetchTodaysBirthdays.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodaysBirthdays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todaysBirthdays = action.payload;
      })
      .addCase(fetchTodaysBirthdays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch birthdays";
      })

      //For absent employees
      .addCase(fetchAbsentEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbsentEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.absentEmployees = action.payload;
      })
      .addCase(fetchAbsentEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For employee id
      .addCase(fetchEmployeeId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeId.fulfilled, (state, action) => {
        state.loading = false;
        state.empid = action.payload;
      })
      .addCase(fetchEmployeeId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For pending leaves
      .addCase(fetchPendingLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLeaves = action.payload;
      })
      .addCase(fetchPendingLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Approve Leaves
      .addCase(approveLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.approveLeaves = action.payload;
      })
      .addCase(approveLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Reject Leaves
      .addCase(rejectLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectLeave.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectLeave = action.payload;
      })
      .addCase(rejectLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For pending Coff
      .addCase(fetchPendingCoff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingCoff.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingCoff = action.payload;
      })
      .addCase(fetchPendingCoff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Approve Leaves
      .addCase(approveCoff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveCoff.fulfilled, (state, action) => {
        state.loading = false;
        state.approveCoff = action.payload;
      })
      .addCase(approveCoff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //For Reject Coff
      .addCase(rejectCoff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectCoff.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectCoff = action.payload;
      })
      .addCase(rejectCoff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // employees's attendence API
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeAttendence = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For on leave employees
      .addCase(fetchOnLeaveEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOnLeaveEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.OnLeave = action.payload;
      })
      .addCase(fetchOnLeaveEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch attendance on id
      .addCase(fetchAttendanceOnId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceOnId.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceonId = action.payload;
      })
      .addCase(fetchAttendanceOnId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //fetch pendign regularization requests
      .addCase(fetchPendingRegularizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRegularizations.fulfilled, (state, action) => {
        state.loading = false;
        state.regularizationsPending = action.payload;
      })
      .addCase(fetchPendingRegularizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //add regularization all
      .addCase(addRegularize.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRegularize.fulfilled, (state, action) => {
        state.loading = false;
        state.addRegularize = action.payload;
      })
      .addCase(addRegularize.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //reject regularization
      .addCase(rejectReguralization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectReguralization.fulfilled, (state, action) => {
        state.loading = false;
        state.rejectRegularize = action.payload;
      })
      .addCase(rejectReguralization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //update regularization
      .addCase(updateWithSignInId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWithSignInId.fulfilled, (state, action) => {
        state.loading = false;
        state.updateRegularize = action.payload;
      })
      .addCase(updateWithSignInId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      // add holiday
      .addCase(addHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.holidays.push(action.payload); // Add new holiday to the list
      })
      .addCase(addHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save the error message
      })

      // delete holiday
      .addCase(deleteHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteHoliday = action.payload;
      })
      .addCase(deleteHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Save the error message
      })

      //fetch attendance and leave
      .addCase(fetchAttendanceandLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceandLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchAttendanceLeaves = action.payload;
      })
      .addCase(fetchAttendanceandLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //add regularization all
      .addCase(AddCoffRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddCoffRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.addCoffRequest = action.payload;
      })
      .addCase(AddCoffRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      //fetch leave not assigned employees
      .addCase(lveNotAssign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(lveNotAssign.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== state.fetchNotAssignedLeaves) {
          // Prevent unnecessary updates
          state.fetchNotAssignedLeaves = action.payload;
        }
      })
      .addCase(lveNotAssign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        console.error("Thunk Error:", action.payload); // Debug log
      })

      // assign leave data
      .addCase(assignLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignLeave.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload !== state.fetchNotAssignedLeaves) {
          state.assignData = action.payload;
        }
      })
      .addCase(assignLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        console.error("Thunk Error:", action.payload); // Debug log
      })

      //fetch attendance and leave
      .addCase(buttontext.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(buttontext.fulfilled, (state, action) => {
        state.loading = false;
        state.buttontextData = action.payload;
      })
      .addCase(buttontext.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for use in components
export const {
  updateFormData,
  resetFormData,
  addEmployee,
  setStatus,
  setError,
  loginSuccess,
  logout,
  signInEmployee,
  signOutEmployee,
  holidays,
  employeeAttendence,
} = hrSlice.actions;

// Export the reducer to be used in the store
export default hrSlice.reducer;
