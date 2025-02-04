import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../Redux/Features/hrSlice";
import RightSideLogin from "../../Pages/FixedRightSide";

import { Link } from "react-router-dom";

const AdditionalDetailsForm = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.hr);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  // Password Strength Validator
  const validatePasswordStrength = (password) => {
    const passwordStrength = {
      minLength: /^(?=.{8,})/,
      upperCase: /[A-Z]/,
      lowerCase: /[a-z]/,
      number: /\d/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    let strength = "";
    if (!passwordStrength.minLength.test(password)) {
      strength = "Password must be at least 8 characters long.";
    } else if (!passwordStrength.upperCase.test(password)) {
      strength = "Password must contain at least one uppercase letter.";
    } else if (!passwordStrength.lowerCase.test(password)) {
      strength = "Password must contain at least one lowercase letter.";
    } else if (!passwordStrength.number.test(password)) {
      strength = "Password must contain at least one number.";
    }
    return strength;
  };

  // Password Match Validator
  const validatePasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword ? "" : "Passwords do not match.";
  };

  // Form validation logic
  const validateForm = (data) => {
    const validationErrors = {};

    // Validate department
    if (!data.department) {
      validationErrors.department = "Department is required.";
    }

    // Validate username
    if (!data.username) {
      validationErrors.username = "Username is required.";
    }

    // Validate date of joining
    if (!data.dateOfJoining) {
      validationErrors.dateOfJoining = "Date of joining is required.";
    }

    // Validate password strength
    const passwordStrengthError = validatePasswordStrength(data.createpassword);
    if (passwordStrengthError) {
      validationErrors.createpassword = passwordStrengthError;
    }

    // Validate password match
    const passwordMatchError = validatePasswordMatch(
      data.createpassword,
      data.confirmpassword
    );
    if (passwordMatchError) {
      validationErrors.confirmpassword = passwordMatchError;
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      department: e.target.department.value,
      username: e.target.username.value,
      dateOfJoining: e.target.dateOfJoining.value,
      createpassword: e.target.createpassword.value,
      confirmpassword: e.target.confirmpassword.value,
      employmentType: e.target.employmentType.value,
    };
    // Validate form data
    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setGeneralError("");
    } else {
      setErrors({});
      setGeneralError("");
      dispatch(updateFormData({ section: "additionalInfo", data }));
      nextStep();
    }
  };

  return (
    <div className="lg:h-[80vh] h-[90vh] relative overflow-hidden mb-6">
      <div className="loginPageContainer absolute top-1/2 left-1/2  transform -translate-x-1/2 w-full -translate-y-1/2 flex flex-col md:flex-col-reverse lg:flex-row justify-center lg:justify-start  items-center">
        {/* Left Side */}{" "}
        <div className="leftSide basis-1/2 flex items-center justify-center w-full md:w-[60%]">
          <div className="formContainer lg:px-16 lg:py-12 rounded-md w-[90%]">
            {/* Form Title */}
            <div className="formTitle text-start mb-4">
              <h3 className="text-xl font-semibold mb-2 font-Work dark:text-darkPrimaryText">
                Additional Information
              </h3>
              <p className="mb-4 mt-2 text-[14px] font-Work dark:text-darkMuted">
                Enter your credentials to proceed to the next step.
              </p>
            </div>
            <hr className="border-b border-gray-200 mb-6 dark:border-darkDevider" />
            {/* Display general error message */}
            {generalError && (
              <div style={{ color: "red", marginBottom: "1em" }}>
                {generalError}
              </div>
            )}

            {/* Display field-specific error messages */}
            <div style={{ color: "red", marginBottom: "1em" }}>
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid lg:grid-cols-2 gap-2 ">
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={formData.additionalInfo?.username || ""}
                    placeholder="name_1212"
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Department:
                  </label>
                  <select
                    name="department"
                    defaultValue={formData.additionalInfo?.department || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  >
                    <option value="IT">HR</option>
                    <option value="Sales">Admin</option>
                    <option value="Accounts">Design</option>
                    <option value="Accounts">Control</option>
                    <option value="Accounts">Production</option>
                    <option value="Accounts">Project Management</option>
                    <option value="Accounts">Service</option>
                    <option value="Accounts">Management</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 lg:grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Date of Joining:
                  </label>
                  <input
                    type="date"
                    name="dateOfJoining"
                    defaultValue={formData.additionalInfo?.dateOfJoining || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Employment Type:
                  </label>
                  <select
                    name="employmentType"
                    defaultValue={formData.additionalInfo?.employmentType || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  >
                    <option value="Onrole">On Role</option>
                    <option value="OnContract">On Contract</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Create Password :
                  </label>
                  <input
                    type="password"
                    name="createpassword"
                    defaultValue={formData.additionalInfo?.createpassword || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Confirm Password :
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    defaultValue={
                      formData.additionalInfo?.confirmPassword || ""
                    }
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  className=" flex gap-2 text-slate-900  font-Work  py-2 px-6 border  hover:bg-gray-50  text-sm  tracking-wide dark:border-darkDevider dark:text-darkAccent3"
                  onClick={prevStep}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                      />
                    </svg>
                  </span>
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-slate-700 flex gap-2  items-center text-white  font-Work  py-1 px-6  hover:bg-black text-sm dark:bg-slate-800 tracking-wide dark:text-darkAccent3"
                >
                  Next
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
            <hr className="mt-4 dark:border-darkDevider" />
            <div className="formFooter font-Work font-normal text-end w-full text-[14px] mt-2">
              <p className="text-slate-500 dark:text-darkMuted">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-500 hover:underline dark:text-darkAccent2"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="hidden lg:block basis-1/2 items-center justify-center ">
          <RightSideLogin />
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetailsForm;
