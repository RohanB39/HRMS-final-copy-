import React from "react";
import { useDispatch } from "react-redux";

import { toggleMenu } from "../../../../../Redux/Features/SidebarSlice";

const Menu = () => {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleMenu());
  };
  return (
    <div>
      <div>
        <button onClick={handleToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-800 cursor-pointer hover:text-slate-500 dark:text-darkPrimaryText md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Menu;
