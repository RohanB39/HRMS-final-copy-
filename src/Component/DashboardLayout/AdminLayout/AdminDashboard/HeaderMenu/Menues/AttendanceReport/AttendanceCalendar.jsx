import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allEmployee } from "../../../../../../../Redux/thunks/allEmployee";
import { fetchAttendanceOnId } from "../../../../../../../Redux/thunks/fetchAttendanceOnId";
import moment from "moment";

const AttendanceCalendar = () => {
  const dispatch = useDispatch();
  const { allEmployeeData = [] } = useSelector((state) => state.hr);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { attendanceonId = [] } = useSelector((state) => state.hr);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [modalContent, setModalContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  // Function to open modal with specific content
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  console.log(attendanceonId);

  useEffect(() => {
    dispatch(allEmployee());
  }, [dispatch]);

  const fetchAttendance = (employeeId) => {
    if (employeeId) {
      dispatch(fetchAttendanceOnId(employeeId));
    } else {
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
    fetchAttendance(employeeId);
  };

  const generateMonthDays = () => {
    const startOfMonth = currentMonth.clone().startOf("month");
    const endOfMonth = currentMonth.clone().endOf("month");

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

  const getAttendanceDetails = (date) => {
    const attendance = attendanceonId.find(
      (item) => item.date === date.format("YYYY-MM-DD")
    );
    if (attendance) {
      return {
        status: attendance.status,
        signInTime: attendance.signInTime || "-",
        signInLocation: attendance.signInLocation || "-",
        signOutTime: attendance.signOutTime || "-",
        signOutLocation: attendance.signOutLocation || "-",
        workHours: attendance.workHours || "-",
        otHours: attendance.otHours || "-",
        shiftHours: attendance.shiftHours || "-",
        isLateIn: attendance.isLateIn ? "Yes" : "No",
        isLateOut: attendance.isLateOut ? "Yes" : "No",
        isFirstIn: attendance.isFirstIn ? "Yes" : "No",
        isFirstOut: attendance.isFirstOut ? "Yes" : "No",
      };
    }
    return {
      status: "-",
      signInTime: "-",
      signInLocation: "-",
      signOutTime: "-",
      signOutLocation: "-",
      workHours: "-",
      otHours: "-",
      shiftHours: "-",
      isLateIn: "No",
      isLateOut: "No",
      isFirstIn: "No",
      isFirstOut: "No",
    };
  };

  const monthDays = generateMonthDays();

  return (
    <div className="mt-12">
      {/* Employee selection dropdown */}
      <div className="md:flex  justify-between items-center mt-6">
        <div>
          <select
            className="border w-48 px-2 py-2 outline-none dark:bg-darksidebarBg font-Work text-sm dark:border-none dark:text-darkAccent3"
            value={selectedEmployee || ""}
            onChange={handleEmployeeChange}
          >
            <option value="">Select Employee</option>
            {allEmployeeData.map((employee) => (
              <option key={employee.id} value={employee.employeeId}>
                {employee.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 items-center mt-4">
          <button
            onClick={handlePreviousMonth}
            className="px-2 py-2 bg-gray-200 dark:bg-darksidebarBg text-gray-700 dark:text-darkAccent2"
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
          <h2 className="font-Work text-sm font-normal dark:text-gray-200 tracking-wide">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <button
            onClick={handleNextMonth}
            className="px-2 py-2 bg-gray-200 dark:bg-darksidebarBg text-gray-700 dark:text-darkAccent2"
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
      </div>

      <div className="">
        <div className="overflow-x-auto dark:border-darkDevider max-h-96 mb-6">
          <div className="flex items-center z-30 bg-gray-100 sticky top-0 w-fit dark:bg-darksidebarBg dark:text-darkAccent3 font-normal text-sm font-Work">
            <div className="w-40 border-r  sticky left-0 z-10  dark:border-r-darkDevider dark:border-b-darkDevider flex-shrink-0">
              <p className="py-2 text-center dark:bg-darksidebarBg bg-gray-100 font-medium tracking-wide">
                Date
              </p>
            </div>
            {/* Keep all the headers as they are */}
            <div className="flex gap-8 items-center text-nowrap w-fit pl-4 tracking-wide text-start ">
              <div className="w-20">
                <p>Shift</p>
              </div>
              <div className="w-20">
                <p>Shift hrs</p>
              </div>
              <div className="w-20">
                <p>First In</p>
              </div>
              <div className="w-20">
                <p>Last Out</p>
              </div>
              <div className="w-20">
                <p>Late In</p>
              </div>
              <div className="w-20">
                <p>Early Out</p>
              </div>
              <div className="w-20">
                <p>Work hrs</p>
              </div>
              <div className="w-24">
                <p>Shortfall hrs</p>
              </div>
              <div className="w-20">
                <p>Excess hrs</p>
              </div>
              <div className="w-20">
                <p>Status</p>
              </div>
              <div className="w-44">
                <p>Sign In Location</p>
              </div>
              <div className="w-44">
                <p>Sign Out Location</p>
              </div>
            </div>
          </div>
          {/* Table Rows for Employee Attendance */}
          {monthDays.map((day, index) => {
            const details = getAttendanceDetails(day);

            return (
              <div key={index} className="flex items-center">
                <div className="w-40 border-r border-b sticky left-0 z-10  dark:border-r-darkDevider dark:border-b-darkDevider bg-gray-100 flex-shrink-0">
                  <p className="py-2 text-center font-Work text-sm font-normal dark:text-darkPrimaryText dark:bg-darknavbarBg">
                    {" "}
                    {day.format("DD MMM YYYY")}
                  </p>
                </div>
                <div className="flex gap-8 items-center text-nowrap w-fit pl-6 font-Work text-sm text-center dark:text-gray-300  border-b dark:border-b-darkDevider">
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.shift || "Gen"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.shiftHours || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.isFirstIn || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.isLateOut || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.isLateIn || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.isFirstOut || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.workHours || "-"}
                    </p>
                  </div>
                  <div className="w-24 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.shortfallHrs || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.otHours || "-"}
                    </p>
                  </div>
                  <div className="w-20 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-start font-Work text-sm font-normal dark:text-gray-200 ">
                      {details.status || "-"}
                    </p>
                  </div>
                  <div className="w-44 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] font-Work text-sm" onClick={() => handleOpenModal(details.signInLocation)}>
                      {details.signInLocation || "-"}
                    </p>
                  </div>
                  <div className="w-44 border-r dark:border-r-darkDevider">
                    <p className="py-2 text-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] font-Work text-sm" onClick={() => handleOpenModal(details.signOutLocation)}>
                      {details.signOutLocation || "-"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50"
              onClick={() => setShowModal(false)}
            >
              <div
                className="bg-white p-4 max-w-md max-h-[100vh] overflow-auto w-[90%] dark:bg-darkModalBg dark:text-darkPrimaryText"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {modalContent}
                </p>
                {/* <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button> */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* No attendance data message */}
      {attendanceonId.length === 0 && selectedEmployee && (
        <p className="text-gray-600 mt-4 dark:text-darkPrimaryText text-sm">
          No attendance data available for the selected employee.
        </p>
      )}
    </div>
  );
};

export default AttendanceCalendar;
