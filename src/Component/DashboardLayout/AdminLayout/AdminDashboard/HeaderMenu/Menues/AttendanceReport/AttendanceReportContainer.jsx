import React, { useState } from "react";
import AdminHeader from "../../../AdminHeader";
import AttendanceMuster from "./AttendanceMuster";
import AttendanceInfo from "./AttendanceInfo";

const AttendanceReportContainer = () => {
  const [activeTab, setActiveTab] = useState("muster");

  return (
    <div>
      <AdminHeader />
      <div className="w-[90%] mx-auto">
        <div className="flex gap-8 mt-8">
          {/* Tab Buttons */}
          <p
            onClick={() => setActiveTab("muster")}
            className={`cursor-pointer pb-2 text-sm font-Work font-normal ${
              activeTab === "muster"
                ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                : "dark:text-darkMuted text-gray-500"
            }`}
          >
            Attendance Muster
          </p>
          <p
            onClick={() => setActiveTab("info")}
            className={`cursor-pointer pb-2 text-sm font-Work font-normal ${
              activeTab === "info"
                ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                : "dark:text-darkMuted text-gray-500"
            }`}
          >
            Attendance Info
          </p>
        </div>
        <hr className="dark:border-darkDevider" />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "info" && <AttendanceInfo />}
          {activeTab === "muster" && <AttendanceMuster />}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReportContainer;
