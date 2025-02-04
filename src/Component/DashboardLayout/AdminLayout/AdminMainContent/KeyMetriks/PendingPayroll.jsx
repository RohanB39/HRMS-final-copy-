import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingRegularizations } from "../../../../../Redux/thunks/fetchPendingRegularizations";
import { addRegularize } from "../../../../../Redux/thunks/addRegularize";
import toast from "react-hot-toast";
import { rejectReguralization } from "../../../../../Redux/thunks/rejectReguralization";
import { updateWithSignInId } from "../../../../../Redux/thunks/updateWithSignInId";
import { Empty } from "antd";

const PendingRegularization = () => {
  const dispatch = useDispatch();
  const { regularizationsPending, loading, error } = useSelector(
    (state) => state.hr
  );
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(fetchPendingRegularizations());
  }, [dispatch]);

  const closeModal = () => {
    setSelectedRecord(null);
  };

  const handleRegularizeWithId = async () => {
    if (selectedRecord) {
      try {
        await dispatch(
          addRegularize({
            employeeId: selectedRecord.employeeId,
            date: selectedRecord.date,
            id: selectedRecord.id,
          })
        ).unwrap();
        toast.success("Regularization successful:");
        dispatch(fetchPendingRegularizations());
        closeModal();
      } catch (error) {
        toast.error("Error during regularization:", error.message || error);
      }
    }
  };

  const handlerejectRegularization = async () => {
    if (selectedRecord) {
      try {
        await dispatch(
          rejectReguralization({
            id: selectedRecord.id,
          })
        ).unwrap();
        toast.success("Regularization Rejected:");

        dispatch(fetchPendingRegularizations());
        closeModal();
      } catch (error) {
        toast.error("Error during regularization:", error.message || error);
      }
    }
  };

  const updateWithSignInIds = async () => {
    if (selectedRecord) {
      try {
        await dispatch(
          updateWithSignInId({
            id: selectedRecord.id,
            signInId: selectedRecord.signInId,
          })
        ).unwrap();
        toast.success("Regularization Updated:");
        dispatch(fetchPendingRegularizations());
        closeModal();
      } catch (error) {
        toast.error("Error during regularization:", error.message || error);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3;
  const totalPages = Math.ceil(
    (regularizationsPending || []).length / entriesPerPage
  );
  const paginatedData = (regularizationsPending || []).slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <>
        <div className="overflow-x-auto w-full">
          {regularizationsPending.length > 0 ? (
            <table className="w-full table-auto border-collapse table-layout-fixed">
              <thead className="bg-gray-200 font-Work dark:bg-darknavbarBg">
                <tr className="text-sm">
                  <th className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center font-normal sticky left-0 z-10 dark:bg-darknavbarBg dark:text-darkAccent3 font-Work text-nowrap bg-gray-50 ">
                    Sr.no
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Emp.Name
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Regularization Date
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-3 h-[50px] w-[20%] sm:w-[20%] md:w-[20%] font-normal text-center text-gray-700 dark:text-darkAccent3 font-Work text-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-transparent text-nowrap text-sm">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={item.employeeId}>
                      <td className="px-4 py-4 w-[10%] sm:w-[12%] md:w-[14%] text-center sticky dark:text-darkAccent3 left-0 z-10 dark:bg-darknavbarBg bg-gray-50 ">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                        {item.employeeName}
                      </td>
                      <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkMuted dark:text-darkAccent3 font-Work font-normal text-center dark:border-darkdevider">
                        {item.status}
                      </td>
                      <td className="px-6 py-4 text-gray-900 h-[45px] dark:text-darkAccent2  font-Work font-normal text-center dark:border-darkdevider">
                        <button
                          className="px-4 py-1"
                          onClick={() => setSelectedRecord(item)}
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
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-sm text-gray-600 dark:text-darkAccent2"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-64">
              <Empty description="No Data Available" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-start mt-4">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            {"<"}
          </button>
          <span className="mx-2 dark:text-darkPrimaryText text-sm">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="px-3 py-1 dark:bg-darkcardBg dark:border dark:border-darkDevider dark:text-darkAccent2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            {">"}
          </button>
        </div>

        {/* Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="dark:bg-darkModalBg bg-white w-[90%] sm:w-[60%] md:w-[40%] ">
              {selectedRecord.status === "Regularization" ? (
                <div className="mb-4 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-darkAccent3 dark:hover:text-white"
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
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <p className="text-gray-700 dark:text-darkAccent3 font-Work text-sm p-5">
                    <span className="font-normal mb-2 text-base">
                      {selectedRecord.employeeName}
                    </span>{" "}
                    <br />
                    has not recorded attendance on{" "}
                    <span className="font-semibold">{selectedRecord.date}</span>
                    . <br />
                    To regularize the attendance, click the "Regularize" button.
                    Otherwise, select "Reject."
                  </p>

                  <div className="flex justify-end gap-4 mt-2 p-4">
                    <button
                      className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-Work"
                      onClick={handleRegularizeWithId}
                    >
                      Regularize
                    </button>
                    <button
                      className="px-4 py-2 text-red-800 border text-sm font-Work dark:bg-red-700 dark:text-white dark:border-darkDevider"
                      onClick={handlerejectRegularization}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ) : selectedRecord.status === "HalfDay" ||
                selectedRecord.status === "Absent" ? (
                <div className="bg-white dark:bg-gray-900 p-4 mb-4 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-darkAccent3 dark:hover:text-white"
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
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <p className="text-gray-700 dark:text-darkAccent3 font-Work p-5">
                    <span className="font-semibold">
                      {selectedRecord.employeeName}
                    </span>{" "}
                    is marked attendance on{" "}
                    <span className="font-semibold">{selectedRecord.date}</span>
                    , but the minimum working hours were not completed. If you
                    want to regularize, click on the "Regularize" button;
                    otherwise, click "Reject." <br />
                    Below are the attendance & Regularization ID:
                  </p>
                  <p className="font-semibold mt-2">
                    Attendance ID: {selectedRecord.id}
                  </p>
                  <p className="font-semibold">
                    SignIn ID: {selectedRecord.signInId}
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                      onClick={updateWithSignInIds}
                    >
                      Regularize
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={handlerejectRegularization}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default PendingRegularization;
