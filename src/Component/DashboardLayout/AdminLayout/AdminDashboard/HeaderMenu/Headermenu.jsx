import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Headermenu = () => {
  const isVisible = useSelector((state) => state.headermenu.isVisible);
  // console.log("Header menu visibility:", isVisible);
  const authCodedashboard = "c23049kjdfn320sdkfn3409sdfn3409lkskdn32skjb$%^";
  const leaveManage = "sdfkjwefk8934573209842(*^&%$%^&*(*Vsk dkjnkdnkasdkjkjbdjwber348959348580934850";
  const attendance = "dskj23894723984u2kjedwjebdwed*&%^%%&$$%%^^*^$askjjbdkjbdkjnde203842038423084809238021830123e2";
  const empdrictory = "sdlfkwekldjwer09238409238klasndkjasndkj%%&&^aslkdnlksmd";
  return (
    <div>
      <div
        className={`navbar-container ${
          isVisible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <div className="py-3 hidden md:block bg-white border-b text-[12px] lg:text-[14px]  text-darkPrimaryBtn dark:text-darkPrimaryText dark:border-darkDevider dark:bg-darkmainBg">
          <div className="w-[90%] mx-auto">
            <ul className="flex gap-8 w-full">
              <NavLink
                to={`/adminDashboard?authCode=${encodeURIComponent(authCodedashboard)}`}
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span className="hidden lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                    />
                  </svg>
                </span>
                <li>Dashboard</li>
              </NavLink>
              <NavLink
                to={`/manageLeaves?authCode=${encodeURIComponent(leaveManage)}`}
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span className="hidden lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                    />
                  </svg>
                </span>
                <li>Leave Management</li>
              </NavLink>
              <NavLink
                to={`/attendance?authCode=${encodeURIComponent(attendance)}`}
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span className="hidden lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>
                </span>
                <li>Attendance</li>
              </NavLink>

              <NavLink
                to={`/allemployees?authCode=${encodeURIComponent(empdrictory)}`}
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span className="hidden lg:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </span>
                <li>Employee Directory</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headermenu;
