import React from "react";
import { motion } from "framer-motion";

const CircularProgress = ({ progressPercentage }) => {
  const circleRadius = 50; // Radius of the circle
  const circleCircumference = 2 * Math.PI * circleRadius; // Total circumference
  const progressStroke =
    circleCircumference - (progressPercentage / 100) * circleCircumference; // Calculate progress

  return (
    <div className="relative w-36 h-36 md:w-32 md:h-32 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="green"
          strokeWidth="2"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r={circleRadius}
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeDasharray={circleCircumference}
          strokeDashoffset={progressStroke}
          strokeLinecap="round"
          animate={{ strokeDashoffset: progressStroke }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      {/* Percentage in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-Work uppercase tracking-wide font-semibold dark:text-darkAccent2">
          {progressPercentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
