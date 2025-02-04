import React, { useState } from "react";
import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import { regularizationRequests } from "../../../../../../../Redux/thunks/regularizarionRequests";
import toast from "react-hot-toast";

const Regularization = ({ onClose, regularizationDays }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [reason, setReason] = useState("");
  const pageSize = 5;
  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * pageSize;
  const currentPageData = regularizationDays.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowSelect = (item) => {
    setSelectedRows((prev) =>
      prev.includes(item) ? prev.filter((row) => row !== item) : [...prev, item]
    );
  };

  console.log(regularizationDays);
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(regularizationDays);
    } else {
      setSelectedRows([]);
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  const handleSubmit = () => {
    const regularizationRequestsData = selectedRows.map((item) => ({
      employeeId: item.employeeId,
      signInId: item.signInId,
      date: item.date,
      status: item.status,
      regularizationStatus: "Pending",
    }));

    dispatch(regularizationRequests(regularizationRequestsData))
      .then((response) => {
        toast.success("Regularization requests submitted");
        onClose();
      })
      .catch((error) => {
        toast.error("Error submitting regularization requests:", error);
      });
  };

  return (
    <div className="bg-white dark:bg-darkModalBg p-4  w-[90%] md:w-[60%] lg:w-[40%] max-w-10xl mx-auto relative">
      <button
        className="absolute top-4 right-4 text-white bg-red-500 px-2 py-2 dark:bg-yellow-300 dark:text-darkmainBg  hover:bg-red-600"
        onClick={onClose}
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </button>

      <h2 className="text-lg font-Work font-normal mb-4 dark:text-white">
        Regularization Details
      </h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse table-auto text-sm">
          {/* Table Header */}
          <thead className="bg-gray-100 dark:bg-darkModalBg dark:text-darkAccent3 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-center font-Work font-normal w-[5%]">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === regularizationDays.length}
                />
              </th>
              <th className="px-4 py-2 text-center font-Work font-normal w-[5%] sticky left-0 bg-gray-100 dark:bg-darkModalBg">
                Sr/No
              </th>
              <th className="px-4 py-2 text-center font-Work font-normal w-[20%]">
                Date
              </th>
              <th className="px-4 py-2 text-center font-Work font-normal w-[20%]">
                Status
              </th>
              <th className="px-4 py-2 text-center font-Work font-normal w-[20%]">
                SignInId
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                  <input
                    type="checkbox"
                    onChange={() => handleRowSelect(item)}
                    checked={selectedRows.includes(item)}
                  />
                </td>
                <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b sticky left-0 bg-gray-50 dark:bg-darkModalBg dark:border-b-darkDevider py-2">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                  {item.date}
                </td>
                <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                  {item.status}
                </td>
                <td className="px-4 font-Work text-nowrap text-sm dark:text-darkMuted border-b dark:border-b-darkDevider py-2">
                  {item.signInId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end text-sm">
        <Pagination
          current={currentPage}
          total={regularizationDays.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      {/* Reason Input */}
      <div className="mt-4">
        <label className="block text-sm font-medium dark:text-darkMuted">
          Reason:
        </label>
        <input
          type="text"
          className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-darkDevider  dark:bg-darkinputBg dark:text-white focus:outline-none"
          placeholder="Enter your reason here..."
          value={reason}
          onChange={handleReasonChange}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4 flex justify-end">
        <button
          className="text-white bg-blue-500 px-4 py-2 text-sm"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Regularization;
