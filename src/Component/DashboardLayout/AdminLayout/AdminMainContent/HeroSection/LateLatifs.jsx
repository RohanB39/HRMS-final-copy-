import React, { useState } from "react";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaysPresenty } from "../../../../../Redux/thunks/fetchTodaysPresentyApi";

const LateLatifs = () => {
  const dispatch = useDispatch();
  const { todayspresenceList, loading, error } = useSelector(
    (state) => state.hr
  );
  let todaysLateEmployee = todayspresenceList.filter((employee) => {
    return employee.isLateIn === 1;
  });

  const uniqueRecords = Object.values(
    todaysLateEmployee.reduce((acc, record) => {
      const existing = acc[record.employeeId];
      // Check if the current record is more recent or if it's the first record for the employeeId
      if (
        !existing ||
        new Date(record.signInTime) > new Date(existing.signInTime)
      ) {
        acc[record.employeeId] = record;
      }
      return acc;
    }, {})
  );

  let number = uniqueRecords.length;
  const [showModal, setShowModal] = useState(false);
  const visibleEmployees = uniqueRecords.slice(0, 4);

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
          <div className="flex items-baseline justify-between border-b">
            <h3 className="text-4xl font-Work dark:text-white">
              {" "}
              <AnimatedNumber targetNumber={number} />
            </h3>
            <small
              className="dark:text-darkAccent3 cursor-pointer hover:underline"
              onClick={() => setShowModal(true)}
            >
              View All
            </small>
          </div>
          <div className="flex justify-between py-2 font-Work">
            <p className="capitalize dark:text-darkMuted font-light font-Work tracking-normal text-sm">
              Late Commers
            </p>
            <div className="flex items-center space-x-[-10px]">
              {visibleEmployees.map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative group hover:z-20"
                  style={{
                    transition: "z-index 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {imgSrc.profileImage ? (
                    <img
                      src={`data:image/jpeg;base64,${imgSrc.profileImage}`}
                      alt={`Portrait ${index + 1}`}
                      className="h-8 w-8 rounded-full border dark:border-white border-darkmainBg transform transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:translate-y-[-10px]"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full border dark:border-white border-darkmainBg transform transition-transform duration-300 ease-in-out group-hover:scale-125 group-hover:translate-y-[-10px] flex items-center justify-center bg-black text-white">
                      {/* Display initials if no profile image */}
                      <span>
                        {imgSrc.employeeName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {uniqueRecords.length > 0 && (
                <div className="relative group">
                  <button
                    onClick={() => setShowModal(true)}
                    className="h-8 w-8 rounded-full border bg-darkAccent2 dark:bg-yellow-400 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Viewing All Images */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="dark:bg-darkModalBg bg-white p-4 max-w-2xl w-[90%] overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-[18px] font-normal dark:text-darkPrimaryText">
                  Late Employees
                </h2>
                <p className="dark:font-light font-normal dark:text-darkMuted text-sm tracking-wide">
                  Employees who are late today
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-darkAccent2  px-1 py-1 text-darkmainBg hover:bg-yellow-200"
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
            <hr className="mb-4" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueRecords.map((employee) => (
                <div
                  key={employee.employeeId}
                  className="flex items-center space-x-2"
                >
                  {/* Conditional rendering for profile image or initials */}
                  {employee.profileImage ? (
                    <img
                      src={`data:image/jpeg;base64,${employee.profileImage}`}
                      alt={`Portrait of ${employee.employeeName}`}
                      className="h-12 w-12 rounded-full border shadow-lg"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                      {/* Display initials if no profile image */}
                      <span>
                        {employee.employeeName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col">
                    <p className="text-sm dark:text-darkPrimaryText text-nowrap">
                      {employee.employeeName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-darkMuted text-nowrap md:text-wrap">
                      {employee.designation}
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
