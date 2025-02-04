import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../../../Redux/Features/hrSlice";
import { Spin } from "antd";
import toast from "react-hot-toast";

const SidebarMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVisible = useSelector((state) => state.sidebar.isVisible);
  const { loggedInUser } = useSelector((state) => state.hr);

  const [initials, setInitials] = useState("");
  const [loading, setLoading] = useState(false);

  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase();
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase();
    return firstInitial + (lastInitial || "");
  };

  useEffect(() => {
    if (loggedInUser && loggedInUser.fullname) {
      const userInitials = getInitials(loggedInUser.fullname);
      setInitials(userInitials);
    } else {
      setInitials("HK");
    }
  }, [loggedInUser]);

  const handleLogout = () => {
    setLoading(true);

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("loggedInUser");

    dispatch(logout());

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
      toast.success("You are logged out successfully!", { duration: 3000 });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 1 }}
      animate={isVisible ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      className="h-screen bg-slate-50 z-10 w-[100%] md:hidden fixed left-0 overflow-x-hidden dark:bg-darknavbarBg dark:text-darkAccent"
    >
      {/* Sidebar content */}
      <div className="py-4 px-2 mt-2">
        <div className="flex items-center gap-4 p-4">
          {/* Conditional rendering for profile image or initials */}
          {loggedInUser?.profileImage ? (
            <img
              src={loggedInUser.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white">
              {initials}
            </div>
          )}
          <div className="leading-tight">
            <p className="text-[20px] font-medium tracking-wide dark:text-darkAccent2">
              {loggedInUser?.fullname || "Hr"}
            </p>
            <small className="dark:text-darkMuted tracking-wide">
              {loggedInUser?.company || "Corely.in"}
            </small>
          </div>
        </div>
      </div>

      <hr />

      <div>
        <ul>
          <li>
            <NavLink
              to="/adminDashboard"
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
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </span>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manageLeaves"
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
              to="/attendance"
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
              to="/allemployees"
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
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </span>
              Employee Directory
            </NavLink>
          </li>

          {/* More sidebar items */}
          <li>
            <button
              className="text-[18px] font-Work tracking-wide py-4 px-8 flex items-center gap-5 dark:text-darkMuted hover:bg-gray-100 dark:hover:bg-navbarBg w-full"
              onClick={handleLogout}
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </span>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center h-screen bg-white dark:bg-darkmainBg z-20">
          <Spin size="large" />
        </div>
      )}
    </motion.div>
  );
};

export default SidebarMenu;
