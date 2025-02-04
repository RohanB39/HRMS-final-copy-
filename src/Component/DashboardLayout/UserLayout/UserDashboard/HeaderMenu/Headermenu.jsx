import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Headermenu = () => {
  const isVisible = useSelector((state) => state.headermenu.isVisible);
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
                to="/userDashboard"
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span>
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
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                <li>Home</li>
              </NavLink>
              <NavLink
                to="/leavesRecords"
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span>
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
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </span>
                <li>Leave Management</li>
              </NavLink>
              <NavLink
                to="/attendanceRecords"
                className={({ isActive }) =>
                  `tracking-wide font-Work capitalize flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-primary border-darkAccent border px-2 py-1  dark:bg-darkmainBg"
                      : "dark:text-darksecondaryText text-gray-500 dark:text-darkMuted dark:hover:text-white"
                  }`
                }
              >
                <span>
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
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  </svg>
                </span>
                <li>Attendance Records</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headermenu;
