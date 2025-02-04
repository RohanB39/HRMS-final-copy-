import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { fetchOnLeaveEmployee } from "../../../../../../../Redux/thunks/fetchOnLeaveEmployee";

const CustomModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-darkModalBg p-4 shadow-lg max-w-md w-[95%]">
        <div className="flex justify-between items-center">
          <h2 className="text-xl mb-4 text-gray-800 font-Work dark:text-darkPrimaryText">
            Leave Details
          </h2>
          <button
            onClick={onClose}
            className="bg-darkAccent2 text-darkmainBg hover:bg-yellow-500 p-2"
          >
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <hr className="mt-2 mb-2 dark:border-darkDevider" />
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <div
              className="w-12 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center text-lg"
              title={employee.fullName}
            >
              {employee.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <p className="mb-1 dark:text-darkPrimaryText">
                {employee.fullName}
              </p>
              <p className="mb-2 dark:text-darkMuted text-sm font-Work">
                {employee.employeeId}
              </p>
            </div>
          </div>
          <p className="mb-2 font-Work text-sm dark:text-darkAccent2">
            <strong className="font-normal font-Work dark:text-darkMuted">
              Leave Date:
            </strong>{" "}
            <br />
            {employee.leaveStartDate}
          </p>
        </div>
        <p className="mb-2 font-Work text-sm dark:text-darkAccent3">
          <strong className="font-normal  font-Work max-w-[200px] dark:text-darkMuted">
            Reason:
          </strong>{" "}
          <br />
          <span className="text-sm whitespace-pre-wrap break-words">
            {" "}
            {employee.reason}
          </span>
        </p>
      </div>
    </div>
  );
};

const ConfirmedEmployeeLeaveList = () => {
  const dispatch = useDispatch();
  const { OnLeave = [], loading, error } = useSelector((state) => state.hr);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchOnLeaveEmployee());
  }, [dispatch]);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };
  const filteredOnLeave = OnLeave.filter((employee) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const leaveStartDate = new Date(employee.leaveStartDate);
    const leaveEndDate = new Date(employee.leaveEndDate);
    leaveEndDate.setHours(0, 0, 0, 0);
    leaveStartDate.setHours(0, 0, 0, 0);
    return leaveStartDate.getTime() === today.getTime();
  });

  return (
    <div className="w-full mb-4 h-[300px]">
      <div className="mb-6">
        <h3 className="text-lg font-normal text-gray-800 tracking-wide dark:text-white">
          Employees on Leave
        </h3>
        <p className="text-gray-600 dark:text-darkMuted text-sm">
          Track, manage, and edit employee leave details with ease.
        </p>
      </div>

      {filteredOnLeave.length > 0 ? (
        <ul className="overflow-y-auto px-2" style={{ maxHeight: "300px" }}>
          {filteredOnLeave.map((employee) => (
            <li
              key={employee.employeeId}
              className="mt-2 pb-4 flex items-center transition-shadow cursor-pointer dark:border-b-darkDevider border-b"
              onClick={() => handleEmployeeClick(employee)}
            >
              <div
                className="w-12 h-10 rounded-full bg-gray-500 dark:bg-yellow-300 text-white dark:text-darkmainBg flex items-center justify-center font-normal text-sm"
                title={employee.fullName}
              >
                {employee.fullName
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <div className="ml-4 w-full flex justify-between items-center">
                <div>
                  <h3
                    className="text-[14px] font-normal text-gray-900 dark:text-darkPrimaryText"
                    title={employee.reason}
                  >
                    {employee.fullName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-darkMuted">
                    ID: {employee.employeeId}
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-darkAccent text-right">
                  Leave Date: <br />
                  <span className="text-darkMuted text-gray-500">
                    {employee.leaveStartDate}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-40">
          <Empty description="No employees on leave today" />
        </div>
      )}

      <CustomModal employee={selectedEmployee} onClose={handleCloseModal} />
    </div>
  );
};

export default ConfirmedEmployeeLeaveList;
