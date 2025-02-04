import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";
import RightSideLogin from "../../Pages/FixedRightSide";

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch.post(
        "http://localhost:8081/api/auth/verifyOtp",
        {
          email,
          otp,
        }
      );
      if (response.data.message === "OTP verified successfully.") {
        toast.success(response.data.message);
        navigate("/resetPassword", { state: { email } });
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to verify OTP. Try again."
      );
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/resendOtp",
        {
          email,
        }
      );

      if (
        response.data.message === "New OTP sent successfully to your email."
      ) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to resend OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="w-full h-20 mb-8">
        <div className="flex items-center justify-between pt-4 lg:pt-6 w-[90%] mx-auto">
          <Logo />
          <span>
            <SwitchTheme />
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-col-reverse lg:flex-row">
        {/* Left Side */}
        <div className="leftSide basis-1/2 flex items-center">
          <div className="formContainer lg:px-16 lg:pt-8 rounded-md w-[100%]">
            <div className="formTitle text-start mb-4">
              <h3 className="text-xl font-semibold mb-2 font-Work tracking-wider">
                Verify OTP
              </h3>
            </div>
            <hr className="border-b border-gray-400 mb-8" />
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-1 text-sm font-Work dark:text-darkThemeSecondaryText"
                >
                  Your registered email
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  readOnly
                  className="w-full p-2 border font-Work text-sm border-gray-800 rounded-sm bg-white focus:outline-none focus:ring-0 placeholder-gray-600 dark:bg-darkThemeNavbarBg dark:text-darkThemeSecondaryText"
                />
              </div>
              <div>
                <label
                  htmlFor="otp"
                  className="block text-gray-700 mb-1 text-sm font-Work dark:text-darkThemeSecondaryText"
                >
                  Enter OTP
                </label>
                <input
                  type="number"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter Valid 6 Digit OTP"
                  className="w-full p-2 border font-Work text-sm border-gray-800 rounded-sm bg-white focus:outline-none focus:ring-0 placeholder-gray-600 dark:bg-darkThemeNavbarBg dark:text-darkThemeSecondaryText"
                />
              </div>
              <button
                type="submit"
                className="bg-slate-700 justify-center w-full flex gap-2 text-white py-2 mt-4 px-8 hover:bg-black dark:bg-darkThemePrimaryBtn"
              >
                Verify OTP
              </button>
            </form>
            {/* Back button */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-center mr-3 ">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-blue-600 hover:underline dark:text-darkThemeAccentText"
                >
                  Remember Password? Go to login.
                </button>
              </div>
              <div className="text-center">
                <button
                  onClick={handleResendOtp}
                  className="text-sm text-blue-600 hover:underline dark:text-darkThemeAccentText"
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Resending..." : "Resend OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="basis-1/2 flex items-center justify-center">
          <RightSideLogin />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
