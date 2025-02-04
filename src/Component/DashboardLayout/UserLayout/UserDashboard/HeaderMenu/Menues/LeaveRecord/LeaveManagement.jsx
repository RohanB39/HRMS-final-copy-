import React from 'react'
import UserHeader from '../../../UserHeader'
import SidebarMenu from '../../../SidebarMenu/SidebarMenu'
import LeaveManagementMainContent from './LeaveManagementMainContent'

const LeaveManagement = () => {
  return (
    <>
    <header className="sticky top-0 z-10">
      <UserHeader />
    </header>
    <div className="flex ">
      <aside className="z-20">
        <SidebarMenu />
      </aside>
      <main className="w-full">
        <LeaveManagementMainContent />
      </main>
    </div>
  </>
  )
}

export default LeaveManagement