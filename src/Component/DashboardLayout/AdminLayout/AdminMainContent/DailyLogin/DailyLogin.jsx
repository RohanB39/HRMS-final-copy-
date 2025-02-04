import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaysPresenty } from "../../../../../Redux/thunks/fetchTodaysPresentyApi";

const DailyLogin = () => {
  const dispatch = useDispatch();
  const { todayspresenceList, loading, error } = useSelector(
    (state) => state.hr
  );

  const [searchQuery, setSearchQuery] = useState("");
  const filteredEmployees = todayspresenceList.filter((employee) =>
    employee.employeeName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" relative dark:bg-darkcardBg border border-gray-400 h-full dark:border-darkDevider">
      <div className="sticky top-0 bg-gray-100 dark:bg-darknavbarBg p-4">
        <div className="dark:text-darkPrimaryText font-normal text-lg">
          Today's Login
        </div>
        <hr className="mt-2 mb-2 border-gray-300 dark:border-darkDevider" />

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border  text-sm dark:bg-darkinputBg dark:border-darkDevider dark:text-darkPrimaryText focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 max-h-96 overflow-y-auto space-y-4">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b dark:border-b-darkDevider border-gray-300 px-4 pb-2"
            >
              <div className="flex items-center space-x-4">
                {employee.profileImage ? (
                  <img
                    src={`data:image/jpeg;base64,${employee.profileImage}`}
                    alt={employee.employeeName}
                    className="h-10 w-10 rounded-full border"
                  />
                ) : (
                  // If no profile picture, show initials
                  <div className="h-10 w-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
                    <span className="text-sm font-semibold">
                      {employee.employeeName
                        ? employee.employeeName
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .join("")
                            .toUpperCase()
                        : "NA"}
                    </span>
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="font-normal dark:text-darkPrimaryText text-sm font-Work">
                    {employee.employeeName}
                  </span>
                  <span className="text-sm font-work font-light text-gray-500 dark:text-darkMuted">
                    {employee.designation}
                  </span>
                </div>
              </div>

              {/* Second Column: Login Time */}
              <div
                className={`text-sm tracking-wide ${
                  employee.isLateIn
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-500 dark:text-green-400"
                }`}
              >
                {employee.signInTime}
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 dark:text-darkMuted text-center">
            No employees found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyLogin;
