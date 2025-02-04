import { div } from "framer-motion/client";
import React from "react";

import HeroSection from "./HeroSection/HeroContainerSection";

const AdminMainContent = () => {
  return (
    <div className="w-full mb-6">
      <div className=" w-[90%] lg:w-[90%] mx-auto ">
        <HeroSection />
        {/* <div className="lg:flex gap-4 mb-12 mt-10 h-[500px]">
          <div className="basis-[60%] h-full overflow-x-hidden"></div>

          <div className="basis-[40%] bg-gray-50"></div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminMainContent;
