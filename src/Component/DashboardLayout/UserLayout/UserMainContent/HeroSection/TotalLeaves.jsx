import React, { useEffect, useState } from "react";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveInfo } from "../../../../../Redux/thunks/fetchLeaveInfo";

const AllEmployeecard = () => {
  const [number, setNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    leaveAssignments = [],
    loading,
    error,
  } = useSelector((state) => state.employees);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(fetchLeaveInfo(employeeId));
    }
  }, [dispatch]);

  // Calculate the total approved leaves
  useEffect(() => {
    if (leaveAssignments.length > 0) {
      const totalApprovedLeaves = leaveAssignments.reduce((total, leave) => {
        return total + leave.approvedLeaves;
      }, 0);
      setNumber(totalApprovedLeaves);
    }
  }, [leaveAssignments]);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="h-[100px] bg-gray-300 dark:bg-darkmainBg border dark:border-darkDevider relative">
        {/* all employee */}
        <p className="font-Work dark:font-normal font-medium uppercase tracking-wide mb-2 p-4 text-[12px] text-darkPrimaryBtn dark:text-darkPrimaryText">
          Total Leaves
        </p>
        <div className="absolute bottom-0 flex items-baseline justify-between px-4 w-full">
          <h3 className="text-4xl font-Work text-darkmainBg">
            <AnimatedNumber targetNumber={number} />{" "}
            {/* Display the updated total */}
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
            className="bg-white dark:bg-darkModalBg p-4 md:w-96 max-h-[80%] w-[90%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-normal font-Work dark:text-darkPrimaryText">
                Leave Details
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
            <hr className="mb-2 dark:border-darkDevider" />
            <p className="text-darkMuted text-gray-500 text-sm font-Work font-normal">
              Leaves Assigned In Year {new Date().getFullYear()}
            </p>
            <hr className="mb-2 dark:border-darkDevider" />
            <ul className="space-y-2">
              {leaveAssignments.length === 0 && (
                <p className="text-sm p-2 text-black dark:text-darkPrimaryText">
                  No leaves assigned to you. Please contact your HR for more
                  information.
                </p>
              )}
              {leaveAssignments.map((leave, index) => (
                <li key={index} className="flex justify-between">
                  <span className="font-normal font-Work text-sm dark:text-darkPrimaryText">
                    {leave.leaveName}
                  </span>
                  <span className="font-Work font-normal text-sm dark:text-darkPrimaryText">
                    {leave.approvedLeaves}
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

export default AllEmployeecard;
