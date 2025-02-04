import React, { useState, useEffect } from "react";
import AnimatedNumber from "./AnimateNum/AnimateNum";
import { useDispatch, useSelector } from "react-redux";
import { employeeCountApi } from "../../../../../Redux/thunks/employeeCountApi";
import { Link } from "react-router-dom";

const AllEmployeecard = () => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(0);
  const { status, employeeCount, error } = useSelector((state) => state.hr);

  useEffect(() => {
    dispatch(employeeCountApi());
  }, [dispatch]);

  useEffect(() => {
    if (status === "succeeded" && employeeCount !== undefined) {
      setNumber(employeeCount);
    }
  }, [status, employeeCount]);

  return (
    <div>
      <div className="h-[100px] bg-gray-300 dark:bg-darkcardBg border dark:border-darkDevider relative">
        {/* All employee label */}
        <p className="font-Work dark:font-normal font-medium uppercase tracking-wide mb-2 p-4 text-[12px] text-darkPrimaryBtn dark:text-darkPrimaryText">
          All employees
        </p>
        <div className="absolute bottom-0 flex items-baseline justify-between px-4 w-full">
          <h3 className="text-4xl font-Work text-darkmainBg">
            {status === "failed" ? (
              <span>0</span>
            ) : (
              <AnimatedNumber targetNumber={number} />
            )}
          </h3>
          <Link to="/allemployees">
            <small className="dark:text-darkAccent3 cursor-pointer hover:underline">
              View All
            </small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeecard;
