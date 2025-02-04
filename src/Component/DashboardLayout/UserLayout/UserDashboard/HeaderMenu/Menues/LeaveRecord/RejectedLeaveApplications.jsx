import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { employeeTotalDetails } from "../../../../../../../Redux/thunks/employeeTotalDetails";
import { useDispatch, useSelector } from "react-redux";

const RejectedLeaveApplications = () => {
  const dispatch = useDispatch();
  const {
    empDetails = {},
    loading,
    error,
  } = useSelector((state) => state.employees);
  const leaveApplications = empDetails.leaveApplications || [];

  // Filter rejected leave applications
  const rejectedLeaveApplications = leaveApplications.filter(
    (item) => item.status === "Rejected"
  );

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.employeeId) {
      const employeeId = loggedInUser.employeeId;
      dispatch(employeeTotalDetails(employeeId));
    }
  }, [dispatch]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Data for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = rejectedLeaveApplications.slice(
    startIndex,
    startIndex + pageSize
  );

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Function to open modal with specific content
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <>
      <div className="overflow-x-auto mt-4">
        {rejectedLeaveApplications.length > 0 ? (
          <table className="min-w-full border-collapse table-auto text-sm">
            {/* Table Header */}
            <thead className="bg-gray-100 dark:bg-darksidebarBg dark:text-darkAccent3 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-center font-Work font-normal w-[5%]">
                  Sr/No
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[15%]">
                  Application Id
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[15%]">
                  Leave Type
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[10%]">
                  From
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[10%]">
                  To
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[5%]">
                  Days
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[15%]">
                  Applied On
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[20%]">
                  Reason
                </th>
                <th className="px-4 py-2 text-center font-Work font-normal w-[10%]">
                  Status
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentPageData.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.applicationId}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.leaveType}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.leaveStartDate}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.leaveEndDate}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.totalLeaveDays}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.applicationDate}
                  </td>
                  <td
                    className="px-4 py-2 text-center text-nowrap whitespace-nowrap border-b dark:border-b-darkDevider overflow-hidden text-ellipsis max-w-[100px] cursor-pointer"
                    onClick={() => handleOpenModal(item.reason)}
                  >
                    {item.reason}
                  </td>
                  <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                    {item.status}
                  </td>
                </tr>
              ))}
              {showModal && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 h-screen flex justify-center items-center z-50"
                  onClick={() => setShowModal(false)}
                >
                  <div
                    className="bg-white p-4 max-w-md max-h-[100vh] overflow-auto w-[90%] dark:bg-darkModalBg dark:text-darkPrimaryText"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {modalContent}
                    </p>
                    {/* <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button> */}
                  </div>
                </div>
              )}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-600 dark:text-darkMuted">
            No rejected leave applications to display.
          </div>
        )}
      </div>

      {/* Pagination */}
      {rejectedLeaveApplications.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Pagination
            current={currentPage}
            total={rejectedLeaveApplications.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </>
  );
};

export default RejectedLeaveApplications;
