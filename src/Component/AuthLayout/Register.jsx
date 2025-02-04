import React, { useState } from "react";
import { useSelector } from "react-redux";
import BasicDetailsForm from "./BasicDetailsForm";
import AdditionalDetailsForm from "./AdditionalDetailsForm";
import PersonalDetailsForm from "./PersonalDetailsForm";

import Logo from "../DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";
import VerifyOTP from "./VerifyOtp";

const Register = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicDetailsForm nextStep={nextStep} step={step} />;
      case 2:
        return (
          <AdditionalDetailsForm
            nextStep={nextStep}
            prevStep={prevStep}
            step={step}
          />
        );
      case 3:
        return (
          <PersonalDetailsForm
            prevStep={prevStep}
            nextStep={nextStep}
            step={step}
          />
        );

      case 4:
        return <VerifyOTP prevStep={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <div className="w-full h-20 sticky top-0 bg-white dark:bg-darkmainBg z-50">
        <div className="flex items-center justify-between pt-4 lg:pt-6 w-[90%] mx-auto ">
          <Logo />
          <span>
            <SwitchTheme />
          </span>
        </div>
      </div>
      <hr className="dark:border-darkDevider" />
      <div>
        <div>{renderStep()}</div>
        {/* <pre>{JSON.stringify(registerState, null, 2)}</pre> */}
      </div>
    </div>
  );
};

export default Register;
