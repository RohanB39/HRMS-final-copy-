import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { employeeTotalDetails } from "../../../../../Redux/thunks/employeeTotalDetails";

const AbsentEmployeeCard = () => {
  const [number, setNumber] = useState(0); // Start with 0
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (!empDetails.length) {
        dispatch(employeeTotalDetails(employeeId));
      }
    }
  }, [dispatch, empDetails]);

  const absentDetails = empDetails?.attendanceReports
    ? empDetails.attendanceReports
        .filter((attendance) => {
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth();
          const currentYear = currentDate.getFullYear();
          const attendanceDate = new Date(attendance.date);
          const isInCurrentMonth =
            attendanceDate.getFullYear() === currentYear &&
            attendanceDate.getMonth() === currentMonth;
          return attendance.status === "Absent" && isInCurrentMonth;
        })
        .filter((value, index, self) => {
          return index === self.findIndex((t) => t.date === value.date);
        })
    : [];

  useEffect(() => {
    setNumber(absentDetails.length);
  }, [absentDetails]);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-[100px] dark:bg-darkmainBg mt-2 border dark:border-darkDevider border-gray-400 relative">
        <p className="font-Work font-normal uppercase tracking-wide mb-2 p-4 text-[12px] dark:text-darkPrimaryText">
          Total Absents
        </p>
        <div className="absolute bottom-0 flex items-baseline justify-between px-4 w-full">
          <h3 className="text-4xl font-Work text-white">
            <AnimatedNumber targetNumber={number} />
          </h3>
          <small
            className="dark:text-darkAccent3 cursor-pointer hover:underline"
            onClick={handleViewAllClick}
          >
            View All
          </small>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-800 dark:bg-darkmainBg dark:bg-opacity-80 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-darkModalBg p-4 w-[90%] md:w-96 max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-normal font-Work dark:text-darkPrimaryText">
                Absent Details for This Month
              </h2>
              <button
                className="mt-4 px-1 py-1 bg-darkAccent2 text-darknavbarBg"
                onClick={closeModal}
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <hr className="mb-4 dark:border-darkDevider" />
            <ul className="space-y-2">
              {absentDetails.map((absent, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-normal font-Work text-sm dark:text-darkPrimaryText">
                    {absent.date}
                  </span>
                  <span className="font-Work font-normal text-sm dark:text-darkPrimaryText">
                    {absent.workHours} <small>hrs</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsentEmployeeCard;
