import React from "react";

import Sidebar from "./UserDashboard/SidebarMenu/SidebarMenu";
import UserMainContent from "./UserMainContent/UserMainContent";
import UserHeader from "./UserDashboard/UserHeader";

const UserDash = () => {
  return (
    <>
      <header className="sticky top-0 z-10">
        <UserHeader />
      </header>
      <div className="flex ">
        <aside className="z-20">
          <Sidebar />
        </aside>
        <main className="w-full">
          <UserMainContent />
        </main>
      </div>
    </>
  );
};

export default UserDash;
