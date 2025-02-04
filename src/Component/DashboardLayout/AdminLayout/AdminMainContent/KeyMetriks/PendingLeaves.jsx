import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingLeaves } from "../../../../../Redux/thunks/fetchPendingLeaves";
import { approveLeave } from "../../../../../Redux/thunks/approveLeave";
import toast from "react-hot-toast";
import { rejectLeave } from "../../../../../Redux/thunks/rejectLeave";

const PendingLeaves = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3; // Number of entries per page

  useEffect(() => {
    dispatch(fetchPendingLeaves());
  }, [dispatch]);

  const { pendingLeaves, loading, error } = useSelector((state) => state.hr);

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = pendingLeaves?.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil((pendingLeaves?.length || 0) / entriesPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Helper function to get initials
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  };

  const handleApprove = (emp) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser); // Parse the JSON string to an object
      const hrName = user.fullname; // Access the 'fullname' property

      const leaveData = {
        applicationId: emp.applicationId,
        employeeId: emp.employeeId,
        leaveId: emp.leaveId,
        leaveType: emp.leaveType,
        leaveStartDate: emp.leaveStartDate,
        leaveEndDate: emp.leaveEndDate,
        totalLeaveDays: emp.totalLeaveDays,
        hrName: hrName,
      };

      dispatch(approveLeave(leaveData))
        .unwrap()
        .then((response) => {
          toast.success("Leave approved successfully!");
          dispatch(fetchPendingLeaves());
        })
        .catch((error) => {
          toast.error(error || "Something went wrong while approving leave.");
        });
    } else {
      console.log("No logged in user found in localStorage.");
    }
  };

  const handleReject = (emp) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      const hrName = user.fullname;

      const leaveData = {
        applicationId: emp.applicationId,
        hrName: hrName,
      };
      dispatch(rejectLeave(leaveData))
        .unwrap()
        .then((response) => {
          toast.success("Leave Rejected successfully!");
          dispatch(fetchPendingLeaves());
        })
        .catch((error) => {
          toast.error(error || "Something went wrong while rejecting leave.");
        });
    } else {
      console.log("No logged in user found in localStorage.");
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        {currentEntries && currentEntries.length > 0 ? (
          <>
            <table className="w-full table-auto border-collapse table-layout-fixed">
              <thead className="bg-gray-200 font-Work dark:bg-darknavbarBg">
                <tr className="text-sm">
                  <th className="px-6 py-3 h-[50px] w-[10%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap sticky left-0 z-10 shadow-xl dark:bg-darknavbarBg bg-gray-200 outline-r">
                    Avatar
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Emp.Id
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Leave Type
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Leave From
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Leave To
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Leave Duration
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Application Date
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-wrap text-center text-gray-700 dark:text-darkAccent3 font-Work ">
                    Reason
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent text-nowrap text-sm max-h-60 dark:text-darkMuted">
                {currentEntries.map((emp, index) => (
                  <tr
                    key={emp.applicationId}
                    className="border-t border-gray-200 dark:text-darkMuted dark:border-t-darkDevider dark:hover:bg-darkcardBg"
                  >
                    <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky left-0 z-10 dark:bg-darknavbarBg bg-gray-50 dark:text-darkMuted">
                      {emp.profileImage ? (
                        <img
                          src={`data:image/png;base64,${emp.profileImage}`}
                          alt="Employee Avatar"
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white mx-auto">
                          {getInitials(emp.fullName)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.employeeId}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.fullName}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.leaveType}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.leaveStartDate}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.leaveEndDate}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.totalLeaveDays} Days
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.applicationDate}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-wrap text-center dark:border-darkdevider">
                      {emp.reason}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      <button
                        className="px-4 py-1 text-white bg-blue-500 hover:bg-blue-600 "
                        onClick={() => handleApprove(emp)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-1 text-white bg-red-500 hover:bg-red-600  ml-2"
                        onClick={() => handleReject(emp)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="flex items-center justify-center h-64">
            <Empty description="No Data Available" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-start mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span className="mx-2 dark:text-darkPrimaryText">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default PendingLeaves;
