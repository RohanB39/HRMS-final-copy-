import React, { useState } from "react";
import AnimatedNumber from "../../../../../AdminMainContent/HeroSection/AnimateNum/AnimateNum";

const CasualLeave = () => {
  const [number, setNumber] = useState(7);
  return (
    <div className="h-[140px] md:h-0">
      <div className="leading-[16px]">
        <p className=" font-Work font-normal dark:font-light dark:text-darkAccent3 tracking-wide">
          casual leaves
        </p>
        <small className="dark:text-darkMuted">per annum</small>
      </div>
      <div className="absolute bottom-2 flex items-baseline gap-2">
        <h3 className="font-Work font-normal text-4xl dark:text-darkAccent3 ">
          <AnimatedNumber targetNumber={number} />
        </h3>
      </div>
      <span className="absolute top-4 right-3 h-4 w-4 rounded-full bg-white"></span>
      <span className="absolute top-2 right-2 h-2 w-2 rounded-full  bg-darkAccent2 "></span>
    </div>
  );
};

export default CasualLeave;
