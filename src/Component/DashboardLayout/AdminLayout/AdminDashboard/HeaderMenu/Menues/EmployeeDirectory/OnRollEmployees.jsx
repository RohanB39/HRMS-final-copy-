import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allEmployee } from "../../../../../../../Redux/thunks/allEmployee";
import { Empty } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const OnRollEmployees = () => {
  const dispatch = useDispatch();

  // Accessing Redux state
  const { allEmployeeData, loading, error } = useSelector((state) => state.hr);

  // Local states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [selectAll, setSelectAll] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(allEmployee());
  }, [dispatch]);

  const filteredEmployees = allEmployeeData.filter(
    (employee) =>
      employee.employmentType === "Onrole" &&
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  // Handlers
  const handlePagination = (page) => setCurrentPage(page);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  if (!allEmployeeData) {
    return <p>Loading employees...</p>;
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handleDelete = async (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://hr.corely.in/api/employees/delete/${employeeId}`
          );

          if (response.status === 200) {
            Swal.fire("Deleted!", "The employee has been deleted.", "success");
            dispatch(allEmployee());
          } else {
            Swal.fire("Error!", "Failed to delete employee.", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error!",
            error.response?.data?.message || "Something went wrong.",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="mx-auto">
      <div className="lg:flex justify-between items-end">
        <div className="mb-4">
          <h2 className="text-lg font-Work font-normal dark:text-darkAccent3">
            On-Roll Employees
          </h2>
          <p className="text-sm font-Work font-normal dark:text-darkMuted md:w-[90%]">
            List of employees directly hired by the company with salaries and
            benefits.
          </p>
        </div>
        <div className="relative w-full lg:w-auto mb-4">
          <input
            type="text"
            placeholder="Search employee"
            className="w-full lg:w-80 h-10 pl-4 pr-12 border border-gray-300 dark:border-darkDevider dark:bg-darkcardBg dark:text-darkPrimaryText focus:outline-none focus:ring-2 focus:ring-darkAccent1 outline-none"
            value={searchQuery}
            onChange={handleSearch} // Handle search input changes
          />
          <span className="absolute top-1/2 right-4 transform -translate-y-1/2 dark:text-darkAccent2 text-darknavbarBg cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </div>
      </div>

      {allEmployeeData.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Empty description="No employees available" />
        </div>
      ) : (
        <>
          <div className="overflow-y-auto ">
            <table className="min-w-full table-fixed overflow-x-auto text-sm">
              <thead className="bg-gray-200 dark:bg-darkcardBg dark:text-gray-300 text-nowrap sticky top-0">
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg sticky left-0">
                    Avatar
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Emp. ID
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Name
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Email
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Contact No
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    DOB
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    DOJ
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Status
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Anniversary
                  </th>
                  <th className="px-6 py-3 w-[10%] font-normal text-center bg-gray-200 dark:bg-darkcardBg">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr
                    key={employee.employeeId}
                    className="hover:bg-gray-50 dark:hover:bg-darkcardBg border-b dark:border-b-darkDevider"
                  >
                    <td className="px-4 py-2 sticky left-0 bg-white dark:bg-darknavbarBg">
                      {employee.profileImage ? (
                        <img
                          src={`data:image/jpeg;base64,${employee.profileImage}`}
                          alt={employee.fullName}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-white">
                          {employee.fullName
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.employeeId}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.fullName}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.emailAddress}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.mobileNumber}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.dateOfBirth}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.joiningDate}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.status || "active"}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      {employee.anniversaryDate}
                    </td>
                    <td className="px-4 py-2 text-nowrap text-center dark:text-darkPrimaryText">
                      <button
                        className="bg-red-500 text-white px-2 py-2 "
                        onClick={() => handleDelete(employee.id)}
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-start mt-4">
            <button
              onClick={() => handlePagination(currentPage - 1)}
              className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <span className="mx-2 dark:text-darkPrimaryText">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePagination(currentPage + 1)}
              className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OnRollEmployees;
