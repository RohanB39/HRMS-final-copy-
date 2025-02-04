import React, { useState } from "react";
import AnimatedNumber from "../../../../../AdminMainContent/HeroSection/AnimateNum/AnimateNum";

const SickLeave = () => {
  const [number, setNumber] = useState(5);
  return (
    <div className="">
      <div className="leading-[16px]">
        <p className=" font-Work font-normal dark:font-light dark:text-darkAccent3 tracking-wide">
          Sick leaves
        </p>
        <small className="dark:text-darkMuted">per month</small>
      </div>
      <div className="absolute bottom-2 flex items-baseline gap-2">
        <h3 className="font-Work font-normal text-4xl dark:text-darkAccent3 ">
          <AnimatedNumber targetNumber={number} />
        </h3>
      </div>
      <span className="absolute top-4 right-3 h-4 w-4 rounded-full bg-red-400"></span>
      <span className="absolute top-2 right-2 h-2 w-2 rounded-full  bg-red-600 "></span>
    </div>
  );
};

export default SickLeave;
