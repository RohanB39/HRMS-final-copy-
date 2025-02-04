import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { holidaysApi } from "../../../../../Redux/thunks/holidaysApi";

const QuoteOfTheDay = () => {
  const dispatch = useDispatch();
  const { holidays } = useSelector((state) => state.hr);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    dispatch(holidaysApi());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % holidays.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [holidays.length]);

  return (
    <div className="h-[300px] md:h-full  md:block overflow-hidden relative border border-gray-400 dark:border-darkDevider p-4">
      <motion.div
        className="absolute bottom-5 dark:text-darkAccent3 font-Work font-normal dark:font-light text-[12px]  mt-2 w-[80%]"
        key={currentQuoteIndex}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col justify-between py-2 font-Work overflow-hidden">
          <p className="text-sm mb-2 pr-4 pb-1">Upcoming Holidays</p>
          <motion.div
            key={currentEventIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-sm mb-2"
          >
            <p className="dark:text-yellow-300 font-Work font-normal">
              {holidays[currentEventIndex]?.holidayDate || "N/A"}
            </p>
            <span className="tracking-wider font-Work font-normal text-sm dark:text-darkAccent">
              {holidays[currentEventIndex]?.holidayName || "N/A"}
            </span>
          </motion.div>
        </div>
      </motion.div>

      <span className="absolute -top-[6rem] -right-[10rem] h-60 w-60 rounded-full outline dark:outline-darkAccent2 outline-gray-200"></span>
      <span className="absolute -top-[8rem] -right-[8rem] h-60 w-60 rounded-full outline dark:outline-darkAccent outline-gray-600"></span>
    </div>
  );
};

export default QuoteOfTheDay;
