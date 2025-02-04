import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCoffRequest } from "../../../../../../../Redux/thunks/AddCoffRequest";
import toast from "react-hot-toast";

const RequestCOFF = ({ close }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.hr);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [formData, setFormData] = useState({
    employeeId: loggedInUser?.employeeId || "",
    requestedDays: null,
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await dispatch(AddCoffRequest(formData));
      const payload = response?.payload;
      if (!payload) {
        console.error("Payload is missing or undefined:", response);
        toast.error("Unexpected response from the server.");
        return;
      }
      const message = payload?.message;
        setFormData({
          employeeId: loggedInUser?.employeeId || "",
          requestedDays: null,
          reason: "",
        });
        toast.success(message);
        close();
    } catch (error) {
      console.error("Error while submitting Coff request:", error);
      toast.error("Failed to submit Coff request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-80 mx-auto p-4 bg-white dark:bg-darkModalBg shadow-lg">
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
        Request COFF
      </h1>
      <hr className="dark:border-darkDevider" />

      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="flex flex-col">
            <label
              htmlFor="day"
              className="text-gray-700 text-sm font-normal mb-1 dark:text-darkMuted"
            >
              Requested Days:
            </label>
            <input
              type="number"
              id="day"
              name="requestedDays"
              value={formData.requestedDays}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 outline-none focus:ring-2 text-sm dark:text-darkAccent3 dark:border-darkDevider focus:ring-darkDevider dark:bg-darkinputBg"
              required
            />
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RequestCOFF;
