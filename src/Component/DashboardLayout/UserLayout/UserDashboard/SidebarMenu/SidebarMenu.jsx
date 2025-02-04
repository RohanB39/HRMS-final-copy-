import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../../Redux/Features/hrSlice";
import { Spin, Avatar } from "antd";

const SidebarMenu = () => {
  const isVisible = useSelector((state) => state.sidebar.isVisible);
  const loggedInUser = useSelector((state) => state.hr.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initials, setInitials] = useState(""); // State for initials

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("loggedInUser");

      dispatch(logout());

      setLoading(false);

      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    if (loggedInUser && loggedInUser.fullname) {
      const userInitials = getInitials(loggedInUser.fullname);
      setInitials(userInitials);
    } else {
      setInitials("HK"); // Default initials if no full name is found
    }
  }, [loggedInUser]);

  const profileImage = loggedInUser?.additionalInfo?.profileImage;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0).toUpperCase())
      .join("");
  };

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 1 }}
      animate={isVisible ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      className="h-screen bg-slate-50 z-10 w-[100%] md:hidden fixed left-0 overflow-x-hidden dark:bg-darknavbarBg dark:text-darkAccent"
    >
      {loading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-50">
          <Spin size="large" tip="Logging out..." />
        </div>
      )}

      {/* Sidebar content */}
      <div className="py-4 px-2 mt-2">
        <div className="flex items-center gap-4 p-4">
          <Avatar
            size="large"
            src={profileImage || undefined}
            className="dark:bg-white dark:text-darkmainBg"
            alt={loggedInUser.fullname}
          >
            {/* Display initials when there is no profile image */}
            {!profileImage && initials}
          </Avatar>
          <div className="leading-tight">
            <p className="text-[20px] font-medium tracking-wide dark:text-yellow-300">
              {loggedInUser.fullname}
            </p>
            <small className="dark:text-darkMuted tracking-wide">
              Corely.in
            </small>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <ul>
          <li>
            <NavLink
              to="/userDashboard"
              className={({ isActive }) =>
                `text-[18px] font-Work tracking-wide py-4 px-8 flex items-center gap-5 ${
                  isActive
                    ? "dark:text-yellow-300 text-yellow-600"
                    : "dark:text-darkMuted hover:bg-gray-100 dark:hover:bg-navbarBg"
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leavesRecords"
              className={({ isActive }) =>
                `text-[18px] font-Work tracking-wide py-4 px-8 flex items-center gap-5 ${
                  isActive
                    ? "dark:text-darkAccent2 text-yellow-700"
                    : "dark:text-darkMuted hover:bg-gray-100 dark:hover:bg-navbarBg"
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </span>
              Leave Records
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/attendanceRecords"
              className={({ isActive }) =>
                `text-[18px] font-Work tracking-wide py-4 px-8 flex items-center gap-5 ${
                  isActive
                    ? "dark:text-darkAccent2 text-yellow-700"
                    : "dark:text-darkMuted hover:bg-gray-100 dark:hover:bg-navbarBg"
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
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
              </span>
              Attendance Records
            </NavLink>
          </li>

          <li>
            <NavLink
              className={
                "text-[18px] font-Work tracking-wide py-4 px-8 flex items-center gap-5"
              }
              onClick={handleLogout}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </span>
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SidebarMenu;
