import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "../../../../../AdminMainContent/HeroSection/AnimateNum/AnimateNum";
import { deleteHoliday } from "../../../../../../../../Redux/thunks/deleteHoliday";
import { useDispatch, useSelector } from "react-redux";
import { holidaysApi } from "../../../../../../../../Redux/thunks/holidaysApi";
import toast from "react-hot-toast";

const PaidLeaves = () => {
  const dispatch = useDispatch();
  const { holidays } = useSelector((state) => state.hr);
  const [showPopup, setShowPopup] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const toatalHoliday = holidays.length;

  useEffect(() => {
    dispatch(holidaysApi());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % holidays.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [holidays.length]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleDeleteHoliday = (holidayId) => {
    dispatch(deleteHoliday(holidayId))
      .unwrap()
      .then((response) => {
        toast.success("Holiday deleted successfully!");
        dispatch(holidaysApi());
      })
      .catch((error) => {
        toast.error(`Failed to delete holiday: ${error}`);
      });
  };

  return (
    <div>
      <div className="">
        <div className="hidden lg:block leading-[16px]">
          <p className="font-Work font-normal  tracking-wide dark:text-darkPrimaryText">
            Total Holidays
          </p>
          <small className="text-darkmainBg dark:text-darkMuted">
            per annum
          </small>
        </div>

        <div className="hidden lg:block absolute bottom-0 pr-4 w-full">
          <div className="flex items-baseline justify-between border-b border-b-gray-400">
            <h3 className="text-4xl font-Work">
              <AnimatedNumber targetNumber={toatalHoliday} />
            </h3>
            <small
              className="cursor-pointer hover:underline dark:text-darkAccent2 right-4 "
              onClick={togglePopup}
            >
              View All
            </small>
          </div>

          {/* Upcoming Animated Event */}
          <div className="hidden lg:flex flex-col justify-between py-2 font-Work overflow-hidden">
            <p className="text-sm mb-2 pr-4 pb-1 dark:text-darkPrimaryText"></p>
            <motion.div
              key={currentEventIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col text-sm mb-2"
            >
              <p className=" font-Work font-normal dark:text-darkAccent2">
                {holidays[currentEventIndex]?.holidayDate || "N/A"}
              </p>
              <span className="tracking-wider font-Work text-sm dark:text-darkAccent">
                {holidays[currentEventIndex]?.holidayName || "N/A"}
              </span>
            </motion.div>
          </div>
        </div>
        <span className=" absolute top-4 right-3 h-4 w-4 rounded-full bg-blue-800"></span>
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-green-700"></span>

        {/* Popup for Viewing All Events */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center dark:bg-black bg-slate-800 dark:bg-opacity-50 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-darkModalBg shadow-lg md:w-96 p-4 relative max-h-[80vh] w-[90%] mx-auto">
              <div className="mb-4 px-4">
                <h2 className="text-lg font-Work dark:text-darkAccent3">
                  List of Holidays
                </h2>
              </div>
              <hr className="mb-4" />
              <div className="overflow-y-auto max-h-60 px-4">
                <ul className="space-y-3">
                  {holidays.map((holoday, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center mb-4 border-b dark:border-b-darkDevider"
                    >
                      <p className="font-normal dark:text-darkMuted font-Work">
                        {holoday.holidayName}
                      </p>
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <span className="text-gray-600 dark:text-darkMuted font-Work">
                            {holoday.holidayDate}
                          </span>
                          <small className="dark:text-darkMuted mb-2">
                            {holoday.dayOfWeek}
                          </small>
                        </div>
                        <span
                          className="text-gray-600 dark:text-darkMuted font-Work cursor-pointer"
                          onClick={() => handleDeleteHoliday(holoday.holidayId)}
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </span>
                      </div>
                      {/* <div className="flex flex-col">
                      
                    </div> */}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="absolute top-3 bg-darkAccent2 py-1 right-3 px-2 mr-2"
                onClick={togglePopup}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="lg:hidden h-[140px] relative">
        <div className="flex justify-between items-center ">
          <div className="leading-[16px]">
            <p className="font-Work font-normal  tracking-wide dark:text-darkPrimaryText">
              Total Holidays
            </p>
            <small className="text-darkmainBg dark:text-darkMuted">
              per annum
            </small>
          </div>
          <h3 className="text-4xl font-Work">
            <AnimatedNumber targetNumber={toatalHoliday} />
          </h3>
        </div>
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col justify-between py-2 font-Work overflow-hidden">
            <p className="text-sm mb-2 pr-4 pb-1"></p>
            <motion.div
              key={currentEventIndex}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col text-sm mb-2"
            >
              <p className="text-yellow-400 font-Work font-normal">
                {holidays[currentEventIndex]?.holidayDate || "N/A"}
              </p>
              <span className="tracking-wider">
                {holidays[currentEventIndex]?.holidayName || "N/A"}
              </span>
            </motion.div>
          </div>
          <small
            className="cursor-pointer hover:underline absolute bottom-2 right-2 dark:text-yellow-300"
            onClick={togglePopup}
          >
            View All
          </small>
        </div>
      </div>
    </div>
  );
};

export default PaidLeaves;
