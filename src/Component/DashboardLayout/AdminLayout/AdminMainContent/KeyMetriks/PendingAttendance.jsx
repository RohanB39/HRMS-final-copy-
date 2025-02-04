import React, { useState } from "react";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";

const PendingAttendance = () => {
  const { todayspresenceList } = useSelector((state) => state.hr);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(todayspresenceList.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Slice the list based on pagination
  const paginatedData = todayspresenceList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {todayspresenceList.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse table-layout-fixed">
              <thead className="bg-gray-200 font-Work dark:bg-darknavbarBg text-sm">
                <tr>
                  <th className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center font-normal sticky left-0 z-10 dark:bg-darknavbarBg dark:text-darkAccent3 font-Work text-nowrap bg-gray-50 ">
                    Emp.Id
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Sign In Time
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Location
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[15%] sm:w-[12%] md:w-[14%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work"></th>
                </tr>
              </thead>
              <tbody className="bg-transparent text-nowrap text-sm">
                {paginatedData.map((employee, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 dark:border-t-darkDevider dark:hover:bg-darkcardBg"
                  >
                    <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky dark:text-darkAccent3 left-0 z-10 dark:bg-darknavbarBg bg-gray-50 ">
                      {employee.employeeId}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {employee.employeeName}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {employee.signInTime}
                    </td>
                    <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                      {employee.signInLocation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <Empty description="No Data Available" />
        </div>
      )}
    </div>
  );
};

export default PendingAttendance;
