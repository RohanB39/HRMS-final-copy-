import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodaysPresenty } from "../../../../../Redux/thunks/fetchTodaysPresentyApi";
import { employeeCountApi } from "../../../../../Redux/thunks/employeeCountApi";
import CircularProgress from "./CircularProgress";

const PresentyProgress = () => {
  const dispatch = useDispatch();
  const { todayspresenceList, loading, error } = useSelector(
    (state) => state.hr
  );
  const { employeeCount } = useSelector((state) => state.hr);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalEmployees = employeeCount;

  useEffect(() => {
    dispatch(fetchTodaysPresenty());
    const interval = setInterval(() => {
      dispatch(fetchTodaysPresenty());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const uniqueRecords = Object.values(
      todayspresenceList.reduce((acc, record) => {
        const existing = acc[record.employeeId];

        if (
          !existing ||
          new Date(record.signInTime) > new Date(existing.signInTime)
        ) {
          acc[record.employeeId] = record;
        }
        return acc;
      }, {})
    );

    const todaysPresent = uniqueRecords.length;
    const calculatedProgressPercentage =
      totalEmployees > 0
        ? Math.round((todaysPresent / totalEmployees) * 100)
        : 0;

    setProgressPercentage(calculatedProgressPercentage);
  }, [todayspresenceList, totalEmployees]);

  const remainingPercentage = 100 - progressPercentage;
  const currentDate = new Date().toLocaleDateString();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="h-full bg-yellow-400 dark:bg-darkModalBg shadow-2xl relative">
      <div className="flex p-4 justify-between items-center">
        <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
          Total Login
        </p>
        <div>
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Circular Progress */}
      <CircularProgress progressPercentage={progressPercentage} error={error} />

      <hr className="dark:border-darkDevider" />
      <div className="absolute bottom-2 w-full">
        <div className="flex items-center px-4 justify-between">
          <p className="font-Work font-normal uppercase tracking-wider text-[12px] dark:text-darkMuted">
            {Math.round((progressPercentage / 100) * totalEmployees)} /{" "}
            {totalEmployees} Employee
          </p>
          <p
            className={`mt-2 text-sm ${
              remainingPercentage === 0 ? "text-green-700" : "text-red-400"
            }`}
          >
            {remainingPercentage === 0
              ? "All present"
              : `${remainingPercentage}% remaining`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PresentyProgress;
