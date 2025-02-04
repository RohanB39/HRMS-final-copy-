import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimateNum/AnimateNum";

const OnTimelogin = () => {
  const [number, setNumber] = useState(12);
  const imageVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      opacity: 1,
    },
  };

  return (
    <div>
      <div className="h-full dark:bg-darkcardBg border shadow-lg border-gray-400 dark:border-darkDevider relative">
        <div className="flex justify-between items-center p-4">
          <p className="font-Work font-normal uppercase tracking-wide mb-2 text-[12px] dark:text-darkPrimaryText">
            Early Birds
          </p>
          <span className="dark:bg-white bg-darkAccent2 p-2 dark:text-darkmainBg  rounded-full cursor-pointer hover:bg-black hover:text-white shadow-md">
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
            <small className="dark:dark:text-darkAccent3 cursor-pointer hover:underline">
              View All
            </small>
          </div>
          <div className="flex justify-between p-2 font-Work">
            <p className="capitalize dark:text-darkMuted font-Work font-light tracking-wide text-sm">
              On Time
            </p>
          </div>
          <div className="w-full grid grid-cols-3 gap-1 mb-4">
            {["pr1", "pr9", "pr8", "pr7", "pr6", "pr5"].map((img, index) => (
              <motion.img
                key={index}
                src={`../../../../../public/portraits/${img}.webp`}
                alt={`portrait ${index + 1}`}
                className=" shadow-md"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 4,
                  delay: 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnTimelogin;
