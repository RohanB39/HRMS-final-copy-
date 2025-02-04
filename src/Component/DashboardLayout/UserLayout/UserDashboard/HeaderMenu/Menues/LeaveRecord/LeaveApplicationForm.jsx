import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeaves } from "../../../../../../../Redux/thunks/fetchAllLeaves";
import { createNewLeaveApplication } from "../../../../../../../Redux/thunks/createNewLeaveApplication";
import toast from "react-hot-toast";

const LeaveApplicationForm = ({ close }) => {
  const dispatch = useDispatch();
  const {
    AllLeaves = [],
    loading,
    error,
  } = useSelector((state) => state.employees);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [formData, setFormData] = useState({
    employeeId: loggedInUser?.employeeId || "",
    leaveId: "",
    leaveType: "",
    leaveStartDate: "",
    leaveEndDate: "",
    reason: "",
    applicationDate: getCurrentDate(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  const handleLeaveTypeChange = (event) => {
    const leaveType = event.target.value;
    const selectedLeave = AllLeaves.find(
      (leave) => leave.leaveName === leaveType
    );
    if (selectedLeave) {
      setFormData({
        ...formData,
        leaveId: selectedLeave.leaveId,
        leaveType: selectedLeave.leaveName,
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Start loading animation

    setTimeout(async () => {
      try {
        const response = await dispatch(
          createNewLeaveApplication(formData)
        ).unwrap();
        if (response.status === 404) {
          if (
            response.message ===
            "You can't apply for Short Leave more than twice in 1 month."
          ) {
            toast.error(
              "You can't apply for Short Leave more than twice in 1 month."
            );
          } else if (
            response.message ===
            "Leaves are not assigned. Please contact your HR"
          ) {
            toast.error("Leaves are not assigned. Please contact your HR.");
          }
        } else if (
          response.status === 400 &&
          response.message.startsWith("You Don't Have Enough Leaves")
        ) {
          toast.error("You don't have enough leaves.");
        } else if (
          response.status === 201 &&
          response.message.startsWith("Leave application created successfully")
        ) {
          toast.success("Leave application submitted successfully!");
          setFormData({
            employeeId: loggedInUser?.employeeId || "",
            leaveId: "",
            leaveType: "",
            leaveStartDate: "",
            leaveEndDate: "",
            reason: "",
            applicationDate: getCurrentDate(),
          });
          close();
        } else {
          toast.error("An unexpected error occurred.");
        }
      } catch (error) {
        console.error("Error submitting leave application:", error);
        if (error?.status && error?.message) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("Failed to submit leave application. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }, 5000);
  };

  return (
    <div className="relative max-w-xl mx-auto p-4 bg-white dark:bg-darkModalBg shadow-lg">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-500 dark:text-darkAccent3 hover:text-gray-800 dark:hover:text-white focus:outline-none"
        onClick={close}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h1 className="font-medium font-Work text-gray-800 mb-6 dark:text-darkAccent3">
        Leave Application
      </h1>
      <hr className="dark:border-darkDevider" />

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && AllLeaves.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="flex flex-col">
            <label
              htmlFor="leaveType"
              className="text-gray-700 font-normal mb-1 dark:text-darkMuted"
            >
              Leave Type:
            </label>
            <select
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleLeaveTypeChange}
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 text-sm dark:text-darkAccent3 dark:border-darkDevider focus:ring-darkDevider outline-none dark:bg-darkinputBg "
            >
              <option value="">Select Leave Type</option>
              {AllLeaves.map((leave, index) => (
                <option
                  key={index}
                  value={leave.leaveName}
                  className="text-gray-700 text-sm font-normal mb-1 dark:text-darkMuted"
                >
                  {leave.leaveName}
                  {leave.leaveBalance}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label
                htmlFor="leaveStartDate"
                className="text-gray-700 text-sm font-normal mb-1 dark:text-darkMuted"
              >
                Start Date:
              </label>
              <input
                type="date"
                id="leaveStartDate"
                name="leaveStartDate"
                value={formData.leaveStartDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 focus:outline-none focus:ring-2 text-sm dark:text-darkAccent3 dark:border-darkDevider focus:ring-darkDevider outline-none dark:bg-darkinputBg "
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="leaveEndDate"
                className="text-gray-700 text-sm font-normal mb-1 dark:text-darkMuted"
              >
                End Date:
              </label>
              <input
                type="date"
                id="leaveEndDate"
                name="leaveEndDate"
                value={formData.leaveEndDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 focus:outline-none focus:ring-2 text-sm dark:text-darkAccent3 dark:border-darkDevider focus:ring-darkDevider outline-none dark:bg-darkinputBg "
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="reason"
              className="text-gray-700 text-sm font-normal mb-1 dark:text-darkMuted"
            >
              Reason*:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 focus:outline-none focus:ring-2 text-sm dark:text-darkAccent3 dark:border-darkDevider focus:ring-darkDevider outline-none dark:bg-darkinputBg max-h-52 min-h-20"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting} // Disable button while loading
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      {!loading && !error && AllLeaves.length === 0 && (
        <p className="text-gray-600">No leaves available.</p>
      )}
    </div>
  );
};

export default LeaveApplicationForm;
