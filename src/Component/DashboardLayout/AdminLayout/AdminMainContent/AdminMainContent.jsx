import { div } from "framer-motion/client";
import React from "react";
import KeyMetriksDataTables from "./KeyMetriks/keyMetriksDataTables";
import HeroSection from "./HeroSection/HeroContainerSection";
import DailyLogin from "./DailyLogin/DailyLogin";

const AdminMainContent = () => {
  return (
    <div className="w-full ">
      <div className=" w-[90%] lg:w-[90%] mx-auto">
        <HeroSection />
        <div className=" gap-4  mt-10 max-h-[100vh] mb-4">
          <div className="  overflow-x-hidden">
            <KeyMetriksDataTables />
          </div>

          {/* <div className="basis-[40%] bg-gray-50 dark:bg-darknavbarBg">
            <DailyLogin />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminMainContent;
