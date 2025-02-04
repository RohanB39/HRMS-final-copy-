import React, { useState, useEffect } from "react";
import PendingLeaves from "./PendingLeaves";
import PendingAttendance from "./PendingAttendance";
import CoffRequest from "./CoffRequest";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingLeaves } from "../../../../../Redux/thunks/fetchPendingLeaves";
import { fetchPendingRegularizations } from "../../../../../Redux/thunks/fetchPendingRegularizations";
import { fetchPendingCoff } from "../../../../../Redux/thunks/fetchPendingCoff";
import LateEmployees from "./LateEmployees";
import PendingRegularization from "./PendingPayroll";
import { Toaster, toast } from "react-hot-toast";

const KeyMetriksDataTables = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevNotifications, setPrevNotifications] = useState({
    leaves: 0,
    regularization: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingLeaves());
    dispatch(fetchPendingRegularizations());
    dispatch(fetchPendingCoff());
  }, [dispatch]);

  const { pendingLeaves } = useSelector((state) => state.hr);
  const { pendingCoff } = useSelector((state) => state.hr);
  const { regularizationsPending } = useSelector((state) => state.hr);

  const notificationCountForLeaves = pendingLeaves?.length || 0;
  const notificationForRegularization = regularizationsPending?.length || 0;
  const notificationCountForCoff = pendingCoff?.length || 0;

  // useEffect(() => {
  //   if (notificationCountForLeaves > prevNotifications.leaves) {
  //     toast.success(`You have ${notificationCountForLeaves} new leave requests!`);
  //   }
  //   if (notificationForRegularization > prevNotifications.regularization) {
  //     toast.success(`You have ${notificationForRegularization} new regularization requests!`);
  //   }

  //   setPrevNotifications({
  //     leaves: notificationCountForLeaves,
  //     regularization: notificationForRegularization,
  //   });
  // }, [notificationCountForLeaves, notificationForRegularization]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  const tabs = [
    { name: "Leave Requests", notification: notificationCountForLeaves },
    { name: "Todays Attendance" },
    {
      name: "Regularization Requests",
      notification: notificationForRegularization,
    },
    { name: `Late Emp In ${currentMonth}`, notification: 0 },
    {
      name: `C-Off requests `,
      notification: notificationCountForCoff,
    },
  ];

  const tabContent = [
    <div className="py-4">
      <PendingLeaves />
    </div>,
    <div className="py-4">
      <PendingAttendance />
    </div>,
    <div className="py-4">
      <PendingRegularization />
    </div>,
    <div className="py-4">
      <LateEmployees />
    </div>,
    <div className="py-4">
      <CoffRequest />
    </div>,
  ];

  return (
    <div className="dark:border-darkDevider border border-gray-100 px-2">
      <Toaster position="top-right" />

      <div className="mb-4 mt-6">
        <h3 className="font-normal text-[18px] text-primaryText dark:text-darkAccent3">
          Pending Approvals
        </h3>
        <p className="text-gray-700 text-[14px] dark:text-darkMuted">
          Your action is required to review and approve pending requests
          promptly.
        </p>
      </div>

      <div>
        <div className="flex border-b dark:border-darkDevider scrollbarHide  text-nowrap overflow-x-auto  ">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`relative px-4 py-2 text-sm font-normal font-Work  tracking-wide mt-6 ${
                activeTab === index
               ? "border-b-2 dark:border-yellow-500 dark:text-yellow-300 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.name}
              {tab.notification > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-3 -translate-y-2 flex items-center p-2 justify-center w-6 h-6 bg-blue-500 text-white text-xs rounded-r-2xl rounded-tl-3xl shadow-2xl">
                  {tab.notification}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-4">{tabContent[activeTab]}</div>
      </div>
    </div>
  );
};

export default KeyMetriksDataTables;
