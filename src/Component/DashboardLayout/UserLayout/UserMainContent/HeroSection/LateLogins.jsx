import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { employeeTotalDetails } from "../../../../../Redux/thunks/employeeTotalDetails";

const LateLatifs = () => {
  const [number, setNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const {
    empDetails = [],
    loading,
    error,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(employeeTotalDetails(employeeId));
    }
  }, [dispatch]);

  const lateLogins =
    empDetails?.attendanceReports?.filter((attendance) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const attendanceDate = new Date(attendance.date);
      const isInCurrentMonth =
        attendanceDate.getFullYear() === currentYear &&
        attendanceDate.getMonth() === currentMonth;
      return attendance.isLateIn === "1" && isInCurrentMonth;
    }) || [];

  useEffect(() => {
    setNumber(lateLogins.length); // Update the number state with the filtered count
  }, [lateLogins]);

  return (
    <div>
      <div className="dark:bg-darkmainBg border shadow-xl border-gray-400 dark:border-darkDevider h-full relative">
        <div className="flex justify-between items-baseline p-4">
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            Late Logins
          </p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 dark:text-darkMuted"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
            </svg>
          </span>
        </div>
        <div className="absolute bottom-0 px-4 w-full">
          <div className="flex items-baseline justify-between">
            <h3 className="text-4xl font-Work dark:text-white">
              <AnimatedNumber targetNumber={number} />
            </h3>
            <small
              className="dark:text-darkAccent3 cursor-pointer hover:underline"
              onClick={() => setShowModal(true)}
            >
              View All
            </small>
          </div>
        </div>
      </div>

      {/* Modal for Viewing All Employees */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="dark:bg-darkModalBg bg-white p-4 max-w-md w-full overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-[18px] font-normal dark:text-darkPrimaryText">
                  Late Login In Current Month
                </h2>
                <p className="dark:font-light font-normal dark:text-darkMuted text-sm tracking-wide">
                  Only 5 Times late Logins Allowed In One Month
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-darkAccent2 px-1 py-1 text-darkmainBg hover:bg-yellow-200"
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {lateLogins.map((employee, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <p className="text-sm dark:text-darkPrimaryText">
                      {employee.date}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-darkMuted">
                      {employee.signInTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LateLatifs;
