import React, { useState, useEffect } from "react";
import EditLeavePopup from "./EditLeavePopup";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { fetchOnLeaveEmployee } from "../../../../../../../../Redux/thunks/fetchOnLeaveEmployee";

const EmployeeLeaveHistory = () => {
  const dispatch = useDispatch();
  const { OnLeave = [], loading } = useSelector((state) => state.hr);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Function to open modal with specific content
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchOnLeaveEmployee());
  }, [dispatch]);

  // Filter employees based on search query
  const filteredData = OnLeave.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSave = (updatedEmployee) => {
    console.log("Updated Employee:", updatedEmployee);
    setSelectedEmployee(null);
  };

  if (loading) return <p>Loading leave data...</p>;

  return (
    <div className="w-full mt-8 lg:mt-0 p-2 mb-4">
      <div className="md:flex items-center justify-between">
        <div className="mb-6">
          <h3 className="text-lg font-normal text-gray-800 dark:text-white">
            Employee Leave History
          </h3>
          <p className="text-gray-600 dark:text-darkMuted text-sm">
            Track, manage, Employee Leave History
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 font-Work text-light outline-none text-sm border w-72 dark:border-darkDevider border-gray-400 bg-gray-50 dark:bg-darkcardBg dark:text-darkPrimaryText"
          />
        </div>
      </div>

      <div>
        {filteredData.length > 0 ? (
          <>
            <div className="overflow-y-auto overflow-x-auto">
              <table className="min-w-full table-fixed dark:border-darkDevider text-sm">
                <thead className="bg-gray-200 dark:bg-darkModalBg dark:text-gray-300 text-nowrap sticky top-0">
                  <tr>
                    <th className="px-6 py-3 w-[10%] font-normal text-center sticky left-0 dark:bg-darkModalBg bg-gray-200">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Name
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Leave
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Start Date
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      End Date
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Leave Days
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Reason
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Application Date
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Approver Name
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Approval Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((employee) => (
                    <tr
                      key={employee.id}
                      className="text-gray-800 dark:text-gray-300 h-14 border-b dark:border-b-darkDevider"
                    >
                      <td className="px-4 py-2 text-center sticky left-0 dark:bg-darkmainBg bg-gray-50">
                        {employee.employeeId}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.fullName}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.leaveType}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.leaveStartDate}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.leaveEndDate}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.totalLeaveDays}
                      </td>
                      <td
                        className="px-4 py-2 text-center text-nowrap whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]"
                        onClick={() => handleOpenModal(employee.reason)}
                      >
                        {employee.reason}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.applicationDate}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.approverComments}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.approvalDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center mt-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <span className="mx-2 dark:text-darkPrimaryText text-sm">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-40">
            <Empty description="No employees found" />
          </div>
        )}
      </div>

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

      {/* Edit Popup */}
      {selectedEmployee && (
        <EditLeavePopup
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EmployeeLeaveHistory;
