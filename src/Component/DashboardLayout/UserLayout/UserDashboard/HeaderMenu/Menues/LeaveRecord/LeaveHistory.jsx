import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeTotalDetails } from "../../../../../../../Redux/thunks/employeeTotalDetails";

import AllLeavesHistory from "./AllLeavesHistory";
import PendingLeaveHistory from "./PendingLeaveHistory";
import ApprovedLeavesHistory from "./ApprovedLeavesHistory";
import LeaveApplicationForm from "./LeaveApplicationForm";
import RejectedLeaveApplications from "./RejectedLeaveApplications";
import RequestCOFF from "./RequestCOFF";

const LeaveHistory = () => {
  const dispatch = useDispatch();
  const {
    empDetails = [],
    loading,
    error,
  } = useSelector((state) => state.employees);

  const [activeTab, setActiveTab] = useState("AllLeaves");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSecondModelOpen, setSecondModelOpen] = useState(false);

  const handleViewAllClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleViewCOFFClick = () => {
    setSecondModelOpen(true);
  };

  const closeSecondModel = () => {
    setSecondModelOpen(false);
    console.log("clicked");
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(employeeTotalDetails(employeeId));
    }
  }, [dispatch]);

  const pendingLeaves =
    empDetails?.leaveApplications?.filter((pending) => {
      return pending.status === "Pending";
    }) || [];

  const approvedLeaves =
    empDetails?.leaveApplications?.filter((approved) => {
      return approved.status === "Approved";
    }) || [];

  const rejectedLeaves =
    empDetails?.leaveApplications?.filter((rejected) => {
      return rejected.status === "Rejected";
    }) || [];

  const getCurrentTabData = () => {
    switch (activeTab) {
      case "Pending":
        return pendingLeaves;
      case "Approved":
        return approvedLeaves;
      case "Rejected":
        return rejectedLeaves;
      default:
        return [];
    }
  };

  return (
    <div className="mt-12 mb-4">
      {/* Title Section */}
      <div className="md:flex  justify-between items-end">
        <div>
          <h3 className="font-Work  font-normal text-lg dark:text-darkAccent3">
            Leave History
          </h3>
          <p className="text-sm font-Work dark:text-darkMuted">
            View the history of all your leave applications here.
          </p>
        </div>
        <div className="flex gap-4">
          <div
            className="border px-4 py-2 cursor-pointer bg-white dark:bg-darksidebarBg dark:text-darkAccent3 border-gray-400 hover:border-gray-600 dark:border-darkDevider w-fit mt-4 md:mt-0 flex gap-2 items-center font-Work text-sm"
            onClick={handleViewAllClick}
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
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </span>
            <p>Apply Leave</p>
          </div>
          <div
            className="border px-4 py-2 cursor-pointer dark:text-darkmainBg bg-yellow-400  hover:bg-yellow-500 dark:border-darkDevider w-fit mt-4 md:mt-0 flex gap-2 items-center font-Work text-sm"
            onClick={handleViewCOFFClick}
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
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </span>
            <p>Request COFF</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {/* Tabs */}
      <div className="flex gap-8 mt-6 border-b font-Work font-normal dark:border-b-darkDevider overflow-x-auto scrollbarHide">
        {[
          "AllLeaves",
          "Pending Leaves",
          "Approved Leaves",
          "Rejected Leaves",
        ].map((tab) => (
          <button
            key={tab}
            className={`py-2 text-sm font-normal font-Work dark:text-darkMuted hover:text-blue-500 text-nowrap  ${
              activeTab === tab
                ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                : "dark:text-darkMuted text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 ">
        {activeTab === "AllLeaves" && (
          <div>
            <AllLeavesHistory />
          </div>
        )}
        {activeTab === "Pending Leaves" && (
          <div>
            <PendingLeaveHistory />
          </div>
        )}
        {activeTab === "Approved Leaves" && (
          <div>
            <ApprovedLeavesHistory />
          </div>
        )}
        {activeTab === "Rejected Leaves" && (
          <div>
            <RejectedLeaveApplications />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 dark:bg-darkmainBg dark:bg-opacity-80 bg-opacity-50 flex justify-center items-center z-50">
          <LeaveApplicationForm close={closeModal} />
        </div>
      )}
      {isSecondModelOpen && (
        <div className="fixed inset-0 bg-slate-800 dark:bg-darkmainBg dark:bg-opacity-80 bg-opacity-50 flex justify-center items-center z-50">
          <RequestCOFF close={closeSecondModel} />
        </div>
      )}
    </div>
  );
};

export default LeaveHistory;
