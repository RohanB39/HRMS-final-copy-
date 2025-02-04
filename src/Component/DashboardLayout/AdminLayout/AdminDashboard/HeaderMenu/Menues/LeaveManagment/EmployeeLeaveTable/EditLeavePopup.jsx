import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editLeaves } from "../../../../../../../../Redux/thunks/editLeaves";
import { leavesReportApi } from "../../../../../../../../Redux/thunks/leavesReportApi";
import toast from "react-hot-toast";

const EditLeavePopup = ({ employee, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    approvedLeaves: employee.approvedLeaves || 0,
    leaveBalance: employee.leaveBalance || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  const handleSave = async () => {
    try {
      await dispatch(
        editLeaves({
          employeeId: employee.employeeId,
          leaveId: employee.leaveId,
          approvedLeaves: formData.approvedLeaves,
          leaveBalance: formData.leaveBalance,
        })
      ).unwrap();

      toast.success("Leaves Updated Successfully!");
      dispatch(leavesReportApi());
      onClose();
    } catch (error) {
      toast.error(`Error: ${error.message || "Failed to update leaves"}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-darkModalBg p-4 md:w-96 w-[90%]">
        <div className="mb-4">
          <h2 className="text-lg font-normal text-gray-800 dark:text-white">
            {employee.fullName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-darkMuted">
            Employee ID: {employee.employeeId}
          </p>
          <p className="text-sm text-gray-600 dark:text-darkMuted">
            Leave Type: {employee.leaveName}
          </p>
        </div>

        {/* Approved Leaves Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm dark:text-gray-300">
            Approved Leaves
          </label>
          <input
            type="Number"
            name="approvedLeaves"
            value={formData.approvedLeaves}
            onChange={handleChange}
            className="w-full p-2 border dark:border-darkDevider dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Leave Balance Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">
            Leave Balance
          </label>
          <input
            type="number"
            name="leaveBalance"
            value={formData.leaveBalance}
            onChange={handleChange}
            className="w-full p-2 border dark:border-darkDevider dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300  mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLeavePopup;
