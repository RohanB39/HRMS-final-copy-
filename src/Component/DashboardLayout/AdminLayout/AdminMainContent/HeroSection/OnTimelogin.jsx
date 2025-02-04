import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaysPresenty } from "../../../../../Redux/thunks/fetchTodaysPresentyApi";

const OnTimelogin = () => {
  const dispatch = useDispatch();
  const { todayspresenceList, loading, error } = useSelector(
    (state) => state.hr
  );

  let todaysEarlyEmployee = todayspresenceList.filter((employee) => {
    return employee.isFirstIn === 1;
  });

  let number = todaysEarlyEmployee.length;
  const imageVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
    },
  };

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div className="h-full dark:bg-darkmainBg border shadow-lg border-gray-400 dark:border-darkDevider relative">
        <div className="flex justify-between items-center p-4">
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            Early Logins
          </p>
          <span
            onClick={toggleModal}
            className="dark:bg-yellow-400 bg-darkAccent2 p-2 dark:text-darkmainBg  rounded-full cursor-pointer hover:bg-black hover:text-white shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </div>
        <div className="absolute bottom-0 px-4 w-full">
          <div className="flex items-baseline justify-between border-b">
            <h3 className="text-4xl font-Work text-white">
              {" "}
              <AnimatedNumber targetNumber={number} />
            </h3>
            <small
              className="dark:dark:text-darkAccent3 cursor-pointer hover:underline"
              onClick={toggleModal}
            >
              View All
            </small>
          </div>
          <div className="flex justify-between p-2 font-Work">
            <p className="capitalize dark:text-darkMuted font-Work font-light tracking-wide text-sm">
              On Time
            </p>
          </div>
          <div className="w-full grid grid-cols-3 gap-1 mb-4">
            {todaysEarlyEmployee.map((employee, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center h-18 w-18 shadow-md bg-slate-800 relative"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 4,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              >
                {employee.profileImage ? (
                  <img
                    src={`data:image/jpeg;base64,${employee.profileImage}`}
                    alt={employee.employeeName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {employee.employeeName
                      .split(" ")
                      .map((name) => name.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal to show early employees */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="dark:bg-darkModalBg bg-white p-4 max-w-2xl w-[90%] md:w-full overflow-y-auto">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-[18px] font-normal dark:text-darkPrimaryText">
                  Early Employees
                </h2>
                <p className="dark:font-light font-normal dark:text-darkMuted text-sm tracking-wide">
                  Employees who are On Time Today
                </p>
              </div>
              <button
                onClick={toggleModal}
                className="mt-4 bg-darkAccent2  px-1 py-1 text-darkmainBg hover:bg-yellow-200"
              >
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr className="mb-4" />
            <div className="mt-4">
              <div className="grid md:grid-cols-3 gap-4">
                {todaysEarlyEmployee.length > 0 ? (
                  todaysEarlyEmployee.map((employee, index) => (
                    <div
                      key={employee.id}
                      className="flex items-center space-x-4"
                    >
                      {employee.profileImage ? (
                        <img
                          src={`data:image/jpeg;base64,${employee.profileImage}`}
                          alt={employee.employeeName}
                          className="h-10 w-10 rounded-full border"
                        />
                      ) : (
                        // If no profile picture, show initials
                        <div className="h-10 w-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
                          <span className="text-sm font-semibold">
                            {employee.employeeName
                              ? employee.employeeName
                                  .split(" ")
                                  .map((name) => name.charAt(0))
                                  .join("")
                                  .toUpperCase()
                              : "NA"}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col">
                        <span className="font-normal dark:text-darkPrimaryText text-sm font-Work">
                          {employee.employeeName}
                        </span>
                        <span className="text-sm font-work font-light text-gray-500 dark:text-darkMuted">
                          {employee.designation}
                        </span>
                        <span className="text-sm font-work font-light text-gray-500 dark:text-darkMuted">
                          {employee.signInTime}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="dark:text-darkAccent2 font-Work text-sm text-gray-400">
                    No early employees today.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnTimelogin;
