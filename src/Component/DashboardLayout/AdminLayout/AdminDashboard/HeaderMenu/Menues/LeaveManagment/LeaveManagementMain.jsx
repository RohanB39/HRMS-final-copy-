import React, { useState } from "react";
import AdminHeader from "../../../AdminHeader";
import SidebarMenu from "../../../SidebarMenu/SidebarMenu";
import LeaveManage from "./LeaveManageContainer";
import LeaveManagementMainContent from "../../../../../UserLayout/UserDashboard/HeaderMenu/Menues/LeaveRecord/LeaveManagementMainContent";

const LeaveManagementMain = () => {
  const [activeTab, setActiveTab] = useState("allLeaves");

  return (
    <div>
      <div className="sticky top-0 z-20">
        <AdminHeader />
      </div>
      <aside>
        <SidebarMenu />
      </aside>
      <div className="">
        <div className="w-[90%] mx-auto flex items-center gap-8 mt-8 font-Work font-normal ">
          {/* Tab Buttons */}
          <p
            onClick={() => setActiveTab("allLeaves")}
            className={`cursor-pointer pb-2 font-normal font-Work text-sm ${
              activeTab === "allLeaves"
                ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                : "dark:text-darkMuted text-gray-500"
            }`}
          >
            Leave Overview
          </p>
          <p
            onClick={() => setActiveTab("yourLeaves")}
            className={`cursor-pointer pb-2 font-Work font-normal text-sm ${
              activeTab === "yourLeaves"
                ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                : "dark:text-darkMuted text-gray-500"
            }`}
          >
            Leaves Info
          </p>
        </div>
        <hr className="dark:border-darkDevider" />

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "allLeaves" && <LeaveManage />}
          {activeTab === "yourLeaves" && <LeaveManagementMainContent />}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementMain;
