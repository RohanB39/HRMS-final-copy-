import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../../Redux/Features/ThemeSlice";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className={`relative w-14 h-7 rounded-full transition duration-300 ${
          darkMode ? "bg-slate-800" : "bg-slate-200"
        } flex items-center`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-black shadow-md transition-transform duration-300 transform ${
            darkMode ? "translate-x-7" : "translate-x-1"
          }`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute w-4 h-4 left-1 text-yellow-100 transition-opacity ${
            darkMode ? "opacity-0" : "opacity-100"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 4a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1zm0 12a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4 11a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1zm12 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM6.343 6.343a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L6.343 7.757a1 1 0 010-1.414zm9.9 9.9a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414l-1.414-1.414a1 1 0 010-1.414zM6.343 17.657a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 1.414L7.757 17.657a1 1 0 01-1.414 0zm9.9-9.9a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 1.414L17.657 7.757a1 1 0 01-1.414 0z" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute w-4 h-4 right-2 text-gray-200 transition-opacity ${
            darkMode ? "opacity-100" : "opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.742 15.442a8.944 8.944 0 01-9.071-2.356A8.944 8.944 0 0110.5 4.344 9.987 9.987 0 002 12c0 5.523 4.477 10 10 10 4.93 0 9.046-3.525 9.742-8.222z" />
        </svg>
      </button>
    </div>
  );
};

export default SwitchTheme;
