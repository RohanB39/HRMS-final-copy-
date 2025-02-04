import React from "react";
import PresentyProgress from "./PresentyProgress";
import SpecialDay from "./SpecialDay";
import AllEmployeecard from "./AllEmployeecard";
import AbsentEmployeeCard from "./AbsentEmployeeCard";
import OnLeaveEmployeeCard from "./OnLeaveEmployeeCard";
import EmployeeInfoGraph from "./EmployeeInfoGraph";
import OnTimelogin from "./OnTimelogin";
import QuoteOfTheDay from "./QuoteOfTheDay";
import LateLatifs from "./LateLatifs";
import DailyLogin from "../DailyLogin/DailyLogin";

const HeroSection = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-col ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-auto md:mb-0">
            {/* First half with nested grid */}
            <div className="grid grid-cols-2 gap-2 h-full">
              <div className="flex flex-col justify-between ">
                {/* allemployee */}
                <AllEmployeecard />

                {/* absents */}
                <AbsentEmployeeCard />
              </div>
              {/* on leave */}
              <OnLeaveEmployeeCard />
            </div>

            {/* Second half occupied by the larger div */}
            <EmployeeInfoGraph />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-auto mt-2">
            {/* First Half with Two Divs (Nested Grid) */}
            <div className="grid md:grid-cols-2 gap-2 h-[400px] ">
              {/* early birds */}
              <OnTimelogin />

              {/* quotes */}
              {/* <QuoteOfTheDay /> */}
              <DailyLogin />
            </div>

            {/* Second Half with Nested Grid and Div */}
            <div className="flex flex-col h-full gap-y-2">
              <div className="grid md:grid-cols-2  gap-2 h-[500px] md:h-2/3">
                {/* late latifs */}
                <LateLatifs />
                {/* presenty count */}
                <div className="bg-darkcardBg h-full">
                  <PresentyProgress />
                </div>
              </div>
              {/* special day */}
              <div className="lg:h-2/6 h-auto ">
                <SpecialDay />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
