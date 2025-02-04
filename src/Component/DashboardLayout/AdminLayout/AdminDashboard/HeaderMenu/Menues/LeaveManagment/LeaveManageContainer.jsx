import React from "react";

import LeaveStatsContainer from "./LeaveStats/LeaveStatsContainer";

import EmployeeLeaveTable from "./EmployeeLeaveTable/EmployeeLeaveTable";
import ConfirmedEmployeeLeaveList from "./ConfirmedEmployeeLeaveList";
import EmployeeLeaveHistory from "./EmployeeLeaveTable/EmployeeLeaveHistory";

const LeaveManage = () => {
  return (
    <>
      {/* leave page content */}
      <div className="w-[90%] mx-auto ">
        <div className="leavestats ">
          <LeaveStatsContainer />
        </div>
        <div className="mt-8 lg:mt-20 mb-6">
          <div className="flex flex-col-reverse min-h-full lg:flex-row lg:flex lg:flex-wrap justify-between gap-1 ">
            <div className="w-full lg:w-[68%] dark:border dark:border-darkmainBg">
              <EmployeeLeaveTable />
            </div>
            <div className="w-full lg:w-[30%] h-full overflow-hidden  bg-gray-50 dark:bg-darkcardBg border dark:border-darkDevider p-4">
              <ConfirmedEmployeeLeaveList />
            </div>
          </div>
          <hr className="dark:border-darkDevider mt-4 mb-4" />
          <div className="flex flex-col-reverse min-h-full lg:flex-row lg:flex lg:flex-wrap justify-between gap-1 ">
            <div className="w-full lg:w-full dark:border dark:border-darkmainBg mt-3">
              <EmployeeLeaveHistory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveManage;
