import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Logo from "../DashboardLayout/AdminLayout/AdminDashboard/Header/Logo";
import SwitchTheme from "../DashboardLayout/AdminLayout/AdminDashboard/Header/SwitchTheme";
import RightSideLogin from "../../Pages/FixedRightSide";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [employeeId, setEmployeeId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordStrengthRegex.test(password)) {
            toast.error("Password must be at least 6 characters long and contain both letters and numbers.");
            return;
        }
        try {
            const response = await axios.put("http://localhost:8081/api/auth/updatePassword", {
                employeeId,
                password,
            });

            if (response.data === "Password updated successfully") {
                toast.success("Password updated successfully!");
                navigate("/login");
            } else {
                toast.error(response.data || "Failed to update password.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the password.");
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
                                Reset Your Password
                            </h3>
                        </div>
                        <hr className="border-b border-gray-400 mb-8" />
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 mb-1 text-sm font-Work dark:text-darkThemeSecondaryText"
                                >
                                    Enter employee id
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    placeholder="Employee Id, EMP00000"
                                    className="w-full p-2 border font-Work text-sm border-gray-800 rounded-sm bg-white focus:outline-none focus:ring-0 placeholder-gray-600 dark:bg-darkThemeNavbarBg dark:text-darkThemeSecondaryText"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 mb-1 text-sm font-Work dark:text-darkThemeSecondaryText"
                                >
                                    Enter Password*
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full p-2 border font-Work text-sm border-gray-800 rounded-sm bg-white focus:outline-none focus:ring-0 placeholder-gray-600 dark:bg-darkThemeNavbarBg dark:text-darkThemeSecondaryText"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block text-gray-700 mb-1 text-sm font-Work dark:text-darkThemeSecondaryText"
                                >
                                    Confirm Password*
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password"
                                    className="w-full p-2 border font-Work text-sm border-gray-800 rounded-sm bg-white focus:outline-none focus:ring-0 placeholder-gray-600 dark:bg-darkThemeNavbarBg dark:text-darkThemeSecondaryText"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-slate-700 justify-center w-full flex gap-2 text-white py-2 mt-4 px-8 hover:bg-black dark:bg-darkThemePrimaryBtn"
                            >
                                Reset Password
                            </button>
                        </form>
                        {/* Back button */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-center mr-3 ">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="text-sm text-blue-600 hover:underline dark:text-darkThemeAccentText"
                                >
                                    Login Page
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

export default ResetPassword;
