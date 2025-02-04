import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const PresentyProgress = () => {
  const [workHours, setWorkHours] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");

  const totalWorkHours = 10;

  const signInDataRaw = useSelector((state) => state.hr.signInEmployee);
  const signInData = signInDataRaw ? JSON.parse(signInDataRaw) : null;

  const secondsRef = useRef(0);
  const prevWorkHoursRef = useRef(workHours);
  const prevProgressPercentageRef = useRef(progressPercentage);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date();
      secondsRef.current = time.toLocaleTimeString();
      setFormattedTime(secondsRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!signInData || !signInData.signInTime) {
      setWorkHours(0);
      setProgressPercentage(0);
      return;
    }

    const currentDate = new Date().toLocaleDateString();
    const fullSignInTime = new Date(`${currentDate} ${signInData.signInTime}`);

    if (isNaN(fullSignInTime.getTime())) {
      return;
    }

    const updateProgress = () => {
      const now = new Date();
      const diffInMs = now - fullSignInTime;
      const hoursWorked = diffInMs / (1000 * 60 * 60);
      const cappedWorkHours = Math.min(hoursWorked, totalWorkHours);
      const percentage = Math.round((cappedWorkHours / totalWorkHours) * 100);

      if (cappedWorkHours !== prevWorkHoursRef.current) {
        prevWorkHoursRef.current = cappedWorkHours;
        setWorkHours(cappedWorkHours);
      }

      if (percentage !== prevProgressPercentageRef.current) {
        prevProgressPercentageRef.current = percentage;
        setProgressPercentage(Math.min(percentage, 100));
      }
    };

    updateProgress();

    const interval = setInterval(updateProgress, 1000 * 60);

    return () => clearInterval(interval);
  }, [signInData?.signInTime]);
  const circleRadius = 50;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const progressStroke =
    circleCircumference - (progressPercentage / 100) * circleCircumference;

  return (
    <div className="h-full bg-darkAccent2 dark:bg-darkModalBg shadow-2xl relative">
      <div className="flex p-4 justify-between items-center">
        <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
          Work Hrs
        </p>
        <div>
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            {formattedTime || "00:00:00"} {/* Display seconds */}
          </p>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="relative w-36 h-36 md:w-32 md:h-32 mx-auto md:mt-4">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 120 120"
        >
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={circleRadius}
            fill="none"
            stroke="green"
            strokeWidth="2"
          />
          {/* Animated Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={circleRadius}
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeDasharray={circleCircumference}
            strokeDashoffset={progressStroke}
            strokeLinecap="round"
          />
        </svg>
        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-Work uppercase tracking-wide font-semibold dark:text-darkPrimaryText">
            {progressPercentage}%
          </span>
        </div>
      </div>
      <hr className="dark:border-darkDevider" />

      <div className="absolute bottom-2 w-full">
        <div className="flex items-center px-4 justify-between">
          <p className="font-Work font-normal uppercase tracking-wider text-[12px] dark:text-darkMuted">
            Work Hrs: <br /> {workHours.toFixed(2)} hrs
          </p>

          <p
            className={`mt-2 text-[12px] ${
              progressPercentage === 100 ? "text-green-700" : "text-red-400"
            }`}
          >
            {progressPercentage === 100
              ? "Full time Utilized"
              : `${100 - progressPercentage}%  yet to utilize`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PresentyProgress;
