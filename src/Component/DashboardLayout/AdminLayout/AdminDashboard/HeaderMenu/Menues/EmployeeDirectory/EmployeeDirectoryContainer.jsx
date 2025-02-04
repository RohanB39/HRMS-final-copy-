import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OnRollEmployees from "./OnRollEmployees";
import OnContractEmployee from "./OnContractEmployee";
import AdminHeader from "../../../AdminHeader";
import SidebarMenu from "../../../SidebarMenu/SidebarMenu";
import AnimatedNumber from "../../../../AdminMainContent/HeroSection/AnimateNum/AnimateNum";
import { allEmployee } from "../../../../../../../Redux/thunks/allEmployee";

const EmployeeDirectoryContainer = () => {
  const dispatch = useDispatch();

  const { allEmployeeData, loading, error } = useSelector((state) => state.hr);

  const filteredEmployeesOnRole = allEmployeeData.filter(
    (employee) => employee.employmentType === "Onrole"
  );

  const filteredEmployeesOnContract = allEmployeeData.filter(
    (employee) => employee.employmentType === "OnContract"
  );

  useEffect(() => {
    dispatch(allEmployee());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader className="sticky top-0" />
      <SidebarMenu />
      <div className="w-[90%] mx-auto mt-8">
        <div className="md:flex items-start justify-between">
          <div>
            <h3 className="text-[20px] font-Work font-medium dark:text-darkPrimaryText">
              All employees
            </h3>
            <p className="text-gray-500 text-sm font-Work font-normal dark:text-darkMuted dark:font-light md:w-[60%] tracking-wide">
              Acknowledging the power of our team, whose dedication, talent, and
              hard work propel our company forward.
            </p>
            <hr className="mt-4 mb-2 dark:border-darkDevider" />
          </div>
          <div className="flex gap-2 items-end">
            <div className="dark:border dark:border-darkDevider h-36 w-1/2 p-2 lg:min-w-32 lg:min-h-36 bg-yellow-300 dark:bg-darkModalBg font-Work shadow-xl font-normal text-sm relative">
              <p className=" font-Work font-normal dark:text-darkPrimaryText">
                {" "}
                On roll
              </p>
              <div className="absolute bottom-0">
                <AnimatedNumber targetNumber={filteredEmployeesOnRole.length} />
              </div>
            </div>
            <div className="border dark:border-darkDevider p-2 h-36 w-1/2 lg:min-w-32 lg:min-h-32 dark:bg-darkmainBg bg-gray-50 font-Work shadow-xl font-normal text-sm relative">
              <p className=" font-Work font-normal dark:text-darkPrimaryText">
                On Contract
              </p>
              <div className="absolute bottom-0">
                <AnimatedNumber
                  targetNumber={filteredEmployeesOnContract.length}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <OnRollEmployees />
        </div>
        <hr className="mt-6 dark:border-darkDevider" />
        <div className="mt-12">
          <OnContractEmployee />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDirectoryContainer;
