import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

import Coverpage from "./Pages/CoverPage";
import Login from "./Component/AuthLayout/Login";
import ForgotPassword from "./Component/AuthLayout/ForgotPassword";
import Registeration from "./Component/AuthLayout/Register";
import RightSideLogin from "./Pages/FixedRightSide";
import NotFoundPage from "./Component/AuthLayout/NotFound";
import VerifyOTP from "./Component/AuthLayout/VerifyOtp";

// Dashboard Components
import AdminDash from "./Component/DashboardLayout/AdminLayout/AdminDashboardContainer";
import UserDash from "./Component/DashboardLayout/UserLayout/UserDashboardContainer";

// Menus
import LeaveManagementMain from "./Component/DashboardLayout/AdminLayout/AdminDashboard/HeaderMenu/Menues/LeaveManagment/LeaveManagementMain";
import EmployeeProfile from "./Component/DashboardLayout/AdminLayout/AdminMainContent/EmployeeProfile/EmployeeProfile";
import EmployeeDirectoryContainer from "./Component/DashboardLayout/AdminLayout/AdminDashboard/HeaderMenu/Menues/EmployeeDirectory/EmployeeDirectoryContainer";
import AttendanceReportContainer from "./Component/DashboardLayout/AdminLayout/AdminDashboard/HeaderMenu/Menues/AttendanceReport/AttendanceReportContainer";
import LeaveManagement from "./Component/DashboardLayout/UserLayout/UserDashboard/HeaderMenu/Menues/LeaveRecord/LeaveManagement";
import AttendanceCalendarEMP from "./Component/DashboardLayout/UserLayout/UserDashboard/HeaderMenu/Menues/AttendanceRecord/AttendanceCalendarEMP";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Coverpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgotPass",
    element: <ForgotPassword />,
  },
  {
    path: "/register",
    element: <Registeration />,
  },
  {
    path: "/verifyotp",
    element: <VerifyOTP />,
  },
  {
    path: "/rightside",
    element: <RightSideLogin />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },

  // **Protected Routes**
  {
    path: "/adminDashboard",
    element: (
      <ProtectedRoute>
        <AdminDash />
      </ProtectedRoute>
    ),
  },
  {
    path: "/userDashboard",
    element: (
      <ProtectedRoute>
        <UserDash />
      </ProtectedRoute>
    ),
  },
  {
    path: "/manageLeaves",
    element: (
      <ProtectedRoute>
        <LeaveManagementMain />
      </ProtectedRoute>
    ),
  },
  {
    path: "/allemployees",
    element: (
      <ProtectedRoute>
        <EmployeeDirectoryContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/viewEmployee/:id",
    element: (
      <ProtectedRoute>
        <EmployeeProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/attendance",
    element: (
      <ProtectedRoute>
        <AttendanceReportContainer />
      </ProtectedRoute>
    ),
  },
  {
    path: "/leavesRecords",
    element: (
      <ProtectedRoute>
        <LeaveManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/attendanceRecords",
    element: (
      <ProtectedRoute>
        <AttendanceCalendarEMP />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const body = document.body;

    if (darkMode) {
      body.classList.add("dark");
      body.classList.remove("bg-white");
      body.classList.add("bg-darkmainBg");
    } else {
      body.classList.remove("dark");
      body.classList.add("bg-white");
      body.classList.remove("bg-darkmainBg");
    }
  }, [darkMode]);

  return (
    <>
      <Toaster reverseOrder={true} />
      <div className={`${darkMode ? "dark" : ""} `}>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
