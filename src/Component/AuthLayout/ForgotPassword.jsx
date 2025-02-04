import React, { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import RightSideLogin from "../../Pages/FixedRightSide";
import Logo from "../DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch.post(
        "https://hr.corely.in/api/auth/forgotPassword",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        if (response.data.message === "Email not found.") {
          toast.error(
            "Email not found. Please try again with a registered email."
          );
        } else if (
          response.data.message === "OTP sent successfully to your email."
        ) {
          navigate("/verifyotp", { state: { email: email } });
          toast.success("Please Verify Your OTP");
        } else {
          toast.error("Unexpected response. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen relative overflow-hidden ">
      <div className="w-full h-20 mb-8">
        <div className="flex items-center justify-between pt-4 lg:pt-6 w-[90%] mx-auto">
          <Logo />
          <span>
            <SwitchTheme />
          </span>
        </div>
      </div>

      <div className="  loginPageContainer absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full -translate-y-1/2 flex flex-col md:flex-col-reverse lg:flex-row justify-center items-center">
        {/* Left Side */}
        <div className="md:w-[60%] mx-auto  leftSide flex-1 flex items-center justify-center bg-[url('/Assets/bg.jpg')] bg-cover bg-center">
          <div className="formContainer lg:p-20 rounded-md md-[95%] w-[90%]">
            <div className="formTitle text-start mb-4">
              <h3 className="text-xl font-semibold mb-2 font-Work traccking-wide dark:text-darkPrimaryText">
                Forgot Your Password?
              </h3>
              <p className="text-gray-600 mb-4 mt-2 text-sm font-Work dark:text-darkMuted">
                Enter your email address below to receive instructions for
                resetting your password.
              </p>
            </div>
            <hr className="border-b border-gray-400 mb-8 dark:border-darkAccent" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-800 rounded-sm font-Work  text-sm bg-white focus:outline-none focus:ring-0 mb-4 dark:text-darkAccent3 dark:bg-darkinputBg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="button"
              className="bg-blue-500 w-full text-sm flex gap-2 items-center justify-center text-white font-Work py-2 px-8 hover:bg-black dark:bg-darkThemePrimaryBtn disabled:opacity-50"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {!loading && "Reset Password"}
            </button>

            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="formFooter text-end w-full mt-4  text-sm flex ">
              <p className="text-gray-600">
                <Link
                  to={"/login"}
                  className="text-blue-500 hover:underline flex items-center dark:text-darkAccent2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Back</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex basis-1/2 items-center justify-center">
          <RightSideLogin />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
