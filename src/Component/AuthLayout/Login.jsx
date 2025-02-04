import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  setError,
  setStatus,
} from "../../Redux/Features/hrSlice";
import { Spin } from "antd";

import RightSideLogin from "../../Pages/FixedRightSide";
import Logo from "../DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";

import { loginApi } from "../../Redux/thunks/loginApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isAuthenticated } = useSelector((state) => state.hr);
  const loggedInUser = useSelector((state) => state.hr.loggedInUser);

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const role = loggedInUser?.role?.trim().toLowerCase();
      setTimeout(() => {
        const authCode = "c23049kjdfn320sdkfn3409sdfn3409lkskdn32skjb$%^";  
        navigate(role === "hr" ? `/adminDashboard?authCode=${encodeURIComponent(authCode)}` : `/userDashboard?authCode=${encodeURIComponent(authCode)}`);
      }, 1000);
    }
  }, [isAuthenticated, loggedInUser, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    dispatch(setStatus("idle"));

    const resultAction = await dispatch(loginApi({ employeeId, password }));

    if (loginApi.fulfilled.match(resultAction)) {
      toast.success("Login successful!");
    } else {
      dispatch(setError(resultAction.payload));
      toast.error(resultAction.payload || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 dark:bg-darkmainBg bg-white flex items-center justify-center z-50">
          <Spin
            size="large"
            tip="Logging in..."
            className="dark:text-darkAccent3"
          />
        </div>
      )}

      {/* Header Section */}
      <div className="w-full h-20">
        <div className="flex items-center justify-between pt-4 lg:pt-6 w-[90%] mx-auto">
          <Logo />
          <span>
            <SwitchTheme />
          </span>
        </div>
      </div>

      <div className="loginPageContainer absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full -translate-y-1/2 flex flex-col md:flex-col-reverse lg:flex-row justify-center items-center">
        {/* Left Side */}
        <div className="leftSide flex-1 flex items-center justify-center">
          <div className="formContainer lg:p-16 rounded-md w-[90%]">
            <div className="formTitle text-start mb-4">
              <h3 className="text-lg md:text-xl font-semibold mb-1 font-Montserrat dark:text-darkPrimaryText">
                Welcome! <br /> Enter Your Credentials to Continue
              </h3>
              <p className="mb-4 mt-2 text-sm md:text-[14px] font-Work dark:text-darkMuted">
                Enter your credentials to access your account and continue.
              </p>
            </div>
            <hr className="border-b border-gray-400 mb-8 dark:border-darkDevider" />
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="fields mb-4 text-sm">
                <label
                  htmlFor="empId"
                  className="block text-gray-700 mb-1 font-Work dark:text-darkAccent"
                >
                  Employee ID*
                </label>
                <input
                  type="text"
                  placeholder="Enter your Employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full p-2 border border-gray-800 font-normal placeholder-gray-500 font-Work bg-white focus:outline-none focus:ring-0 dark:bg-darkinputBg dark:text-darkAccent3"
                />
              </div>
              <div className="fields mb-4 text-sm">
                <label
                  htmlFor="password"
                  className="block text-gray-700 mb-1 font-Work dark:text-darkAccent"
                >
                  Password*
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-800 font-Work placeholder-gray-500 font-normal bg-white focus:outline-none focus:ring-0 dark:bg-darkinputBg dark:text-darkAccent3"
                />
              </div>

              <div className="btns flex justify-between items-center mb-4 mt-8">
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={status === "loading"}
                  className="px-4 py-1 bg-blue-500 text-white font-Work"
                >
                  {status === "loading" ? "Logging in..." : "Login"}
                </button>
                <Link to={"/forgotPass"}>
                  <button
                    type="button"
                    className="text-blue-500 font-Work font-normal hover:underline dark:hover:text-darkAccent2 text-sm dark:text-darkAccent"
                  >
                    Forgot Password
                  </button>
                </Link>
              </div>
              <div className="formFooter font-Work font-normal text-end w-full text-[12px]">
                <p className="text-slate-500 dark:text-darkMuted">
                  Still Without Account?{" "}
                  <Link
                    to={"/register"}
                    className="text-blue-500 hover:underline dark:text-darkAccent dark:hover:text-darkAccent2 "
                  >
                    Create One
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <span className="h-80 w-80 md:hidden bg-transparent border-2 rounded-full dark:border-darkAccent absolute -bottom-[24rem] -right-44"></span>
        <span className="h-60 w-60 md:hidden bg-transparent border-2 rounded-full border-darkMuted dark:border-darkAccent2 absolute -bottom-[16rem]  -right-40"></span>
        {/* Right Side */}
        <div className="hidden lg:flex basis-1/2 items-center justify-center">
          <RightSideLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
