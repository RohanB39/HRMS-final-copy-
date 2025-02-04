import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingCoff } from "../../../../../Redux/thunks/fetchPendingCoff";
import { approveCoff } from "../../../../../Redux/thunks/approveCoff";
import toast from "react-hot-toast";
import { rejectCoff } from "../../../../../Redux/thunks/rejectCoff";

const CoffRequest = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;

  useEffect(() => {
    dispatch(fetchPendingCoff());
  }, [dispatch]);

  const { pendingCoff, loading, error } = useSelector((state) => state.hr);

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = pendingCoff?.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil((pendingCoff?.length || 0) / entriesPerPage);

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
      const user = JSON.parse(loggedInUser);
      const coffData = {
        SrNo: emp.srNo,
        employeeId: emp.employeeId,
        leaveId: "LVE005",
        requestedDays: emp.requestedDays,
      };
      console.log(coffData);

      dispatch(approveCoff(coffData))
        .unwrap()
        .then((response) => {
          toast.success("C-off approved successfully!");
          dispatch(fetchPendingCoff());
        })
        .catch((error) => {
          toast.error(error || "Something went wrong while approving C-off.");
        });
    } else {
      console.log("No logged in user found in localStorage.");
    }
  };

  const handleReject = (emp) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const srNo = emp.srNo;
      dispatch(rejectCoff(srNo))
        .unwrap()
        .then((response) => {
          toast.success("C-off request Rejected successfully!");
          dispatch(fetchPendingCoff());
        })
        .catch((error) => {
          toast.error(error || "Something went wrong while rejecting C-off.");
        });
    } else {
      console.log("No logged in user found in localStorage.");
    }
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        {currentEntries && currentEntries.length > 0 ? (
          <>
            <table className="w-full table-auto border-collapse table-layout-fixed">
              <thead className="bg-gray-200 font-Work dark:bg-darknavbarBg">
                <tr className="text-sm">
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap sticky left-0 bg-gray-200 dark:bg-darkModalBg">
                    APP ID
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap sticky left-0 bg-gray-200 dark:bg-darkModalBg">
                    Emp.Id
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
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider sticky left-0 bg-white dark:bg-darknavbarBg">
                      {emp.srNo}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider sticky left-0 bg-white dark:bg-darknavbarBg">
                      {emp.employeeId}
                    </td>

                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.requestedDays} Days
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {emp.createdAt}
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

export default CoffRequest;
