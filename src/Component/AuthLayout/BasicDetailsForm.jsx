import React, { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../Redux/Features/hrSlice";
import RightSideLogin from "../../Pages/FixedRightSide";
import { fetchEmployeeId } from "../../Redux/thunks/fetchEmployeeId";

const BasicDetailsForm = ({ nextStep, step }) => {
  const dispatch = useDispatch();
  const { formData, empid } = useSelector((state) => state.hr);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  useEffect(() => {
    dispatch(fetchEmployeeId());
  }, [dispatch]);

  // Validation function specific to the basic details form
  const validateBasicForm = (data) => {
    const validationErrors = {};

    // Check if name is empty
    if (!data.name) validationErrors.name = "Name is required.";

    // Validate email format
    if (!data.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    // Validate phone number format (basic validation)
    if (!data.phone) {
      validationErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(data.phone)) {
      validationErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Validate designation (if needed)
    if (!data.designation)
      validationErrors.designation = "Designation is required.";

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect form data
    const data = {
      name: e.target.name.value,
      employeeId: e.target.employeeId.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      designation: e.target.designation.value,
    };

    // Check if all fields are empty for Step 1
    if (step === 1) {
      if (Object.values(data).every((field) => field === "")) {
        setGeneralError("Please fill in the form.");
        setErrors({}); // Clear any field-specific errors
        return;
      }

      // Validate the fields using the form's specific validation function
      const validationErrors = validateBasicForm(data);

      // If there are validation errors, set them
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setGeneralError(""); // Clear general error if there are field-specific errors
      } else {
        setErrors({});
        setGeneralError(""); // Clear general error if validation passes

        // Dispatch data to Redux store
        dispatch(updateFormData({ section: "basicInfo", data }));

        // Proceed to the next step
        nextStep();
      }
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
              <h3 className="text-lg md:text-xl font-semibold mb-1 font-Montserrat dark:text-darkPrimaryText">
                Basic Details
              </h3>
              <p className="mb-4 mt-2 text-[14px] font-Work dark:text-darkMuted">
                Enter your credentials to proceed to the next step.
              </p>
            </div>
            <hr className="border-b border-gray-200 mb-6 dark:border-darkDevider" />
            {/* Display errors section */}
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Employee ID Field */}
              <div className="grid lg:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Employee Id:
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    value={empid}
                    readOnly
                    className="py-2 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={formData.basicInfo?.name || ""}
                    className="py-2 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col mt-4">
                <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={formData.basicInfo?.email || ""}
                  className="py-2 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  placeholder="Your email@gmail.com"
                />
              </div>

              {/* Phone Field */}
              <div className="grid lg:grid-cols-2 gap-2 mt-4">
                <div className="flex flex-col">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Phone:
                  </label>
                  <input
                    type="Number"
                    name="phone"
                    defaultValue={formData.basicInfo?.phone || ""}
                    className="py-2 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    placeholder=" Phone number plz."
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-Work font-normal  dark:text-darkMuted text-nowrap">
                    Designation:
                  </label>
                  <select
                    name="designation"
                    defaultValue={formData.basicInfo?.designation || ""}
                    className="py-2 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                  >
                    <option value="">Select designation</option>
                    <option value="Manager ">Manager</option>
                    <option value="Manager ">Head</option>
                    <option value="TeamLeader ">Team Leader</option>
                    <option value="TeamLeader ">Team Member</option>
                  </select>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 mt-4 flex gap-2 items-center text-white justify-center w-full font-Work  hover:bg-black text-base  tracking-wide dark:text-darkAccent3"
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
            </form>
            <div className="formFooter font-Work font-normal text-end w-full text-[14px] mt-2">
              <p className="text-slate-500 dark:text-darkMuted">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-500 hover:underline  dark:text-darkAccent2"
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

export default BasicDetailsForm;
