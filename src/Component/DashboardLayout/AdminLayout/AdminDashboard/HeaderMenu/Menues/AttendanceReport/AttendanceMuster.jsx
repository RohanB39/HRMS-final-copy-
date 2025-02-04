import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import moment from "moment";
import { fetchAttendanceandLeaves } from "../../../../../../../Redux/thunks/fetchAttendanceandLeaves";
import { FaCoffee } from "react-icons/fa";

const AttendanceMuster = () => {
  const dispatch = useDispatch();
  const {
    fetchAttendanceLeaves = [],
    loading,
    error,
  } = useSelector((state) => state.hr);

  const [monthDays, setMonthDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchAttendanceandLeaves());
  }, [dispatch, currentMonth]);

  useEffect(() => {
    generateMonthDays(currentMonth);
  }, [currentMonth]);

  useEffect(() => {
    if (
      fetchAttendanceLeaves?.attendancereport &&
      fetchAttendanceLeaves?.LeaveApplications
    ) {
      const attendanceReport = fetchAttendanceLeaves.attendancereport;
      const leaveApplications = fetchAttendanceLeaves.LeaveApplications;

      let startDate = moment(currentMonth)
        .date(25)
        .subtract(1, "months")
        .format("YYYY-MM-DD");
      let endDate = moment(currentMonth).date(26).format("YYYY-MM-DD");

      const updatedData = attendanceReport.reduce((acc, curr) => {
        if (curr.date >= startDate && curr.date <= endDate) {
          if (!acc[curr.employeeId]) {
            acc[curr.employeeId] = {
              employeeId: curr.employeeId,
              employeeName: curr.fullName || `Employee ${curr.employeeId}`,
              attendance: {},
              presentCount: 0,
              leaveStatus: {},
            };
          }
          acc[curr.employeeId].attendance[curr.date] = curr.status;
          if (curr.status === "Present") {
            acc[curr.employeeId].presentCount += 1;
          }
        }
        return acc;
      }, {});

      // Process leave data
      leaveApplications.forEach((leave) => {
        const leaveStartDate = moment(leave.leaveStartDate).format(
          "YYYY-MM-DD"
        );
        const leaveEndDate = moment(leave.leaveEndDate).format("YYYY-MM-DD");

        if (
          moment(leaveStartDate).isBetween(startDate, endDate, "days", "[]") ||
          moment(leaveEndDate).isBetween(startDate, endDate, "days", "[]")
        ) {
          if (!updatedData[leave.employeeId]) {
            updatedData[leave.employeeId] = {
              employeeId: leave.employeeId,
              employeeName: leave.fullName,
              attendance: {},
              presentCount: 0,
              leaveStatus: {},
            };
          }

          // Assign leave type short code
          const leaveType =
            leave.leaveType === "Earn Leave"
              ? "EL"
              : leave.leaveType.substring(0, 2).toUpperCase();

          for (
            let m = moment(leaveStartDate);
            m.isBefore(moment(leaveEndDate).add(1, "days"));
            m.add(1, "days")
          ) {
            const dateKey = m.format("YYYY-MM-DD");
            updatedData[leave.employeeId].leaveStatus[dateKey] = leaveType;
          }
        }
      });

      setEmployeeData(Object.values(updatedData));
    }
  }, [fetchAttendanceLeaves, monthDays]);

  const generateMonthDays = (month) => {
    let startDate = moment(month).date(25).subtract(1, "months");
    let endDate = moment(month).date(26);
    let daysArray = [];

    while (startDate.isBefore(endDate) || startDate.isSame(endDate, "day")) {
      daysArray.push({
        date: startDate.format("YYYY-MM-DD"),
        day: startDate.format("ddd"),
      });
      startDate.add(1, "day");
    }
    setMonthDays(daysArray);
  };

  const handleMonthChange = (step) => {
    setCurrentMonth((prevMonth) => moment(prevMonth).add(step, "months"));
  };

  const getAttendanceBadge = (status, day) => {
    if (day.day === "Sun") {
      return "O";
    }
    switch (status) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      case "HalfDay":
        return "HD";
      case "SH":
        return "SHD";
      case "SI":
        return "SL";
      case "EL":
        return "EL";
      case "CL":
        return "CL";
      default:
        return "-";
    }
  };

  const getFormattedHeader = () => {
    if (monthDays.length === 0) {
      return "Loading...";
    }
    let startMonth = moment(monthDays[0].date).format("MMMM YYYY");
    let endMonth = moment(monthDays[monthDays.length - 1].date).format(
      "MMMM YYYY"
    );
    return startMonth === endMonth
      ? `${startMonth}`
      : `${startMonth} - ${endMonth}`;
  };

  const filteredEmployeeData = employeeData.filter(
    (employee) =>
      Object.keys(employee.attendance).length > 0 ||
      Object.keys(employee.leaveStatus).length > 0
  );

  // *Pagination Logic*
  const totalPages = Math.ceil(filteredEmployeeData.length / rowsPerPage);
  const displayedEmployees = filteredEmployeeData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  console.log(displayedEmployees);
  const getCellBackgroundColor = (status, day) => {
    if (day.day === "Sun")
      return "bg-white dark:bg-darknavbarBg dark:text-white";
    switch (status) {
      case "Present":
        return "bg-green-600 dark:bg-green-500";
      case "Absent":
        return "bg-red-400 dark:bg-red-600";
      case "HalfDay":
        return "bg-yellow-200 dark:bg-yellow-400";
      case "Leave":
        return "bg-blue-600 dark:bg-blue-500";
      case "SH":
        return "bg-pink-600 dark:bg-pink-500 text-white";
      case "SI":
        return "bg-fuchsia-600 dark:bg-fuchsia-500 text-white";
      case "EL":
        return "bg-neutral-600 dark:bg-neutral-500 text-white";
      case "CL":
        return "bg-cyan-600 dark:bg-cyan-500";
      case "CO":
        return "bg-slate-600 dark:bg-slate-500";
      default:
        return "bg-white dark:bg-darkmainBg ";
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 flex items-center text-sm gap-2 dark:text-darkAccent3 dark:bg-darkModalBg"
          onClick={() => handleMonthChange(-1)}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </span>
        </button>
        <h2 className="text-[12px] md:text-lg font-normal font-Work tracking-wide dark:text-darkAccent3">
          From ({getFormattedHeader()})
        </h2>
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 flex items-center text-sm gap-2 dark:text-darkAccent3 dark:bg-darkModalBg"
          onClick={() => handleMonthChange(1)}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
              />
            </svg>
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading attendance data, please wait..." />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="h-16 text-nowrap">
                <tr className="bg-gray-100 dark:bg-darkModalBg">
                  <th className=" p-4 dark:border-darkDevider sticky left-0 dark:text-darkPrimaryText dark:bg-darkModalBg bg-gray-100 font-normal text-sm font-Work">
                    Employee <br /> Name
                  </th>
                  <th className="border p-4 dark:border-darkDevider dark:text-darkPrimaryText dark:bg-darkModalBg bg-gray-100 font-normal text-sm font-Work w-4">
                    Present <br /> Days
                  </th>
                  {monthDays.map((day) => (
                    <th
                      key={day.date}
                      className="border p-4 dark:border-darkDevider dark:text-darkPrimaryText dark:bg-darkModalBg bg-gray-100 font-normal text-sm font-Work w-4"
                    >
                      {day.date.split("-")[2]} <br /> {day.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedEmployees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td className=" text-sm p-4 dark:bg-darkmainBg text-nowrap bg-white dark:text-darkAccent3 sticky left-0">
                      {employee.employeeName}
                    </td>
                    <td className="border  text-sm p-4 dark:border-darkDevider dark:bg-darksidebarBg bg-gray-50 text-center dark:text-darkAccent3">
                      {employee.presentCount}
                    </td>
                    {monthDays.map((day) => (
                      <td
                        key={day.date}
                        className={`border p-4 text-sm text-center dark:border-darkDevider ${getCellBackgroundColor(
                          employee.leaveStatus[day.date] || employee.attendance[day.date],
                          day
                        )}`}
                      >
                        {getAttendanceBadge(
                          employee.leaveStatus[day.date] || employee.attendance[day.date],
                          day
                        )}
                      </td>

                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 mb-3">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className="px-2 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-darkModalBg dark:text-darkAccent3"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
            </button>
            <span className="text-sm text-darkmainBg font-normal font-Work dark:text-darkPrimaryText px-2">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages))
              }
              className="px-2 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-darkModalBg dark:text-darkAccent3"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="font-Work  p-5 dark:text-darkAccent dark:border-darkDevider dark:bg-darkmainBg">
                <h3 className="text-lg mb-3 dark:text-darkPrimaryText font-Work">
                  Legends
                </h3>
                {/* <hr className="mt-2 mb-4 dark:border-darkDevider" /> */}
                <div className="grid grid-cols-2 md:grid-cols-9 gap-1">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-600 dark:bg-green-500 p-5 flex items-center justify-center">
                      P
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Present
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-red-400 dark:bg-red-600 flex p-5 items-center justify-center">
                      A
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Absent
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-200 dark:bg-yellow-400 p-5 flex items-center justify-center">
                      HD
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Half Day
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-pink-600 dark:bg-pink-500 text-white flex p-5 items-center justify-center">
                      SH
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Short Leave
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-fuchsia-600 dark:bg-fuchsia-500 text-white flex p-5 items-center justify-center">
                      SL
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Sick Leave
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-neutral-600 dark:bg-neutral-500 text-white flex p-5 items-center justify-center">
                      EL
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Earn Leave
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-cyan-600 dark:bg-cyan-500 text-white flex p-5 items-center justify-center">
                      CL
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Casual Leave
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-slate-600 dark:bg-slate-500 text-white flex p-5 items-center justify-center">
                      CO
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      COff Leave
                    </span>
                  </div>
                  <div className="flex items-center">
                  <span className="w-6 h-6 bg-white-600 dark:bg-white-500 text-black flex p-5 items-center justify-center">
                      O
                    </span>
                    <span className="ml-2 dark:text-darkMuted font-normal text-sm">
                      Off Day
                    </span>
                  </div>
                </div>
              </div>
    </div>
  );
};

export default AttendanceMuster;
