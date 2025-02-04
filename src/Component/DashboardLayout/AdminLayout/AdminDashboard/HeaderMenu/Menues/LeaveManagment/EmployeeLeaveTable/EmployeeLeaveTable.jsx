import React, { useState, useEffect } from "react";
import EditLeavePopup from "./EditLeavePopup";
import { useDispatch, useSelector } from "react-redux";
import { leavesReportApi } from "../../../../../../../../Redux/thunks/leavesReportApi";
import AssignLeavesPopup from "./AssignLeavesPopup";
import { Empty } from "antd";

const EmployeeLeaveTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filter, setFilter] = useState("Onrole");
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const rowsPerPage = 5;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(true);
  };

  const togglePopupClose = () => {
    setIsPopupOpen(false);
  };

  const dispatch = useDispatch();
  const {
    leavesReportData = [],
    loading,
    error,
  } = useSelector((state) => state.hr);

  // Fetch leave data on component mount
  useEffect(() => {
    dispatch(leavesReportApi());
  }, [dispatch]);

  // Filtered employees based on filter state and search query
  const filteredData = leavesReportData
    .filter(
      (employee) =>
        (filter === "Onrole" && employee.employmentType === "Onrole") ||
        (filter === "onContract" && employee.employmentType === "OnContract")
    )
    .filter((employee) =>
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleSave = (id, updatedData) => {
    // Logic to update the employee data
    setSelectedEmployee(null);
  };

  const goToPage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <p>Loading leave data...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full mt-8 lg:mt-0 mb-4">
      <div className="md:flex items-center justify-between">
        <div className="mb-6">
          <h3 className="text-lg font-normal text-gray-800 dark:text-white">
            Employee Leave Management
          </h3>
          <p className="text-gray-600 dark:text-darkMuted text-sm">
            Track, manage, and edit employee leave details with ease.
          </p>
        </div>

        <div className="flex items-center justify-start gap-5">
          {/* Filter Dropdown */}
          <div className="mb-4 flex items-start">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-2 py-2 font-Work text-light outline-none text-sm bg-gray-200 dark:bg-darkModalBg dark:text-darkPrimaryText"
            >
              <option value="Onrole">On Roll</option>
              <option value="onContract">On Contract</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-[100%]">
        <div className="mb-4 flex items-center ">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 w-52  md:w-80 font-Work text-light outline-none text-sm bg-white dark:bg-darkcardBg dark:text-darkPrimaryText border dark:border-darkDevider border-gray-400"
          />
        </div>
        {/* Assign Leave */}
        <div className="bg-yellow-300 mb-4 p-2">
          <button
            className="text-sm flex items-center gap-1"
            onClick={togglePopup}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                />
              </svg>
            </span>
            Assign Leaves
          </button>
        </div>
      </div>

      {isPopupOpen && <AssignLeavesPopup onClose={togglePopupClose} />}

      <div className="">
        {filteredData.length > 0 ? (
          <>
            <div className="overflow-y-auto overflow-x-auto">
              <table className=" min-w-full table-fixed dark:border-darkDevider text-sm">
                <thead className="bg-gray-200 dark:bg-darkModalBg dark:text-gray-300 text-nowrap sticky top-0">
                  <tr>
                    <th className="px-6 py-3 w-[10%] font-normal text-center dark:bg-darkModalBg bg-gray-200 sticky left-0">
                      Employee ID
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Name
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Leave
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Approved Leaves
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Balance Leaves
                    </th>
                    <th className="px-6 py-3 w-[15%] font-normal text-center">
                      Taken Leaves
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Applied For
                    </th>
                    <th className="px-6 py-3 w-[10%] font-normal text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((employee) => (
                    <tr
                      key={employee.id}
                      className="text-gray-800 dark:text-gray-300"
                    >
                      <td className="px-4 py-2 text-center dark:bg-darkmainBg sticky left-0 bg-gray-50">
                        {employee.employeeId}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.fullName}
                      </td>
                      <td className="px-4 py-2 text-center text-nowrap">
                        {employee.leaveName}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.approvedLeaves}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.leaveBalance}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.takenLeaves}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {employee.applicationCount} Times
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="bg-blue-500 text-white px-3 py-1"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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

export default EmployeeLeaveTable;
