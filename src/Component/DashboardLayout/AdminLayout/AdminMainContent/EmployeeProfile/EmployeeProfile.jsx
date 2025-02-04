import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import AdminHeader from "../../AdminDashboard/AdminHeader";

const EmployeeProfile = () => {
  // Example of employees' data
  const [employeeData, setEmployeeData] = useState(null);

  // Sample employee data (you can fetch this dynamically from an API)
  const employees = [
    {
      id: 1,
      name: "John Doe",
      title: "Software Engineer",
      email: "john.doe@gmail.com",
      contact: "9876543210",
      address: "123, Elm Street, City",
      joinDate: "2015-01-01",
      promotionDate: "2018-01-01",
      anniversaryDate: "2020-01-01",
      totalLeaves: 30,
      leavesTaken: 10,
      pendingLeaves: 20,
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Product Manager",
      email: "jane.smith@gmail.com",
      contact: "1234567890",
      address: "456, Oak Avenue, Town",
      joinDate: "2016-05-01",
      promotionDate: "2019-05-01",
      anniversaryDate: "2022-05-01",
      totalLeaves: 25,
      leavesTaken: 5,
      pendingLeaves: 20,
    },
  ];

  const handleEmployeeClick = (id) => {
    const selectedEmployee = employees.find((emp) => emp.id === id);
    setEmployeeData(selectedEmployee);
  };

  useEffect(() => {
    if (employeeData === null && employees.length > 0) {
      setEmployeeData(employees[0]);
    }
  }, [employeeData]);

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminHeader />
      <div className="rightside flex">
        <div className="basis-[70%] px-16 mt-8">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            quas quibusdam nam, deserunt, laborum aperiam sit aliquam dolore
            autem dignissimos ullam! Repudiandae cupiditate aperiam
            exercitationem numquam a ducimus reprehenderit, possimus veritatis
            nostrum, magnam nesciunt atque iure mollitia placeat distinctio
            alias?
          </p>
          <div className="mt-6">
            <h3 className="font-medium text-gray-600 text-sm">
              Leave Information
            </h3>
            <div className="mt-2 text-sm">
              <div className="flex justify-between mb-1">
                <span>Total Allotted Leaves:</span>{" "}
                <span>{employeeData.totalLeaves}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Leaves Taken:</span>{" "}
                <span>{employeeData.leavesTaken}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Pending Leaves:</span>{" "}
                <span>{employeeData.pendingLeaves}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-screen fixed top-0 right-0 z-[-1] pt-36 w-[30%] shadow-2xl p-6 overflow-auto bg-white dark:bg-darkcardBg">
          {/* Sticky Section: Employee Details */}
          <div className="sticky top-0  dark:bg-darkcardBg ">
            <div className="flex items-end space-x-4 bg-white dark:bg-darkcardBg">
              <img
                src="../../../../../../public/portraits/pr11.webp"
                alt=""
                className="h-20 w-20"
              />
              {/* Employee Basic Details */}
              <div>
                <p className="font-bold text-lg text-black font-Work dark:text-darkPrimaryText">
                  {employeeData.name}
                </p>
                <p className="text-sm text-gray-400 font-Work dark:text-darkMuted font-normal">
                  {employeeData.title}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="mt-4">
            <h3 className="font-Work font-normal text-gray-600 dark:text-darkMuted text-sm">
              Basic Info:
            </h3>
            <div className="text-sm font-Work mt-2">
              <div className="flex gap-4 mb-1">
                <p className="font-medium font-Work dark:text-darkAccent3">
                  Name:
                </p>
                <span className="font-medium font-Work dark:text-darkAccent3">
                  {employeeData.name}
                </span>
              </div>
              <div className="flex gap-4 mb-1">
                <p className="font-medium font-Work dark:text-darkAccent3">
                  Email:
                </p>
                <span className="font-medium font-Work dark:text-darkAccent3">
                  {employeeData.email}
                </span>
              </div>
              <div className="flex gap-4 mb-1">
                <p className="font-medium font-Work dark:text-darkAccent3">
                  Contact:
                </p>
                <span className="font-normal font-Work dark:text-darkAccent3">
                  {employeeData.contact}
                </span>
              </div>
              <div className="flex gap-4 mb-1">
                <p className="font-normal font-Work dark:text-darkAccent3">
                  Address:
                </p>
                <span className="font-normal font-Work dark:text-darkAccent3">
                  {employeeData.address}
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Section: Career Timeline */}
          <div className="mt-4">
            <h3 className="font-Work font-normal text-gray-600 text-sm">
              Career Timeline
            </h3>
            <div className="mt-4">
              <Timeline mode="left">
                <Timeline.Item
                  dot={<div className="bg-blue-500 h-2 w-2 rounded-full " />}
                >
                  <p className="text-sm text-gray-800">
                    Joined: {employeeData.joinDate}
                  </p>
                </Timeline.Item>
                <Timeline.Item
                  dot={<div className="bg-green-500 h-2 w-2 rounded-full" />}
                >
                  <p className="text-sm text-gray-800">
                    Promotion: {employeeData.promotionDate}
                  </p>
                </Timeline.Item>
                <Timeline.Item
                  dot={<div className="bg-red-500 h-2 w-2 rounded-full" />}
                >
                  <p className="text-sm text-gray-800">
                    Anniversary: {employeeData.anniversaryDate}
                  </p>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfile;
