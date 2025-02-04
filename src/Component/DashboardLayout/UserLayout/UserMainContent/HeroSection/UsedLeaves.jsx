import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { employeeTotalDetails } from "../../../../../Redux/thunks/employeeTotalDetails";
import { fetchLeaveInfo } from "../../../../../Redux/thunks/fetchLeaveInfo";

const OnLeaveEmployeeCard = () => {
  const [number, setNumber] = useState(0);
  const [usedLeavesNumber, setusedLeavesNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    empDetails = [],
    loading,
    error,
  } = useSelector((state) => state.employees);
  const { leaveAssignments = [] } = useSelector((state) => state.employees);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(employeeTotalDetails(employeeId));
    }
  }, [dispatch]);

  const usedLeaves =
    empDetails?.leaveApplications?.filter((leaves) => {
      return leaves.status === "Approved";
    }) || [];

  useEffect(() => {
    if (leaveAssignments.length > 0) {
      const totalApprovedLeaves = leaveAssignments.reduce((total, leave) => {
        return total + leave.approvedLeaves;
      }, 0);
      setusedLeavesNumber(totalApprovedLeaves);
    }
  }, [leaveAssignments]);

  useEffect(() => {
    setNumber(usedLeaves.length);
  }, [usedLeaves]);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-full dark:bg-darksidebarBg border border-gray-400 dark:border-darkDevider relative">
        <div className="flex justify-between items-baseline p-4">
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            Used Leave
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
              onClick={handleViewAllClick}
            >
              View All
            </small>
          </div>
          <div className="flex justify-between py-2 font-Work">
            <p className="capitalize text-gray-500 dark:text-darkMuted font-Work tracking-wider text-sm">
              total
            </p>
            <p className="capitalize text-gray-500 dark:text-darkMuted font-Work tracking-wider text-sm">
              {number}/{usedLeavesNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-slate-800 dark:bg-darkmainBg dark:bg-opacity-80 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-darkModalBg  p-4 w-[90%] md:w-96 max-h-[80%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-normal font-Work dark:text-darkPrimaryText">
                Used Leave Details
              </h2>
              <button
                className="mt-4 px-1 py-1 bg-darkAccent2   text-darknavbarBg"
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
            <hr className="mb-2 dark:border-darkDevider" />
            <ul className="space-y-2">
              {usedLeaves.map((leave, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-Work font-normal text-sm dark:text-darkPrimaryText">
                    {leave.leaveStartDate}
                  </span>
                  <span className="font-Work font-normal text-sm dark:text-darkPrimaryText">
                    {leave.reason}
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

export default OnLeaveEmployeeCard;
