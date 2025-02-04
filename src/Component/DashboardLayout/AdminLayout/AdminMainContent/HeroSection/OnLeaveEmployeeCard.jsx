import React, { useState, useEffect } from "react";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnLeaveEmployee } from "../../../../../Redux/thunks/fetchOnLeaveEmployee";
import { employeeCountApi } from "../../../../../Redux/thunks/employeeCountApi";

const OnLeaveEmployeeCard = () => {
  const [number, setNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { OnLeave, loading, error } = useSelector((state) => state.hr);
  const { status, employeeCount } = useSelector((state) => state.hr);

  useEffect(() => {
    dispatch(fetchOnLeaveEmployee());
  }, [dispatch]);

  const filteredOnLeave = OnLeave.filter((employee) => {
    const today = new Date();
    const leaveStartDate = new Date(employee.leaveStartDate);
    return leaveStartDate >= today;
  });

  useEffect(() => {
    setNumber(filteredOnLeave.length);
  }, [filteredOnLeave]);

  return (
    <div>
      <div className="h-full dark:bg-darkmainBg border border-gray-400 dark:border-darkDevider relative">
        <div className="flex justify-between items-baseline p-4">
          <p className="font-Work font-normal uppercase tracking-wide mb-2  text-[12px] dark:text-darkPrimaryText">
            On Leave
          </p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-darkMuted"
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
            <h3 className="text-4xl font-Work text-white">
              <AnimatedNumber targetNumber={number} />
            </h3>
            <small
              className="dark:text-darkAccent3 cursor-pointer hover:underline"
              onClick={() => setShowModal(true)} // Open modal on click
            >
              View All
            </small>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-50">
              <div className="dark:bg-darkModalBg bg-white p-4 max-w-2xl w-full overflow-y-auto">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-[18px] font-normal dark:text-darkPrimaryText">
                      Today's On Leave Employees
                    </h2>
                    <p className="dark:font-light font-normal dark:text-darkMuted text-sm tracking-wide">
                      Employees who are on leave today
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <hr className="mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  {filteredOnLeave.map((employee) => (
                    <div
                      key={employee.employeeId}
                      className="flex items-center space-x-2"
                    >
                      {employee.profileImage ? (
                        <img
                          src={`data:image/jpeg;base64,${employee.profileImage}`}
                          alt={`Portrait of ${employee.employeeName}`}
                          className="h-12 w-12 rounded-full border shadow-lg"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
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
          <div className="flex justify-between py-2 font-Work">
            <p className="capitalize text-gray-500 dark:text-darkMuted font-Work tracking-wider text-sm">
              Total
            </p>
            <p className="capitalize text-gray-500 dark:text-darkMuted font-Work tracking-wider text-sm">
              {number}/{employeeCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnLeaveEmployeeCard;
