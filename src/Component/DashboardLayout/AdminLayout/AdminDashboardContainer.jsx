import React from "react";
import AdminHeader from "./AdminDashboard/AdminHeader";
import Sidebar from "./AdminDashboard/SidebarMenu/SidebarMenu";
import AdminMainContent from "./AdminMainContent/AdminMainContent";

const AdminDash = () => {
  return (
    <>
      <header className="sticky top-0 z-10">
        <AdminHeader />
      </header>
      <div className="flex ">
        <aside className="z-20">
          <Sidebar />
        </aside>
        <main className="w-full">
          <AdminMainContent />
        </main>
      </div>
    </>
  );
};

export default AdminDash;
