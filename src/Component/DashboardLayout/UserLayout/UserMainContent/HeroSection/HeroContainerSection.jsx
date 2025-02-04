import React from "react";
import WorkHours from "./WorkHours";
import SpecialDay from "./SpecialDay";
import TotalLeaves from "./TotalLeaves";
import TotalAbsent from "./TotalAbsent";
import UsedLeaves from "./UsedLeaves";
import EmployeeInfoGraph from "./EmployeeInfoGraph";

import UpcomingHolidays from "./UpcomingHolidays";
import QuoteOfTheDay from "./QuoteOfTheDay";
import LateLogins from "./LateLogins";
import ConfirmedEmployeeLeaveList from "../../../AdminLayout/AdminDashboard/HeaderMenu/Menues/LeaveManagment/ConfirmedEmployeeLeaveList";

const HeroSection = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-col ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-auto md:mb-0">
            {/* First half with nested grid */}
            <div className="grid grid-cols-2 gap-2 h-full">
              <div className="flex flex-col justify-between ">
                {/* allemployee */}
                <TotalLeaves />

                {/* absents */}
                <TotalAbsent />
              </div>
              {/* on leave */}
              <UsedLeaves />
            </div>

            {/* Second half occupied by the larger div */}
            <EmployeeInfoGraph />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-auto mt-2">
            {/* First Half with Two Divs (Nested Grid) */}
            <div className="grid md:grid-cols-2 gap-2 md:h-[400px] ">
              {/* upcoming holidays */}
              <UpcomingHolidays />
              {/* quotes */}
              {/* <QuoteOfTheDay /> */}
              <div className="border p-2 dark:border-darkDevider border-gray-400">
                <ConfirmedEmployeeLeaveList />
              </div>
            </div>

            {/* Second Half with Nested Grid and Div */}
            <div className="flex flex-col h-full gap-y-2">
              <div className="grid md:grid-cols-2  gap-2 h-[500px] md:h-2/3">
                {/* late latifs */}
                <LateLogins />
                {/* presenty count */}
                <div className="bg-darkcardBg h-full">
                  <WorkHours />
                </div>
              </div>
              {/* special day */}
              <div className="lg:h-2/6 h-auto ">
                <SpecialDay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
