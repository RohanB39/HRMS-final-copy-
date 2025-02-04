import React, { useState, useEffect } from "react";
import CasualLeave from "./CasualLeave";
import EarnedLeave from "./EarnedLeave";
import PaidLeaves from "./PaidLeaves";
import ShortLeave from "./ShortLeave";
import SickLeave from "./SickLeave";
import { useDispatch, useSelector } from "react-redux";
import { holidaysApi } from "../../../../../../../../Redux/thunks/holidaysApi";
import axios from "axios";
import toast from "react-hot-toast";
import AddHolidayForm from "./AddHolidayForm";

const LeaveStats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [leaveData, setLeaveData] = useState({
    employeeName: "",
    leaveType: "Casual Leave",
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();
  const holidaysFromState = useSelector((state) => state.hr.holidays);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    dispatch(holidaysApi());
  }, [dispatch]);

  useEffect(() => {
    setHolidays(holidaysFromState || []);
  }, [holidaysFromState]);

  const handleDeleteHoliday = async (index) => {
    const rowData = holidays[index];
    setSelectedRow(rowData);
    try {
      const response = await axios.delete(
        `http://localhost:8081/api/holidays/deleteHoliday/${rowData.holidayId}`
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Holiday deleted successfully!");
      } else {
        toast.error("Failed to delete holiday!");
      }
    } catch (error) {
      console.error("Error adding holiday:", error);
      toast.error("An error occurred while adding the holiday!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=" mt-6">
      <div className="flex flex-col md:flex-row gap-5 justify-between lg:items-baseline w-[100%]">
        {/* Left Section */}
        <div className="flex-1 flex flex-col self-end">
          <h2 className="text-2xl font-semibold dark:text-darkAccent3 leading-tight tracking-wide mb-4">
            Lead with Impact <br /> Manage with Purpose
          </h2>
          <p className="text-gray-600 mb-6 dark:text-darkMuted text-sm tracking-wide w-[95%]">
            Effortlessly assign, edit, and manage leave requests, track approval
            rates, and monitor trends to optimize HR workflows and enhance
            operational efficiency.
          </p>
          <hr className="w-[80%] dark:border-border-gray-400 darkDevider" />
          <div className="flex gap-2">
            <div
              className="flex items-center gap-2 border w-fit p-2 mt-4 md:rounded-full px-4 dark:border-darkDevider shadow-sm md:shadow-xl cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <p className="dark:text-darkAccent3 text-sm">Manage Holidays</p>
              <span className="border p-2 rounded-full bg-yellow-300 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex-1 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-[300px]">
          {/* first column */}
          <div className="h-full flex flex-col gap-2">
            <div className="h-1/2 border border-gray-200 shadow-sm p-2 relative bg-gray-50 dark:border-darkDevider dark:bg-darkmainBg">
              {/* casual leave */}
              <CasualLeave />
            </div>

            <div className="h-1/2 border border-gray-200 shadow-sm p-2 relative dark:border-darkDevider dark:bg-darkcardBg">
              {/* earned leaves */}
              <EarnedLeave />
            </div>
          </div>

          {/* second column */}
          <div className="h-full flex flex-col gap-3 lg:mt-8 relative ">
            <div className="h-full dark:bg-darkModalBg bg-yellow-300 border dark:border-darkDevider shadow-md p-2">
              {/* paid leaves */}
              <PaidLeaves />
            </div>
          </div>
          {/* third column */}
          <div className="h-full flex md:flex-row lg:flex-col gap-2 ">
            <div className="h-1/2 border border-gray-300 dark:border-darkDevider shadow-sm p-2 relative">
              <ShortLeave />
            </div>
            <div className="h-1/2 border bg-gray-50 dark:bg-darkmainBg dark:border-darkDevider border-gray-200 shadow-sm p-2 relative">
              <SickLeave />
            </div>
          </div>
        </div>

        <div className="lg:hidden mt-6 md:mt-0 md:mb-[10rem] ">
          <div className="grid grid-cols-2 gap-2 h-1/2">
            <div className=" border  border-gray-200 shadow-sm p-2 relative bg-gray-50 dark:border-darkDevider dark:bg-darkmainBg">
              {/* casual leave */}
              <CasualLeave />
            </div>
            <div className=" border  border-gray-200 shadow-sm p-2 relative bg-gray-50 dark:border-darkDevider dark:bg-darkmainBg">
              <EarnedLeave />
            </div>
          </div>
          <div>
            <div className="h-full bg-yellow-300 dark:bg-darkModalBg border dark:border-darkDevider shadow-md mt-2 p-2">
              {/* paid leaves */}
              <PaidLeaves />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 h-1/2 mt-4">
            <div className=" border  border-gray-200 shadow-sm p-2 relative bg-gray-50 dark:border-darkDevider dark:bg-darkmainBg">
              <ShortLeave />
            </div>
            <div className=" border  border-gray-200 shadow-sm p-2 relative bg-gray-50 dark:border-darkDevider dark:bg-darkmainBg">
              <SickLeave />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <AddHolidayForm onClose={handleCloseModal} />}
    </div>
  );
};

export default LeaveStats;
