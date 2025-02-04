import React, { useState, useEffect } from "react";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbsentEmployees } from "../../../../../Redux/thunks/fetchAbsentEmployees";

const AbsentEmployeeCard = () => {
  const dispatch = useDispatch();
  const {
    absentEmployees = [],
    loading,
    error,
  } = useSelector((state) => state.hr);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAbsentEmployees());
  }, [dispatch]);

  return (
    <div>
      <div className="h-[100px] dark:bg-darkmainBg mt-2 border dark:border-darkDevider border-gray-400 relative">
        <p className="font-Work font-normal uppercase tracking-wide mb-2 p-4 text-[12px] dark:text-darkPrimaryText">
          Absents
        </p>
        <div className="absolute bottom-0 flex items-baseline justify-between px-4 w-full">
          <h3 className="text-4xl font-Work dark:text-darkAccent3">
            {error ? (
              <span>0</span>
            ) : (
              <AnimatedNumber targetNumber={absentEmployees.length} />
            )}
          </h3>
          <small
            className="dark:text-darkAccent3 cursor-pointer hover:underline"
            onClick={() => setShowModal(true)}
          >
            View All
          </small>
        </div>

        {/* Modal for showing absent employees */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-50">
            <div className="dark:bg-darkModalBg bg-white p-4 max-w-2xl w-[90%] overflow-y-auto">
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-[18px] font-normal dark:text-darkPrimaryText">
                    Absent Employees
                  </h2>
                  <p className="dark:font-light font-normal dark:text-darkMuted text-sm tracking-wide">
                    Employees who are absent today
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)} // Close modal on click
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
              <hr className="mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {absentEmployees.map((employee) => (
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
                          {employee.fullName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col">
                      <p className="text-sm dark:text-darkPrimaryText text-nowrap">
                        {employee.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-darkMuted">
                        {employee.designation}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-darkMuted">
                        {employee.department}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbsentEmployeeCard;
