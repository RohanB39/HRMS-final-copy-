import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { employeeTotalDetails } from "../../../../../../../Redux/thunks/employeeTotalDetails";
import { holidaysApi } from "../../../../../../../Redux/thunks/holidaysApi";
import moment from "moment";
import { FaCoffee } from "react-icons/fa";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Regularization from "./Regularization";

const MainCalender = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [regularizationDays, setRegularizationDays] = useState([]);
  const [totalExceptions, setTotalExceptions] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workHours, setWorkHours] = useState(0);
  const {
    empDetails = {},
    loading,
    error,
  } = useSelector((state) => state.employees);
  const holidaysFromState = useSelector((state) => state.hr.holidays);
  const [holidays, setHolidays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(employeeTotalDetails(employeeId));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(holidaysApi());
  }, [dispatch]);

  useEffect(() => {
    setHolidays(holidaysFromState || []);
  }, [holidaysFromState]);

  useEffect(() => {
    if (empDetails && holidays) {
      const days = getFilteredDatesByColor(empDetails, holidays, currentMonth);
      setRegularizationDays(days);
      setTotalExceptions(days.length);
    }
  }, [currentMonth, empDetails, holidays]);

  useEffect(() => {
    if (empDetails && currentMonth) {
      const hours = calculateWorkHours(empDetails, currentMonth);
      setWorkHours(hours);
    }
  }, [currentMonth, empDetails]);

  const generateMonthDays = () => {
    const startOfMonth = currentMonth.clone().startOf("month").startOf("week");
    const endOfMonth = currentMonth.clone().endOf("month").endOf("week");
    const days = [];
    let day = startOfMonth.clone();

    while (day.isSameOrBefore(endOfMonth, "day")) {
      days.push(day.clone());
      day.add(1, "day");
    }
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  if (!empDetails || !empDetails.adminDetails) {
    return <div>Loading...</div>;
  }
  const joiningDate = empDetails?.adminDetails?.joiningDate;
  const targetDate = joiningDate
    ? moment(joiningDate)
    : moment().startOf("month");

  const getStatusColor = (date) => {
    if (!empDetails?.attendanceReports) {
      return "";
    }
    const holiday = holidays.find(
      (holiday) =>
        moment(holiday.holidayDate).month() === date.month() &&
        moment(holiday.holidayDate).date() === date.date()
    );
    if (holiday) {
      return "bg-teal-100 dark:bg-teal-950";
    }

    const isOnLeave = empDetails.leaveApplications.find(
      (entry) =>
        moment(entry.status === "Approved") &&
        moment(entry.leaveStartDate).isSame(date, "day")
    );
    if (isOnLeave) {
      return "bg-blue-200 dark:bg-blue-950";
    }
    const attendance = empDetails.attendanceReports.find((entry) =>
      moment(entry.date).isSame(date, "day")
    );
    if (attendance) {
      switch (attendance.status.toLowerCase()) {
        case "present":
          return "bg-green-200 dark:bg-green-900";
        case "absent":
          return "bg-red-100 dark:bg-red-950";
        case "halfday":
          return "bg-yellow-100 dark:bg-yellow-950";
        default:
          return "bg-white";
      }
    }
    if (date.isBetween(targetDate, moment(), "day", "[]") && date.day() !== 0) {
      return "bg-stone-100 dark:bg-neutral-900";
    }
    if (date.day() === 0) {
      return "bg-gray-200 dark:bg-slate-900";
    }
    return "bg-gray-100 dark:bg-gray-900";
  };

  const calculateWorkHours = (empDetails, selectedDate) => {
    const startOfMonth = moment(selectedDate).startOf("month");
    const endOfMonth = moment(selectedDate).endOf("month");
    const allDates = [];
    let currentDate = startOfMonth.clone();
    let totalWorkHours = 0;

    while (currentDate.isSameOrBefore(endOfMonth, "day")) {
      allDates.push(currentDate.clone());
      currentDate.add(1, "day");
    }

    allDates.forEach((date) => {
      const attendance = empDetails.attendanceReports.find((entry) =>
        moment(entry.date).isSame(date, "day")
      );
      if (attendance) {
        const workHours = attendance.workHours || 0;
        switch (attendance.status.toLowerCase()) {
          case "present":
          case "halfday":
            totalWorkHours += Number(workHours);
            break;
          default:
            break;
        }
      }
    });

    return totalWorkHours;
  };

  const getFilteredDatesByColor = (empDetails, holidays, selectedDate) => {
    const targetDate = moment(empDetails?.adminDetails?.joiningDate);
    const startOfMonth = moment(selectedDate).startOf("month");
    const endOfMonth = moment(selectedDate).endOf("month");

    const allDates = [];
    let currentDate = startOfMonth.clone();
    while (currentDate.isSameOrBefore(endOfMonth, "day")) {
      allDates.push(currentDate.clone());
      currentDate.add(1, "day");
    }

    const filteredDates = allDates.filter((date) => {
      const bgColor = getStatusColor(date, empDetails, holidays, targetDate);
      return (
        bgColor === "bg-red-100 dark:bg-red-950" ||
        bgColor === "bg-yellow-100 dark:bg-yellow-950" ||
        bgColor === "bg-stone-100 dark:bg-neutral-900"
      );
    });

    return filteredDates.map((date) => {
      const formattedDate = date.format("YYYY-MM-DD");

      // Check if the date is in attendanceReports
      const attendance = empDetails.attendanceReports.find(
        (report) => report.date === formattedDate
      );

      // Return the required structure
      return {
        employeeId: empDetails.adminDetails.employeeid,
        date: formattedDate,
        signInId: attendance ? attendance.signInId : "No ID",
        status: attendance ? attendance.status : "Regularization",
      };
    });
  };

  const getTileContent = (date) => {
    if (!empDetails?.attendanceReports) {
      return "";
    }
    const holiday = holidays.find(
      (holiday) =>
        moment(holiday.holidayDate).month() === date.month() &&
        moment(holiday.holidayDate).date() === date.date()
    );
    if (holiday) {
      return "H";
    }
    const isOnLeave = empDetails.leaveApplications.find(
      (entry) =>
        moment(entry.status === "Approved") &&
        moment(entry.leaveStartDate).isSame(date, "day")
    );
    if (isOnLeave) {
      return "L";
    }
    const attendance = empDetails.attendanceReports.find((entry) =>
      moment(entry.date).isSame(date, "day")
    );
    if (attendance) {
      const status = attendance.status.toLowerCase();
      if (status === "present") {
        return `P`;
      }
      if (status === "absent") {
        return `A`;
      }
      if (status === "halfday") {
        return `HD`;
      }
    }
    if (date.isBetween(targetDate, moment(), "day", "[]") && date.day() !== 0) {
      return "N";
    }

    if (date.day() === 0) {
      return (
        <FaCoffee className="w-5 h-5 text-gray-600 dark:text-darkAccent" />
      );
    }
    return "";
  };

  const handleTileClick = (date) => {
    setSelectedDate(date);
  };

  const monthDays = generateMonthDays();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = moment(selectedDate);
  const todayAttendance = empDetails.attendanceReports.find((entry) =>
    moment(entry.date).isSame(today, "day")
  );
  const leaveDays = empDetails.leaveApplications.find((entry) =>
    moment(entry.leaveStartDate).isSame(today, "day")
  );
  const holidaysDay = holidays.find((entry) =>
    moment(entry.holidayDate).isSame(today, "day")
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="md:w-[95%] grid ld:grid-cols-2 mx-auto lg:flex">
      {/* Left Panel - Calendar */}
      <div className="w-full  p-6 bg-white dark:bg-darkmainBg">
        <div className="border dark:border-darkDevider dark:bg-darkmainBg ">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousMonth}
              className="flex items-center px-1 py-2 text-gray-500 dark:text-darkAccent font-Work text-sm dark:text-darkMuted hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Prev
            </button>
            <h2 className="text-base dark:text-darkPrimaryText tracking-wide">
              {currentMonth.format("MMMM YYYY")}
            </h2>
            <button
              onClick={handleNextMonth}
              className="flex items-center px-1 py-2 text-gray-500 dark:text-darkAccent font-Work text-sm dark:text-darkMuted hover:text-gray-700"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mt-4 text-center text-gray-800 border dark:border-darkDevider dark:bg-darkmainBg p-2">
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="text-gray-700  font-normal  dark:text-darkMuted text-sm"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 mt-2 font-Work">
            {monthDays.map((day, index) => {
              const tileContent = getTileContent(day);
              const isAbsent = tileContent === "A";
              const textColorClass = isAbsent
                ? "text-red-500"
                : "text-gray-600 dark:text-darkAccent";

              return (
                <div
                  key={index}
                  className={`h-20 cursor-pointer flex flex-col items-center justify-center relative ${getStatusColor(
                    day
                  )}`}
                  title={day.format("DD MMM YYYY")}
                  onClick={() => handleTileClick(day)}
                >
                  <span className="absolute top-1 left-2 text-sm text-gray-600 dark:text-darkAccent">
                    {day.format("D")}
                  </span>
                  <span className={textColorClass}>{tileContent}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Right Panel - Details */}
      <div className="w-full font-Work  p-6 bg-white overflow-y-auto dark:bg-darkmainBg">
        <div
          className="p-4 bg-white dark:bg-darkmainBg border border-gray-200 dark:border-darkDevider"
          style={{ minHeight: "150px" }}
        >
          {/* attendance portaion */}
          {todayAttendance ? (
            <>
              <h3 className="text-lg font-Work dark:text-darkPrimaryText">
                Attendance Details On {todayAttendance.date}
              </h3>
              <div className="flex gap-7 mt-4 items-center justify-start w-full overflow-scroll pb-5">
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Sign In
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.signInTime || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Sign Out
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.signOutTime || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Shift Hrs
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.shiftHours || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Work Hrs
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.workHours || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    OT
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.isOT || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Late In
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.isLateIn || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Late Out
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.isLateOut || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    First In
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.isFirstIn || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    First Out
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.isFirstOut || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Date
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.date || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Status
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.status || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    OT Hrs
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {todayAttendance.othours || "-"}
                  </p>
                </div>
              </div>
            </>
          ) : // leaves portion
          leaveDays ? (
            <>
              <h3 className="text-lg font-Work dark:text-darkPrimaryText">
                Leave Details On {leaveDays.leaveStartDate}
              </h3>
              <div className="flex gap-7 mt-4 items-center justify-start w-full overflow-scroll pb-5">
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Leave Type
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.leaveType || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Leave From
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.leaveStartDate || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Leave End
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.leaveEndDate || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Total Days
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.totalLeaveDays || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Reason
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.reason || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Applied Date
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.applicationDate || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Status
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.status || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Approved By
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.approverName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Approval Date
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {leaveDays.approvalDate || "-"}
                  </p>
                </div>
              </div>
            </>
          ) : // holidays portion
          holidaysDay ? (
            <>
              <h3 className="text-lg font-Work dark:text-darkPrimaryText">
                Holiday Details On {holidaysDay.holidayDate}
              </h3>
              <div className="flex gap-7 mt-4 items-center justify-start w-full overflow-scroll pb-5">
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Holiday Name
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.holidayName || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Holiday Date
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.holidayDate || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Day
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.dayOfWeek || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Type
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.type || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Location
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.location || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-darkmainBg font-Work text-sm tracking-wide  text-nowrap dark:text-gray-300">
                    Description
                  </p>
                  <p className="text-nowrap font-normal text-sm text-gray-700 mt-2 dark:text-gray-400">
                    {holidaysDay.description || "-"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full leading-6">
              <p className="text-start text-gray-600 dark:text-darkAccent font-Work text-sm dark:text-darkMuted">
                Please click on any valid "HD", "A", "H", "L", "P" date to see
                details
              </p>
              <p className="text-start text-sm  text-gray-600 dark:text-darkMuted">
                HD - Half Day
              </p>
              <p className="text-start text-sm  text-gray-600 dark:text-darkMuted">
                A - Absent
              </p>
              <p className="text-start text-sm  text-gray-600 dark:text-darkMuted">
                H - Holiday
              </p>
              <p className="text-start text-sm  text-gray-600 dark:text-darkMuted">
                L - On Leave
              </p>
              <p className="text-start text-sm  text-gray-600 dark:text-darkMuted">
                P - Present
              </p>
            </div>
          )}
        </div>

        <div className="border mt-2 flex items-center justify-start  dark:border-darkDevider  text-sm bg-yellow-300 dark:bg-darkModalBg">
          {regularizationDays && (
            <div>
              <div className="flex items-center justify-between p-2">
                <div className="flex">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />{" "}
                  {/* Danger Icon */}
                  <span className="font-Work dark:text-darkAccent">
                    {totalExceptions} exception Day(s)
                  </span>
                </div>
                <button
                  className="ml-10 dark:text-blue-400 hover:underline text-blue-800"
                  onClick={handleOpenModal}
                >
                  Regularize
                </button>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Regularization
                onClose={handleCloseModal}
                regularizationDays={regularizationDays}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-4 mt-4">
          <div className="border  dark:border-darkDevider dark:bg-darkmainBg">
            <div className="border-b p-2 dark:border-b-blue-950">
              <p className="text-gray-500 text-sm text-center font-Work font-normal dark:text-darkAccent">
                SHIFT.WORK HRS
              </p>
            </div>
            <div className="flex items-center justify-center p-4 dark:text-darkAccent3">
              <span>09 Hrs</span>
            </div>
          </div>
          <div className="border  dark:border-darkDevider dark:bg-darkmainBg">
            <div className="border-b p-2 dark:border-b-blue-950">
              <p className="text-gray-500 text-sm text-center font-Work font-normal dark:text-darkAccent">
                AVG.WORK HRS
              </p>
            </div>
            <div className="flex items-center justify-center p-4 dark:text-darkAccent3">
              <span>{(workHours / 26).toFixed(2)} Hrs</span>
            </div>
          </div>
          <div className="border dark:border-darkDevider dark:bg-darkmainBg">
            <div className="border-b p-2 dark:border-b-blue-950">
              <p className="text-gray-500 text-sm text-center font-Work font-normal dark:text-darkAccent">
                PENELTY DAYS
              </p>
            </div>
            <div className="flex items-center justify-center p-4 dark:text-darkAccent3">
              <span>{totalExceptions} Days</span>
            </div>
          </div>
        </div>

        <div className="mt-4 font-Work border  p-5 dark:text-darkAccent dark:border-darkDevider dark:bg-darkmainBg">
          <h3 className="text-lg mb-3 dark:text-darkPrimaryText font-Work">
            Legends
          </h3>
          <hr className="mt-2 mb-4 dark:border-darkDevider" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-green-200 dark:bg-green-900 p-5 flex items-center justify-center">
                P
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Present
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-red-100 dark:bg-red-900 flex p-5 items-center justify-center text-red-400">
                A
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Absent
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 p-5 flex items-center justify-center">
                HD
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Half Day
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-teal-100 dark:bg-teal-900 flex p-5 items-center justify-center">
                H
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Holiday
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-blue-200 dark:bg-blue-950 flex p-5 items-center justify-center">
                L
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                On Leave
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-stone-100 dark:bg-neutral-900 flex p-5 items-center justify-center">
                N
              </span>
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Not Marked
              </span>
            </div>
            <div className="flex items-center">
              <FaCoffee className="w-5 h-5 text-gray-600 dark:text-darkAccent" />
              <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                Sunday
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCalender;
