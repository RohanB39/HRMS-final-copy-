import React, { useState, useEffect } from "react";
import RightSideLogin from "../../Pages/FixedRightSide";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFormData } from "../../Redux/Features/hrSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Upload, Button, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { registerEmployeeApi } from "../../Redux/thunks/registerEmployeeApi";

const PersonalDetailsForm = ({ nextStep, prevStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData } = useSelector((state) => state.hr);
  const [otp, setOtp] = useState("");
  const [fileBytes, setFileBytes] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isOtpPopupOpen, setOtpPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPopup, setloadingPopup] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState(formData.personalInfo?.maritalStatus || "");
  const [verified, setVerified] = useState(false);

  const verifyEmployeeData = {
    name: formData.basicInfo.name || "Unknown",
    mobileNumber: formData.basicInfo.phone || "Unknown",
    email: formData.basicInfo.email || "Unknown",
  };

  const handleRoleChange = async (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    if (role === "HR") {
      setLoading(true);
      try {
        const response = await fetch(
          "https://hr.corely.in/api/registration/sendOtpVerifyEmployee",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verifyEmployeeData),
          }
        );
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (!response.ok) {
          throw new Error("Failed to send OTP. Please try again.");
        }
        const data = await response.json();
        setOtpPopupOpen(true);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Error sending OTP: " + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      setOtpPopupOpen(false);
    }
  };
  const handleClosePopup = () => {
    setOtpPopupOpen(false);
  };

  const handleFileChange = (info) => {
    const file = info.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryData = e.target.result;
        setFileBytes(binaryData);
        console.log(binaryData);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        alert("Error reading the file. Please try again.");
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("No file selected. Please upload an image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const personalData = {
      maritalStatus: e.target.maritalStatus.value,
      gender: e.target.gender.value,
      dateOfBirth: e.target.dateOfBirth.value,
      dateOfAniversary: e.target.dateOfAniversary.value,
      role: e.target.role.value,
      otp: otp,
    };
    const currentTimestamp = () => new Date().toISOString();

    try {
      const flattenedData = {
        employeeId: formData.basicInfo.employeeId || "Unknown",
        fullName: formData.basicInfo.name || "Unknown",
        emailAddress: formData.basicInfo.email || "Unknown",
        mobileNumber: formData.basicInfo.phone || "Unknown",
        designation: formData.basicInfo.designation || "Unknown",
        department: formData.additionalInfo.department || "Unknown",
        username: formData.additionalInfo.username || "Unknown",
        password: formData.additionalInfo.confirmpassword || null,
        dateofbirth: personalData.dateOfBirth || null,
        gender: personalData.gender || "Unknown",
        maritalStatus: personalData.maritalStatus || "Unknown",
        anniversaryDate: personalData.dateOfAniversary || null,
        joiningDate: formData.additionalInfo.dateOfJoining || "Unknown",
        employmentType: formData.additionalInfo.employmentType || "Unknown",
        companyName: "Tectigon Pvt Ltd",
        companyAddress: "123 Street, City",
        companyEmail: "info@tectigon.com",
        companyContactNumber: "0987654321",
        securityQuestions: "NA",
        securityAnswers: "NA",
        createdAt: currentTimestamp(),
        updatedAt: currentTimestamp(),
        role: personalData.role || "Unknown",
      };

      const profileImage = new Blob([fileBytes], { type: "image/jpeg" });
      dispatch(
        registerEmployeeApi({ employeeData: flattenedData, profileImage })
      )
        .unwrap()
        .then(() => {
          toast("Employee registered successfully.");
          localStorage.removeItem("isVerified");
          navigate("/login");
        })
        .catch((error) => {
          toast.error("An error occurred: " + error.message);
        });
    } catch (error) {
      toast("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const verifyOTP = async () => {
    const requestData = {
      email: "bankarrohan284@gmail.com",
      otp: otp,
    };
    try {
      const response = await fetch(
        "https://hr.corely.in/api/registration/verifyOtpForEmployeeRegistration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to verify OTP. Please try again.");
      }
      const data = await response.json();
      if (data.message === "OTP verified successfully.") {
        setIsVerified(true);
        toast.success(data.message);
        handleClosePopup();
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error verifying OTP: " + error.message);
    }
  };

  const resendOTP = async () => {
    try {
      setloadingPopup(true);
      const response = await fetch(
        "https://hr.corely.in/api/registration/sendOtpVerifyEmployee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verifyEmployeeData),
        }
      );
      await new Promise((resolve) => setTimeout(resolve, 4000));

      if (!response.ok) {
        throw new Error("Failed to resend OTP. Please try again.");
      }
      const data = await response.json();
      const { otp } = data;
      console.log("Resent OTP:", otp);
      toast.success("OTP resent successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error resending OTP: " + error.message);
    } finally {
      setloadingPopup(false);
    }
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
  };

  return (
    <div className="lg:h-[80vh] h-[90vh] relative overflow-hidden">
      <div className="loginPageContainer absolute top-1/2 left-1/2  transform -translate-x-1/2 w-full -translate-y-1/2 flex flex-col md:flex-col-reverse lg:flex-row justify-center lg:justify-start  items-center">
        {loading && (
          <div className="absolute inset-0 bg-white opacity-50 flex items-center justify-center z-50">
            <Spin size="large" tip="Logging in..." />
          </div>
        )}
        <div className="leftSide basis-1/2 flex items-center justify-center w-full md:w-[60%]">
          <div className="formContainer lg:px-16 lg:py-6 rounded-md w-[90%]">
            <div className="formTitle text-start mb-4">
              <h3 className="text-xl font-semibold mb-2 font-Work dark:text-darkPrimaryText">
                Personal Details
              </h3>
              <p className="mb-4 mt-2 text-sm font-Work dark:text-darkMuted">
                Enter your personal details to proceed to the next step. Verify
                Identity before submit
              </p>
            </div>
            <hr className="border-b border-gray-200 mb-4 dark:border-darkDevider" />
            <form onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div className="grid lg:grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <label className="font-Work font-normal dark:text-darkMuted text-nowrap">
                    Marital Status:
                  </label>
                  <select
                    name="maritalStatus"
                    defaultValue={formData.personalInfo?.maritalStatus || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    required
                    onChange={handleMaritalStatusChange}
                  >
                    <option value="">Marital Status</option>
                    <option value="married">Married</option>
                    <option value="unmarried">Unmarried</option>
                    <option value="divorsed">Divorced</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="font-Work font-normal dark:text-darkMuted text-nowrap">
                    Gender:
                  </label>
                  <select
                    name="gender"
                    defaultValue={formData.personalInfo?.gender || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Profile Upload */}

             
                <div className="flex flex-col mt-2">
                  <label className="font-Work font-normal dark:text-darkMuted text-nowrap">
                    Role:
                  </label>
                  <select
                    name="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Employee">Employee</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
            

              {/* Company Details */}
              <div className="grid lg:grid-cols-2 gap-2 mt-4">
                <div className="flex flex-col ">
                  <label className="font-Work font-normal dark:text-darkMuted text-nowrap">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    defaultValue={formData.personalInfo?.dateOfBirth || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    required
                  />
                </div>
                <div className="flex flex-col ">
                  <label className="font-Work font-normal dark:text-darkMuted text-nowrap">
                    Wedding Anniversary:
                  </label>
                  <input
                    type="date"
                    name="dateOfAniversary"
                    defaultValue={formData.personalInfo?.dateOfAniversary || ""}
                    className="h-8 outline-none border dark:border-darkDevider font-Work dark:bg-darkinputBg dark:text-darkAccent3 border-gray-400 indent-2 mt-1"
                    disabled={maritalStatus === "unmarried"}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <label className="font-Work font-normal dark:text-darkMuted">
                  Profile Picture:
                </label>
                <input
                  name="profile"
                  type="file"
                  accept="image/*"
                  className="dark:bg-darkinputBg dark:text-darkAccent3 border border-gray-400 dark:border-darkDevider text-sm p-2 "
                  onChange={handleFileChange} // Call handleFileChange when file changes
                />
              </div>

              {/* Form Buttons */}
              <div className="flex justify-between mt-4">
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
                  disabled={!verified}
                  style={{ cursor: isVerified ? 'pointer' : 'not-allowed' }}
                >
                  Submit
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                        clipRule="evenodd"
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
          {isOtpPopupOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              {loadingPopup && (
                <div className="absolute inset-0 bg-white opacity-50 flex items-center justify-center z-50">
                  <Spin size="large" tip="Logging in..." />
                </div>
              )}
              <div className="bg-white dark:bg-darkBg p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Verify OTP</h2>
                <p className="text-sm dark:text-darkAccent3 mb-4">
                  Please enter the OTP sent to your registered email.
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full p-2 border border-gray-300 dark:border-darkDivider rounded mb-4 dark:bg-darkinputBg dark:text-darkAccent3"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleClosePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <div className="grid">
                    <button
                      onClick={verifyOTP}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Verify
                    </button>
                    <span
                      className="text-[10px] text-blue-500 hover:underline cursor-pointer mt-2"
                      onClick={() => {
                        setOtp(""); // Clear OTP input field
                        resendOTP(); // Resend OTP
                      }}
                    >
                      Resend OTP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Right Side */}
        <div className="hidden lg:block basis-1/2 items-center justify-center ">
          <RightSideLogin />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
