import React, { useState, useEffect } from "react";
import { fetchAttendance } from "../../../../../Redux/thunks/fetchAttendance";
import { useDispatch, useSelector } from "react-redux";

const LateEmployees = () => {
  const dispatch = useDispatch();
  const { employeeAttendence, loading, error } = useSelector(
    (state) => state.hr
  );

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (employeeAttendence.length > 0) {
      const currentMonth = new Date().getMonth() + 1;
      const filtered = employeeAttendence.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return itemMonth === currentMonth && item.isLateIn === 1;
      });
      setFilteredData(filtered);
    }
  }, [employeeAttendence]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto-collapse dark:border-darkDevider table-layout-fixed">
          <thead className="bg-gray-200 font-Work dark:bg-darknavbarBg">
            <tr className="text-sm">
              <th className="px-6 py-3 h-[50px] w-[10%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap sticky left-0 z-10 shadow-xl dark:bg-darknavbarBg bg-gray-200 outline-r">
                Sr.no
              </th>
              <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                Emp.Id
              </th>
              <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                Employee Name
              </th>
              <th className="px-6 py-3 h-[50px] w-[15%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                Late Count
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent text-nowrap text-sm">
            {paginatedData.length > 0 ? (
              paginatedData.map((employee, index) => (
                <tr
                  key={employee.employeeId}
                  className="border-t border-gray-200 dark:border-t-darkDevider dark:hover:bg-darkcardBg"
                >
                  <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky left-0 z-10 dark:bg-darknavbarBg bg-gray-50 dark:text-darkMuted">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky left-0 z-10 dark:bg-darknavbarBg bg-gray-50 dark:text-darkMuted">
                    {employee.employeeId}
                  </td>
                  <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky left-0 z-10 dark:bg-darknavbarBg bg-gray-50 dark:text-darkMuted">
                    {employee.employeeName}
                  </td>
                  <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky left-0 z-10 dark:bg-darknavbarBg bg-gray-50 dark:text-darkMuted">
                    {employee.isLateIn} Times
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-900 dark:text-darkAccent3 font-Work"
                >
                  No late employees for the current month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-start mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="mx-2">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default LateEmployees;
