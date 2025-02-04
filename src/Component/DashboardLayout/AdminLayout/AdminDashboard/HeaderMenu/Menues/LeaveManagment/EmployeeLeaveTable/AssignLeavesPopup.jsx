import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { lveNotAssign } from "../../../../../../../../Redux/thunks/lveNotAssign";
import { assignLeave } from "../../../../../../../../Redux/thunks/assignLeave";
import toast from "react-hot-toast";

const AssignLeavesPopup = ({ onClose }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [approvedLeaves, setApprovedLeaves] = useState(0);
  const [leaveType, setLeaveType] = useState("LVE001");
  const [leaveDate, setLeaveDate] = useState("");
  const dispatch = useDispatch();
  const { fetchNotAssignedLeaves, loading, error } = useSelector(
    (state) => state.hr
  );

  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current && fetchNotAssignedLeaves.length === 0) {
      dispatch(lveNotAssign());
      initialLoad.current = false;
    }
  }, [dispatch, fetchNotAssignedLeaves]);

  const handleEmployeeChange = (e) => {
    const selectedEmployeeName = e.target.value;
    setEmployeeName(selectedEmployeeName);
    const selectedEmployee = fetchNotAssignedLeaves.find(
      (employee) => employee.fullName === selectedEmployeeName
    );
    setEmployeeId(selectedEmployee ? selectedEmployee.employeeId : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveData = {
      employeeId: employeeId,
      leaveId: leaveType,
      approvedLeaves: approvedLeaves,
      leaveBalance: approvedLeaves,
      assignedDate: leaveDate,
    };

    try {
      const resultAction = await dispatch(assignLeave(leaveData));

      if (assignLeave.fulfilled.match(resultAction)) {
        toast.success("Leave assigned successfully!");
      } else {
        toast.error("Failed to assign leave!");
      }
    } catch (error) {
      toast.error("Error occurred while assigning leave!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-slate-800 dark:bg-opacity-50 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-darkModalBg shadow-lg w-96 py-2 px-4 relative">
        <div className="mb-4 ">
          <h2 className="text-lg font-Work dark:text-darkAccent3">
            Assign Leaves
          </h2>
        </div>
        <hr className="mb-4" />
        <div className="overflow-y-auto max-h-60 ">
          <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-2 ">
              <div>
                <label
                  htmlFor="employeeName"
                  className="font-normal dark:text-darkMuted text-sm mb-3 font-Work"
                >
                  Employee Name
                </label>
                <select
                  id="employeeName"
                  className="w-full p-2 border border-gray-300 outline-none dark:bg-darkinputBg dark:text-darkPrimaryText text-sm dark:border-darkDevider"
                  value={employeeName}
                  onChange={handleEmployeeChange}
                >
                  <option value="">Select Employee</option>
                  {fetchNotAssignedLeaves.map((employee) => (
                    <option key={employee.employeeId} value={employee.fullName}>
                      {employee.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="employeeId"
                      className="font-normal dark:text-darkMuted text-sm mb-3 font-Work"
                >
                  Employee ID
                </label>
                <input
                  type="text"
                  id="employeeId"
                  className="w-full p-2 border border-gray-300 outline-none dark:bg-darkinputBg text-sm dark:border-darkDevider"
                  placeholder="Employee ID will be shown here"
                  value={employeeId}
                  readOnly
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="leaveType"
                  className="font-normal dark:text-darkMuted text-sm mb-3 font-Work"
                >
                  Leave Type
                </label>
                <select
                  id="leaveType"
                  className="w-full p-2 border border-gray-300 dark:text-darkPrimaryText outline-none dark:bg-darkinputBg text-sm dark:border-darkDevider"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="LVE001">Casual Leave</option>
                  <option value="LVE002">Earn Leave</option>
                  <option value="LVE003">Sick Leave</option>
                  <option value="LVE004">Short Leave</option>
                  <option value="LVE005">C-OFF Leave</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="leaveDate"
               className="font-normal dark:text-darkMuted text-sm mb-3 font-Work"
                >
                  Assign Date
                </label>
                <input
                  type="date"
                  id="leaveDate"
                  className="w-full p-2 border border-gray-300 outline-none dark:text-darkPrimaryText dark:bg-darkinputBg text-sm dark:border-darkDevider"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div>
                <label
                  htmlFor="approvedLeasves"
                    className="font-normal dark:text-darkMuted text-sm mb-3 font-Work"
                >
                  Approved Leaves
                </label>
                <input
                  type="number"
                  id="approvedLeasves"
                  className="w-full p-2 border border-gray-300 outline-none dark:text-darkPrimaryText dark:bg-darkinputBg text-sm dark:border-darkDevider"
                  placeholder="Approved Leaves"
                  value={approvedLeaves}
                  onChange={(e) => setApprovedLeaves(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 font-Work text-sm mt-6 mb-8 hover:bg-blue-700"
              disabled={!employeeId || !leaveDate}
            >
              Assign Leave
            </button>
          </form>
        </div>
        <button
          className="absolute top-3 bg-darkAccent2 py-1 right-3 px-2 mr-2"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AssignLeavesPopup;
