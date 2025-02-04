import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../../Redux/Features/hrSlice";
import { Spin } from "antd";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    <div>
      <div>
        <button onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 md:block hidden dark:text-darkAccent3 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center h-screen bg-white dark:bg-darkmainBg z-[999]">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Logout;
